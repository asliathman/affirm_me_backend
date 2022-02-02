import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import { Request, Response } from 'express';
import { port } from './config';
import goalsRoutes from './routes/goals.routes';

// do we need Heroku App.json Schema: https://devcenter.heroku.com/articles..
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Hello World'
    });
});

app.use('/goals', goalsRoutes);

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`API started at http://localhost:${port}`);
});