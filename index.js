const express = require('express');
const crypto = require('crypto');
const cors = require('cors');
require('dotenv').config();


const app = express();
const PORT = 3000 || process.env.PORT;
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

app.use(cors());
app.use(express.json());

app.post('/webhook', (req, res) => {
    const signature = req.headers['x-hub-signature'];
    const payload = JSON.stringify(req.body);

    const hash = crypto.createHmac('sha1', WEBHOOK_SECRET).update(payload).digest('hex');
    
    if (signature !== `sha1=${hash}`) {
        return res.status(401).send('Unauthorized');
    }

    console.log('Recived a webhook event: ', req.body);

    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`started server at ${PORT}`); 
})