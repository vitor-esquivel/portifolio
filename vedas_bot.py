#!/usr/bin/env python3
"""
Vedas Telegram Bot
A bot that can answer questions about Vedic knowledge and concepts.
"""

import logging
import os
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes

# Enable logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# Vedic Knowledge Base
VEDIC_KNOWLEDGE = {
    "vedas": """The Vedas are the oldest sacred texts of Hinduism, composed in ancient Sanskrit. There are four main Vedas:
1. Rigveda - Collection of hymns and prayers
2. Samaveda - Melodies and chants
3. Yajurveda - Sacrificial formulas and rituals
4. Atharvaveda - Spells, charms, and practical knowledge

They are considered apauruṣeya (not of human origin) and form the foundation of Hindu philosophy and practice.""",

    "dharma": """Dharma is a fundamental concept in Vedic philosophy meaning 'righteousness' or 'duty'. It refers to:
- The cosmic law and order that governs the universe
- Individual duty and moral obligations based on one's station in life
- Righteous living in accordance with natural and moral law
- The path of virtue that leads to spiritual growth

Dharma varies according to one's age, caste, gender, and circumstances (svadharma).""",

    "karma": """Karma is the law of cause and effect governing actions and their consequences. Key aspects include:
- Every action (physical, mental, or verbal) creates consequences
- Good actions lead to positive results, bad actions to negative ones
- Karma can manifest in this life or future lives
- It's not fatalistic - one can change their karma through right action
- Liberation (moksha) involves transcending the cycle of karma

The three types are: Sanchita (accumulated), Prarabdha (current life), and Agami (future).""",

    "moksha": """Moksha is the ultimate goal of human life in Vedic philosophy, meaning 'liberation' or 'release'. It represents:
- Freedom from the cycle of birth, death, and rebirth (samsara)
- Realization of one's true nature as Atman (soul)
- Union with Brahman (universal consciousness)
- Complete cessation of suffering and ignorance
- The fourth and highest goal of life (purushartha)

It can be achieved through various paths: knowledge (jnana), devotion (bhakti), action (karma), or meditation (raja yoga).""",

    "atman": """Atman is the individual soul or self in Vedic philosophy. Key teachings include:
- The eternal, unchanging essence of every being
- Distinct from the body, mind, and ego
- Identical in nature to Brahman (universal soul)
- The witness consciousness that observes all experiences
- Realizing the Atman is key to achieving moksha

The Upanishads teach 'Tat tvam asi' (Thou art That) - the identity of Atman and Brahman.""",

    "brahman": """Brahman is the ultimate reality in Vedic philosophy. Characteristics include:
- The absolute, formless, infinite consciousness
- The source and essence of all existence
- Beyond all attributes yet the ground of all being
- Both immanent (within everything) and transcendent (beyond everything)
- Described as Sat-Chit-Ananda (Existence-Consciousness-Bliss)

Understanding Brahman is the highest knowledge leading to liberation.""",

    "upanishads": """The Upanishads are philosophical texts that form the theoretical foundation of Hinduism. They:
- Explore the nature of ultimate reality (Brahman)
- Teach the identity of individual soul (Atman) with universal soul
- Present various methods for spiritual realization
- Include famous teachings like 'Om Tat Sat' and 'Tat tvam asi'
- Are considered the end portion of the Vedas (Vedanta)

Major Upanishads include Isha, Kena, Katha, Prashna, Mundaka, and Chandogya.""",

    "yoga": """Yoga in Vedic context means 'union' and refers to:
- The practice of connecting individual consciousness with universal consciousness
- Various paths including Karma Yoga (action), Bhakti Yoga (devotion), Jnana Yoga (knowledge)
- The eight-limbed path (Ashtanga) outlined by Patanjali
- Physical, mental, and spiritual practices for self-realization
- The ultimate goal of achieving samadhi (unified consciousness)

Yoga is both a practice and a state of being.""",

    "samadhi": """Samadhi is the highest state of consciousness in Vedic meditation. It involves:
- Complete absorption and unity of consciousness
- Transcendence of the subject-object duality
- Direct experience of truth beyond mental concepts
- The eighth and final limb of Patanjali's eight-fold yoga path
- Different levels from Savikalpa (with form) to Nirvikalpa (formless)

It represents the practical realization of Vedic spiritual goals.""",

    "samsara": """Samsara is the cycle of birth, death, and rebirth in Vedic philosophy. Key aspects:
- The continuous cycle of existence driven by karma
- Characterized by suffering due to ignorance and attachment
- All beings are caught in this cycle until liberation
- Governed by the law of cause and effect
- Escape is possible through spiritual knowledge and practice

The goal is to achieve moksha and break free from samsara."""
}

