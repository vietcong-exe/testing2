const axios = require('axios');
const FormData = require('form-data');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Configuração do Body-Parser para interpretar dados JSON
app.use(bodyParser.json({ limit: '50mb' }));

// Middleware para depuração
// app.use((req, res, next) => {
//     console.log('Request Headers:', req.headers);
//     console.log('Request Body:', req.body);
//     next();
// });

// Endpoint para receber a imagem em base64 e fazer o upload
app.post('/upload', async (req, res) => {
    try {
        const { imageBase64, apiKey } = req.body;

        if (!imageBase64 || !apiKey) {
            return res.status(400).send('Image base64 and API key are required.');
        }

        const form = new FormData();
        form.append('key', apiKey);
        form.append('image', imageBase64); // Enviando a imagem base64

        const response = await axios.post('https://api.imgbb.com/1/upload', form, {
            headers: {
                ...form.getHeaders()
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Erro ao fazer upload da imagem:', error);
        res.status(500).send('Erro ao fazer upload da imagem.');
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor ouvindo na porta ${port}`);
});
