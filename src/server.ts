import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import contactHandler from './pages/api/contact';

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/contact', contactHandler);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