class VedasBot:
    def __init__(self, token):
        self.token = token
        self.application = None
    
    async def start_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
        """Handle the /start command."""
        user = update.effective_user
        logger.info(f"User {user.id} ({user.username}) started the bot")
        
        welcome_message = f"""🕉️ Namaste {user.first_name}!

Welcome to the Vedas Knowledge Bot! 

I am here to help you learn about ancient Vedic wisdom and philosophy. You can ask me questions about:

📚 **Vedic Concepts I Know:**
• Vedas - The ancient sacred texts
• Dharma - Righteousness and duty  
• Karma - Law of action and consequence
• Moksha - Liberation and spiritual freedom
• Atman - The individual soul
• Brahman - Ultimate reality
• Upanishads - Philosophical teachings
• Yoga - Union and spiritual practice
• Samadhi - Highest consciousness
• Samsara - Cycle of birth and death

Simply type your question or the term you'd like to learn about!

For example, try asking: "What is Karma?" or "Tell me about the Vedas"

🙏 May your journey in Vedic wisdom bring you peace and understanding!"""

        await update.message.reply_text(welcome_message)
    
    async def handle_message(self, update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
        """Handle incoming messages and provide responses."""
        user = update.effective_user
        message_text = update.message.text.lower().strip()
        
        logger.info(f"User {user.id} ({user.username}) asked: {update.message.text}")
        
        # Search for matching terms in the knowledge base
        response = self.find_vedic_answer(message_text)
        
        await update.message.reply_text(response)
    
    def find_vedic_answer(self, query: str) -> str:
        """Find the most relevant answer from the Vedic knowledge base."""
        query = query.lower()
        
        # Direct term matching
        for term, knowledge in VEDIC_KNOWLEDGE.items():
            if term in query:
                return f"📖 **{term.upper()}**\n\n{knowledge}"
        
        # Pattern matching for common question formats
        if any(word in query for word in ["what is", "what are", "tell me about", "explain"]):
            for term in VEDIC_KNOWLEDGE.keys():
                if term in query:
                    return f"📖 **{term.upper()}**\n\n{VEDIC_KNOWLEDGE[term]}"
        
        # Specific question patterns
        if "how many vedas" in query or "number of vedas" in query:
            return "📚 There are **four main Vedas**: Rigveda, Samaveda, Yajurveda, and Atharvaveda. Each serves a specific purpose in Vedic tradition and contains different types of knowledge and practices."
        
        if "oldest" in query and ("text" in query or "scripture" in query):
            return "📜 The **Rigveda** is considered the oldest of the Vedic texts, with some hymns dating back to around 1500 BCE or earlier. It forms the foundation of Vedic literature and Hindu philosophy."
        
        if "goal of life" in query or "purpose of life" in query:
            return "🎯 According to Vedic philosophy, there are **four main goals of human life** (Purusharthas):\n\n1. **Dharma** - Righteous living\n2. **Artha** - Material prosperity\n3. **Kama** - Emotional fulfillment\n4. **Moksha** - Spiritual liberation\n\nMoksha is considered the ultimate goal."
        
        # Default response for unknown questions
        return """🤔 I don't have specific information about that topic in my current knowledge base.

However, I can help you with these Vedic concepts:
• Vedas, Dharma, Karma, Moksha
• Atman, Brahman, Upanishads
• Yoga, Samadhi, Samsara

Try asking about any of these terms, or rephrase your question. For example:
"What is Dharma?" or "Tell me about Moksha"

🙏 Feel free to ask about any Vedic concept you're curious about!"""
    
    async def error_handler(self, update: object, context: ContextTypes.DEFAULT_TYPE) -> None:
        """Log errors caused by Updates."""
        logger.warning(f'Update {update} caused error {context.error}')
    
    def run(self):
        """Start the bot."""
        if not self.token:
            logger.error("No bot token provided! Please set TELEGRAM_BOT_TOKEN environment variable.")
            return
        
        # Create the Application
        self.application = Application.builder().token(self.token).build()
        
        # Add handlers
        self.application.add_handler(CommandHandler("start", self.start_command))
        self.application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, self.handle_message))
        
        # Add error handler
        self.application.add_error_handler(self.error_handler)
        
        # Start the bot
        logger.info("Starting Vedas Bot...")
        self.application.run_polling(allowed_updates=Update.ALL_TYPES)

def main():
    """Main function to run the bot."""
    # Get bot token from environment variable
    bot_token = os.getenv('TELEGRAM_BOT_TOKEN')
    
    if not bot_token:
        print("⚠️  ERROR: Please set your Telegram Bot Token!")
        print("You can set it as an environment variable:")
        print("export TELEGRAM_BOT_TOKEN='your_bot_token_here'")
        print("\nOr modify this script to include your token directly (not recommended for production)")
        print("bot_token = 'YOUR_BOT_TOKEN_HERE'")
        return
    
    # Create and run the bot
    bot = VedasBot(bot_token)
    
    try:
        bot.run()
    except KeyboardInterrupt:
        logger.info("Bot stopped by user")
    except Exception as e:
        logger.error(f"An error occurred: {e}")

if __name__ == '__main__':
    main()