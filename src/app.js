require('dotenv').config();
const express = require('express');
const { MessagingResponse } = require('twilio').twiml;
const WhatsAppController = require('./controllers/whatsappController');

const app = express();
app.use(express.urlencoded({ extended: false }));

const whatsAppController = new WhatsAppController();

app.post('/webhook', async (req, res) => {
    const twiml = new MessagingResponse();
    const userMessage = req.body.Body || '';

    try {
        const response = await whatsAppController.handleMessage(userMessage);
        twiml.message(response);
    } catch (error) {
        console.error('Error en webhook:', error);
        twiml.message('❌ Error interno del servidor. Intenta más tarde.');
    }

    res.type('text/xml').send(twiml.toString());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🤖 Bot WhatsApp corriendo en http://localhost:${PORT}`);
    console.log(`📡 Webhook endpoint: http://localhost:${PORT}/webhook`);
});
