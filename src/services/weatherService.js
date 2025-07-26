const axios = require('axios');

class WeatherService {
    constructor() {
        this.apiUrl = process.env.URL_API_PREDICT;
        this.defaultCoords = {
            latitude: -0.35,
            longitude: -78.17
        };
    }

    async getAnalysis(analysisTypes) {
        const requestData = {
            date: this.getYesterdayDate(),
            ...this.defaultCoords,
            include_analysis: true,
            analysis_types: analysisTypes
        };
        console.log('Consultando API meteorológica con datos:', requestData);

        try {
            const response = await axios.post(this.apiUrl, requestData, {
                headers: { 'Content-Type': 'application/json' },
                timeout: 10000
            });

            return response.data;
        } catch (error) {
            console.error('Error consultando API meteorológica:', error.message);
            throw new Error('No pude obtener los datos meteorológicos');
        }
    }

    getYesterdayDate() {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return yesterday.toISOString().split('T')[0];
    }
}

module.exports = WeatherService;
