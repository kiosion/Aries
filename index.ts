import { config } from 'dotenv';
import express, { Application, NextFunction, Request, Response } from 'express';

config();

const app: Application = express();

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('<center><h1>Hello, world!</h1><br><p>This is a temp res for now 🙂</p></center>');
});

const PORT: number  = +process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

