# Bot WhatsApp - Asistente Agrícola 🌾

Bot de WhatsApp que integra Gemini AI con un backend de predicciones meteorológicas y análisis agrícola.

## 🚀 Características

- **IA Conversacional**: Usa Gemini para interpretar mensajes del usuario
- **Análisis Meteorológico**: Conecta con API de predicciones LSTM
- **Respuestas Inteligentes**: Formatea información de manera atractiva
- **Arquitectura Limpia**: Código modular y mantenible

## 📁 Estructura del Proyecto

```
src/
├── controllers/
│   └── whatsappController.js    # Controlador principal
├── services/
│   ├── geminiService.js         # Integración con Gemini AI
│   └── weatherService.js        # Consumo API meteorológica
├── utils/
│   └── messageFormatter.js      # Formateo de mensajes
└── app.js                       # Aplicación principal
```

## 🛠️ Configuración

1. **Variables de entorno**:
```bash
GEMINI_API_KEY=tu_api_key_de_gemini_aqui
PORT=3000
```

2. **Instalación**:
```bash
npm install
```

3. **Ejecutar**:
```bash
npm start
```

## 🔗 Integración con Backend

El bot consume el endpoint `/predict` con este formato:

```json
{
    "date": "2025-07-23",
    "latitude": -0.35,
    "longitude": -78.17,
    "include_analysis": true,
    "analysis_types": ["general", "cultivos"]
}
```

### Tipos de Análisis Disponibles:

- `general`: Condiciones climáticas generales
- `cultivos`: Recomendaciones de cultivos
- `riego`: Manejo del riego
- `alertas`: Alertas climáticas
- `cronograma`: Cronograma agrícola
- `plagas`: Control de plagas
- `suelo`: Conservación del suelo

## 💬 Ejemplos de Uso

**Usuario**: "Hola"
**Bot**: Menú de opciones disponibles

**Usuario**: "¿Qué cultivos puedo sembrar?"
**Bot**: Análisis específico de cultivos recomendados

**Usuario**: "Dame información completa"
**Bot**: Análisis completo con todos los tipos

### Flujo de Datos:

1. **Webhook** recibe mensaje de WhatsApp
2. **Controller** coordina el procesamiento
3. **GeminiService** interpreta la intención del usuario
4. **WeatherService** consulta datos meteorológicos
5. **MessageFormatter** formatea la respuesta
6. **TwiML** envía respuesta a WhatsApp

## 📝 Logs

El sistema incluye logging para:
- Errores de integración con APIs
- Interpretación de mensajes
- Performance del sistema

## 🤝 Integración con Twilio

Configurar webhook en Twilio:
```
https://tu-dominio.com/webhook
```

El bot responde automáticamente a todos los mensajes entrantes.
