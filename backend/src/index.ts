import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cars from './routers/cars'

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.use('/cars', cars)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});