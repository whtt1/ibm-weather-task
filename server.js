import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/api/log', (req, res) => {
    const { city } = req.body;
    const timestamp = new Date().toLocaleString();
    
    console.log(`[USER_ACTION] ${timestamp} - City Selected: ${city}`);
    
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Backend Logging Server running on http://localhost:${PORT}`);
});