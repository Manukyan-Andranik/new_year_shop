import requests
import os
BOT_TOKEN = os.getenv('BOT_TOKEN')
CHAT_ID = os.getenv('CHAT_ID')

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


# Example usage
if __name__ == "__main__":
    BOT_TOKEN = "8303404870:AAG45wXf4fUqqADHpkGyptbY3VImohOXGt0"
    CHAT_ID = "5426290502"

    # Example form submission data
    form_submission = {
        "offer_type": "my_classroom",
        "school_name": "ABC School",
        "class_number": "5A",
        "student_count": "27",
        "boys_girls": "15 տղա / 12 աղջիկ",
        "nominal": True,
        "names": ["Aram", "Siranush", "Vahan"],
        "packaging": "box",
        "notes": "Please make it colorful",
        "customer_name": "Anna",
        "customer_phone": "+37499123456",
        "delivery_date": "2025-12-01"
    }

    bot = TelegramBot(BOT_TOKEN, CHAT_ID)
    bot.send_message(form_submission)
