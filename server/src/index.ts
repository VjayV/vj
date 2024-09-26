import express from 'express';
import connectDB from './database/connection';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './api';
import user from './api/user';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get('/api/stat', (req, res) => {
  res.status(200).json({ message: 'Service is active' });
});
app.use('/api/user', user);  
app.use('/api/v1', routes);       

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('in err handling middleware')
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: 'Invalid token' });
  } else if(err.status) {
    res.status(err.status).json({ error: err.message})
  } else {
    const message = err.message ? err.message : 'Internal Server Error'
    res.status(500).json({ error: message });
  }
});

app.listen(PORT, () => { console.log(`Started on port ${PORT}`) })