const axios = require('axios');

class WeatherService {
    constructor() {
        this.apiUrl = process.env.URL_API_PREDICT;
        this.defaultCoords = {
            latitude: -0.35,
            longitude: -78.17
        };
    }

    async getAnalysis(analysisTypes, requestedDate = null) {
        const date = requestedDate || this.getYesterdayDate();
        const stepsAFuturo = this.calcularStepsAFuturo(date);

        const requestData = {
            date: date,
            ...this.defaultCoords,
            include_analysis: true,
            steps_a_futuro: stepsAFuturo,
            analysis_types: analysisTypes
        };

        console.log('Consultando API meteorológica con datos:', requestData);

        try {
            const response = await axios.post(this.apiUrl, requestData, {
                headers: { 'Content-Type': 'application/json' },
                timeout: 15000
            });

            return response.data;
        } catch (error) {
            console.error('Error consultando API meteorológica:', error.message);
            throw new Error('No pude obtener los datos meteorológicos');
        }
    }

    calcularStepsAFuturo(fechaSolicitada) {
        const hoy = new Date();
        const fecha = new Date(fechaSolicitada);
        const msPorHora = 1000 * 60 * 60;
        return Math.max(1, Math.round((fecha - hoy) / msPorHora));
    }

    getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    getYesterdayDate() {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        const year = yesterday.getFullYear();
        const month = String(yesterday.getMonth() + 1).padStart(2, '0');
        const day = String(yesterday.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
}

module.exports = WeatherService;
