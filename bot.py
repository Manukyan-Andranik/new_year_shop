import requests
import json
import html


class TelegramBot:
    def __init__(self, bot_token, chat_id):
        self.bot_token = bot_token
        self.chat_id = chat_id
        self.api_url = f"https://api.telegram.org/bot{bot_token}/sendMessage"

    def escape(self, value):
        if value is None:
            return "—"
        if isinstance(value, str):
            return html.escape(value)
        return value

    def send_message(self, text="━━━━━━━━━━━━━━━━"):
        payload = {
            "chat_id": self.chat_id,
            "text": text,  # ✅ plain text, no parse_mode issues
        }
        response = requests.post(self.api_url, json=payload)

        if response.status_code != 200:
            print(f"❌ Telegram error: {response.text}")
        else:
            print("✅ Message sent to Telegram Admin")

    # ---------------- SHOP ORDER ----------------

    def send_order_to_admin(self, order):
        try:
            items = json.loads(order.items) if order.items else []
            total_amount = 0
            lines = []

            lines.append("✅ NEW SHOP ORDER")
            lines.append(f"🆔 Order ID: {self.escape(order.id)}")
            lines.append(f"👤 Name: {self.escape(order.customer_name)}")
            lines.append(f"📞 Phone: {self.escape(order.phone)}")
            lines.append(f"📧 Email: {self.escape(order.email)}")
            lines.append(f"💬 Comment: {self.escape(order.comment) or '—'}")
            lines.append("")

            lines.append("🛍 Items:")

            if items:
                for i in items:
                    name = self.escape(i.get("name", "-"))
                    qty = int(i.get("qty", 1))
                    price = int(i.get("price", 0))
                    total = qty * price
                    total_amount += total
                    lines.append(f"• {name}: {qty} × {price} AMD = {total} AMD")
            else:
                lines.append("—")

            lines.append("")
            lines.append(f"💰 Total: {total_amount} AMD")
            lines.append(f"📅 Date: {order.created_at.strftime('%Y-%m-%d %H:%M')}")
            lines.append(f"📦 Status: {self.escape(order.status)}")


            self.send_message("\n".join(lines))

        except Exception as e:
            print("❌ Error sending order:", e)

    # ---------------- OFFER ORDER ----------------

    def send_offer_order_to_admin(self, offer):
        try:
            products = offer.selected_products or []
            images = offer.selected_images or []
            form_data = offer.form_data or {}

            lines = []
            total_amount = 0

            lines.append("🎁 NEW OFFER REQUEST")
            lines.append(f"📦 Type: {self.escape(offer.offer_type).title()}")
            lines.append("")
            lines.append(f"👤 Name: {self.escape(offer.customer_name)}")
            lines.append(f"📞 Phone: {self.escape(offer.phone)}")
            lines.append(f"📧 Email: {self.escape(offer.email)}")
            lines.append(f"💬 Comment: {self.escape(offer.comment) or '—'}")
            lines.append("")

            # Products
            lines.append("🛍 Selected Products:")

            if products:
                for p in products:
                    name = self.escape(p.get("name", "-"))
                    price = int(p.get("price", 0))
                    qty = int(p.get("qty", 1))
                    item_total = price * qty
                    total_amount += item_total
                    lines.append(f"• {name}: {qty} × {price} AMD = {item_total} AMD")
            else:
                lines.append("—")

            lines.append("")
            lines.append(f"💰 Total Price: {total_amount} AMD")
            lines.append("")

            # Images
            lines.append("🖼 Images:")
            lines.extend(images if images else ["—"])
            lines.append("")

            # Form data
            lines.append("📄 Form Data:")
            if form_data:
                for key, value in form_data.items():
                    if isinstance(value, bool):
                        value = "Yes" if value else "No"
                    if isinstance(value, list):
                        value = ", ".join(str(v) for v in value) if value else "—"
                    lines.append(f"{key.replace('_', ' ').title()}: {self.escape(value)}")
            else:
                lines.append("—")

            lines.append("")
            lines.append(
                f"📅 Date: {offer.created_at.strftime('%Y-%m-%d %H:%M') if offer.created_at else '—'}"
            )
            lines.append(f"📌 Status: {self.escape(offer.status) or 'new'}")

            self.send_message("\n".join(lines))

        except Exception as e:
            print("❌ Error sending offer order:", e)
