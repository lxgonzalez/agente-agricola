const GeminiService = require('../services/geminiService');
const WeatherService = require('../services/weatherService');
const MessageFormatter = require('../utils/messageFormatter');

class WhatsAppController {
    constructor() {
        this.geminiService = new GeminiService();
        this.weatherService = new WeatherService();
    }

    async handleMessage(message) {
        try {
            // Interpretar intención del usuario con Gemini
            const interpretation = await this.geminiService.interpretMessage(message);

            if (interpretation.intent === 'greeting') {
                return MessageFormatter.formatGreeting();
            }

            // Obtener análisis meteorológico
            const weatherData = await this.weatherService.getAnalysis(interpretation.analysis_types);
            return MessageFormatter.formatAnalysis(weatherData);

        } catch (error) {
            console.error('Error procesando mensaje:', error.message);
            return MessageFormatter.formatError();
        }
    }
}

module.exports = WhatsAppController;
