import requests
import os
import json


class TelegramBot:
    def __init__(self, bot_token, chat_id):
        """
        Initialize the bot.
        :param bot_token: Telegram bot token from BotFather
        :param chat_id: Chat ID to send messages to
        """
        self.bot_token = bot_token
        self.chat_id = chat_id
        self.api_url = f"https://api.telegram.org/bot{bot_token}/sendMessage"

    def format_message(self, form_data):
        """
        Format the form data into a message string.
        :param form_data: dict containing all submitted form fields
        :return: str
        """
        lines = []

        # Offer type
        offer_type = form_data.get('offer_type', 'Unknown')
        lines.append(f"🎁 Offer Type: {offer_type}")

        # Handle common fields
        common_fields = ['customer_name', 'customer_phone', 'delivery_date', 'notes', 'packaging']
        for field in common_fields:
            value = form_data.get(field)
            if value:
                lines.append(f"{field.replace('_', ' ').title()}: {value}")

        # Offer-specific fields
        for key, value in form_data.items():
            if key not in common_fields and key != 'offer_type':
                if isinstance(value, list):
                    # Join list of names or multiple values
                    value = ", ".join(value)
                lines.append(f"{key.replace('_', ' ').title()}: {value}")

        return "\n".join(lines)

    def send_message(self, form_data):
        """
        Send the formatted message to Telegram.
        :param form_data: dict containing form submission data
        """
        message = self.format_message(form_data)
        payload = {
            'chat_id': self.chat_id,
            'text': message
        }
        response = requests.post(self.api_url, data=payload)
        if response.status_code == 200:
            print("✅ Message sent successfully!")
        else:
            print(f"❌ Failed to send message: {response.status_code}")
            print(response.text)

    def send_order_to_admin(self, order):
        try:
            items = json.loads(order.items) if order.items else []

            formatted_items = "—"
            total_amount = 0
            if items:
                formatted_items_list = []
                for i in items:
                    name = i.get("name", "-")
                    qty = i.get("qty", 1)
                    price = i.get("price", 0)
                    total = price * qty
                    total_amount += total
                    formatted_items_list.append(
                        f"• {name} — {qty} x {price} AMD = {total} AMD"
                    )
                formatted_items = "\n".join(formatted_items_list)

            message = (
                f"🆕 New Order #{order.id}\n"
                f"👤 Name: {order.customer_name}\n"
                f"📞 Phone: {order.phone}\n"
                f"📧 Email: {order.email}\n"
                f"💬 Comment: {order.comment or '—'}\n\n"
                f"🛍 Items:\n{formatted_items}\n\n"
                f"💰 Total: {total_amount} AMD\n"
                f"📅 Date: {order.created_at.strftime('%Y-%m-%d %H:%M')}\n"
                f"📦 Status: {order.status}"
            )

            payload = {'chat_id': self.chat_id, 'text': message}
            response = requests.post(self.api_url, data=payload)

            if response.status_code == 200:
                print("✅ Order sent to admin")
            else:
                print("❌ Telegram send error:", response.text)

        except Exception as e:
            print("❌ Error sending order:", e)


        def send_offer_order_to_admin(self, offer):
            """
            Send custom offer order details to Telegram admin
            :param offer: OfferOrder SQLAlchemy object
            """
            try:
                # Products and images
                products = offer.selected_products or []
                images = offer.selected_images or []
                form_data = offer.form_data or {}

                formatted_products = "\n".join([f"• {p.get('name')}" for p in products]) or "—"
                formatted_images = "\n".join(images) if images else "—"

                # Format dynamic form fields
                form_info = "\n".join([f"{k.replace('_',' ').title()}: {v}" for k, v in form_data.items()])

                message = (
                    f"🎁 New Offer Request #{offer.id}\n"
                    f"📦 Type: {offer.offer_type}\n\n"
                    f"👤 Name: {offer.customer_name}\n"
                    f"📞 Phone: {offer.phone}\n"
                    f"📧 Email: {offer.email}\n"
                    f"💬 Comment: {offer.comment or '—'}\n\n"
                    f"🛍 Selected Products:\n{formatted_products}\n\n"
                    f"🖼 Selected Images:\n{formatted_images}\n\n"
                    f"📑 Extra Form Data:\n{form_info or '—'}\n\n"
                    f"📅 Date: {offer.created_at.strftime('%Y-%m-%d %H:%M')}\n"
                    f"📌 Status: {offer.status}"
                )

                payload = {'chat_id': self.chat_id, 'text': message}
                response = requests.post(self.api_url, data=payload)

                if response.status_code == 200:
                    print("✅ Offer order sent to admin")
                else:
                    print("❌ Telegram send error:", response.text)

            except Exception as e:
                print("❌ Error sending offer order:", e)




# Example usage
if __name__ == "__main__":
    BOT_TOKEN = os.getenv('BOT_TOKEN')
    ADMIN_CHAT_ID = os.getenv('CHAT_ID')
    bot = TelegramBot(BOT_TOKEN, ADMIN_CHAT_ID)

    order = Order.query.get(order_id)
    bot.send_order_to_admin(order)

    offer_order = OfferOrder.query.get(offer_id)
    bot.send_offer_order_to_admin(offer_order)