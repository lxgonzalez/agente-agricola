const { GoogleGenerativeAI } = require('@google/generative-ai');

class GeminiService {
    constructor() {
        this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    }

    async interpretMessage(message) {
        const prompt = `
Analiza el siguiente mensaje del usuario y determina qué quiere hacer:

Mensaje: "${message}"

Tipos de análisis disponibles:
- general: Condiciones generales del clima
- cultivos: Recomendaciones de cultivos apropiados  
- riego: Manejo y programación del riego
- alertas: Alertas climáticas y riesgos
- cronograma: Cronograma agrícola óptimo
- plagas: Manejo de plagas según condiciones climáticas
- suelo: Conservación y manejo del suelo

Responde SOLO con un JSON en este formato:
{
    "intent": "greeting|analysis",
    "analysis_types": ["general", "cultivos", "riego", "alertas", "cronograma", "plagas", "suelo"]
}

Si es un saludo o pregunta general, usa "greeting".
Si pide información específica, usa "analysis" y los tipos correspondientes.
Si no especifica tipos, incluye ["general", "cultivos"].
`;

        try {
            const result = await this.model.generateContent(prompt);
            const response = result.response.text();
            return JSON.parse(response.replace(/```json|```/g, '').trim());
        } catch (error) {
            console.error('Error interpretando mensaje:', error);
            return { intent: 'greeting', analysis_types: [] };
        }
    }
}

module.exports = GeminiService;
