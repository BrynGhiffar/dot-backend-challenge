import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { userRoute } from './routes/UserRouter';
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/api", userRoute);
app.use(cors());

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send("Hello World, my name is Bryn");
    next();
});

app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});