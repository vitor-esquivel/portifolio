# Vedas Telegram Bot 🕉️

A Telegram bot that can answer questions about Vedic knowledge and concepts from ancient Hindu philosophy.

## Features

- **Welcome Command**: `/start` command that welcomes users and explains the bot's purpose
- **Comprehensive Knowledge Base**: Covers major Vedic concepts including:
  - Vedas (ancient sacred texts)
  - Dharma (righteousness and duty)
  - Karma (law of action and consequence)
  - Moksha (liberation and spiritual freedom)
  - Atman (individual soul)
  - Brahman (ultimate reality)
  - Upanishads (philosophical teachings)
  - Yoga (union and spiritual practice)
  - Samadhi (highest consciousness)
  - Samsara (cycle of birth and death)
- **Smart Query Processing**: Handles various question formats and patterns
- **Logging**: Comprehensive logging of user interactions and bot activities
- **Error Handling**: Graceful error handling and user-friendly responses

## Prerequisites

- Python 3.7 or higher
- A Telegram Bot Token (obtained from @BotFather on Telegram)

## Installation

1. **Clone or download the project files**:
   ```bash
   # If you have the files, navigate to the directory
   cd vedas-telegram-bot
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

## Setup

### 1. Create a Telegram Bot

1. Open Telegram and search for `@BotFather`
2. Start a chat with BotFather and send `/newbot`
3. Follow the instructions to create your bot:
   - Choose a name for your bot (e.g., "Vedas Knowledge Bot")
   - Choose a username (must end with 'bot', e.g., "vedas_knowledge_bot")
4. BotFather will provide you with a token that looks like: `123456789:ABCdefGHijklMNopQRSTuvwxYZ`

### 2. Configure the Bot Token

You have two options to set your bot token:

#### Option 1: Environment Variable (Recommended)
```bash
export TELEGRAM_BOT_TOKEN='your_bot_token_here'
```

#### Option 2: Direct in Code (Not recommended for production)
Edit the `vedas_bot.py` file and replace this line:
```python
bot_token = os.getenv('TELEGRAM_BOT_TOKEN')
```
with:
```python
bot_token = 'YOUR_BOT_TOKEN_HERE'
```

## Usage

### Running the Bot

```bash
python vedas_bot.py
```

If successful, you should see:
```
INFO - Starting Vedas Bot...
INFO - Application started
```

### Interacting with the Bot

1. **Start the bot**: Send `/start` to receive a welcome message
2. **Ask questions**: Type questions about Vedic concepts, such as:
   - "What is Karma?"
   - "Tell me about the Vedas"
   - "Explain Dharma"
   - "What is Moksha?"
   - "How many Vedas are there?"

### Example Conversations

**User**: `/start`
**Bot**: 🕉️ Namaste! Welcome to the Vedas Knowledge Bot! I am here to help you learn about ancient Vedic wisdom...

**User**: "What is Karma?"
**Bot**: 📖 **KARMA** - Karma is the law of cause and effect governing actions and their consequences...

**User**: "Tell me about Dharma"
**Bot**: 📖 **DHARMA** - Dharma is a fundamental concept in Vedic philosophy meaning 'righteousness' or 'duty'...

## Project Structure

```
vedas-telegram-bot/
├── vedas_bot.py          # Main bot script
├── requirements.txt      # Python dependencies
└── README.md            # This file
```

## Knowledge Base

The bot includes detailed information about these Vedic concepts:

- **Vedas**: The four ancient sacred texts (Rigveda, Samaveda, Yajurveda, Atharvaveda)
- **Dharma**: Righteousness, duty, and cosmic law
- **Karma**: Law of cause and effect, action and consequence
- **Moksha**: Liberation from the cycle of birth and death
- **Atman**: Individual soul or self
- **Brahman**: Ultimate reality and universal consciousness
- **Upanishads**: Philosophical texts exploring ultimate reality
- **Yoga**: Union of individual and universal consciousness
- **Samadhi**: Highest state of consciousness in meditation
- **Samsara**: Cycle of birth, death, and rebirth

## Troubleshooting

### Common Issues

1. **"No bot token provided" error**:
   - Make sure you've set the `TELEGRAM_BOT_TOKEN` environment variable
   - Or hardcode the token in the script (not recommended for production)

2. **"ModuleNotFoundError: No module named 'telegram'"**:
   - Install the required dependency: `pip install python-telegram-bot==20.7`

3. **Bot doesn't respond**:
   - Check that the bot is running without errors
   - Verify the token is correct
   - Ensure your bot username is correct when messaging

### Logs

The bot logs all activities to the console with timestamps. Look for:
- User interactions
- Errors and warnings
- Bot startup messages

## Customization

### Adding New Knowledge

To add new Vedic concepts, edit the `VEDIC_KNOWLEDGE` dictionary in `vedas_bot.py`:

```python
VEDIC_KNOWLEDGE = {
    # ... existing entries ...
    "new_concept": """Detailed explanation of the new concept here..."""
}
```

### Modifying Responses

You can customize the bot's responses by editing:
- Welcome message in `start_command()`
- Default response in `find_vedic_answer()`
- Error messages throughout the code

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to contribute by:
- Adding more Vedic concepts to the knowledge base
- Improving the query processing logic
- Adding new features
- Fixing bugs

## Acknowledgments

This bot was created to share the wisdom of ancient Vedic texts and philosophy. The knowledge included is based on traditional Hindu scriptures and teachings.

🙏 _May this bot help spread the timeless wisdom of the Vedas and bring peace and understanding to all who seek it._