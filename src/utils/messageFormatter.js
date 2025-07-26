class MessageFormatter {
    static formatGreeting() {
        return `
🌾 *¡Hola! Soy tu asistente agrícola* 🌱

Puedo ayudarte con:
📊 Análisis climático general
🌱 Recomendaciones de cultivos
💧 Manejo del riego
🚨 Alertas climáticas
📅 Cronograma agrícola
🐛 Control de plagas
🌾 Conservación del suelo

*Ejemplos:*
• "Análisis general del clima"
• "¿Qué cultivos puedo sembrar?"
• "Información completa de riego y plagas"
• "Dame toda la información agrícola"

¿En qué te puedo ayudar? 😊
        `.trim();
    }

    static formatAnalysis(data) {
        const analysis = data.agricultural_analysis;
        if (!analysis) return 'No se pudo obtener el análisis.';

        let message = '🌾 *Análisis Agrícola* 🌾\n\n';

        if (analysis.resumen_climatico) {
            message += `🌦️ *Clima:*\n${analysis.resumen_climatico}\n\n`;
        }

        if (analysis.recomendaciones_cultivos?.length) {
            message += `🌱 *Cultivos Recomendados:*\n${analysis.recomendaciones_cultivos.join(', ')}\n\n`;
        }

        if (analysis.manejo_riego) {
            message += `💧 *Riego:*\n${analysis.manejo_riego}\n\n`;
        }

        if (analysis.alertas?.length) {
            message += `🚨 *Alertas:*\n${analysis.alertas.join(', ')}\n\n`;
        }

        if (analysis.cronograma_agricola) {
            message += `📅 *Cronograma:*\n${analysis.cronograma_agricola}\n\n`;
        }

        if (analysis.manejo_plagas) {
            message += `🐛 *Plagas:*\n${analysis.manejo_plagas}\n\n`;
        }

        if (analysis.conservacion_suelo) {
            message += `🌾 *Suelo:*\n${analysis.conservacion_suelo}\n\n`;
        }

        return message.trim();
    }

    static formatError() {
        return '❌ Lo siento, no pude procesar tu solicitud. Por favor intenta nuevamente en unos momentos.';
    }
}

module.exports = MessageFormatter;
