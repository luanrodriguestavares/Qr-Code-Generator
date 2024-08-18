const express = require('express');
const cors = require('cors');
const QRCode = require('qrcode');

const app = express();
const port = process.env.PORT || 3000;

// Habilitando CORS
app.use(cors());

// Rota para gerar o QR Code
app.get('/generate', async (req, res) => {
    const { text } = req.query;

    if (!text) {
        return res.status(400).send('Text is required');
    }

    try {
        const qrCodeUrl = await QRCode.toDataURL(text);
        const img = Buffer.from(qrCodeUrl.split(',')[1], 'base64');
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': img.length,
        });
        res.end(img);
    } catch (err) {
        res.status(500).send('Error generating QR code');
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`QR Code Generator is running`);
});
