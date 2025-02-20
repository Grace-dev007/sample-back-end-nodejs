import * as dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import appRoutes from './routes/index';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

import { createServer } from 'node:http';

import connectDB from './utils/mongoose/db';
import logger from './helpers/logger';
import { handleError } from './errorhandler/errorHandler';
import moment from 'moment-timezone';

import swaggerUi from 'swagger-ui-express';

//Swagger
import swaggerDocument from './OAS/swagger.json';

// Env Config
dotenv.config({ path: path.join(__dirname, '../.env') });

const port = parseInt(process.env.PORT || '4000', 10) ;

const app = express();

const corsUrl: any = process.env.CORS_URL;

app.use(
  cors({
    allowedHeaders: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    origin: ['http://localhost:9000', corsUrl],
  }),
);

// Use Helmet!
app.use(helmet());

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use((req, res, next) => {
  next();
});

app.use('/webhook', appRoutes());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/api/api-docs', swaggerUi.serve);
app.get('/api/api-docs', swaggerUi.setup(swaggerDocument));

// DB Connect
connectDB()


app.get('/api/health', (req, res) => {
  res.sendStatus(200);
});


app.get('/header/check', (req, res) => {
  const title = req.query.title;
  logger.info('Header-check', { title: title, headers: req.headers });
  res.sendStatus(200);
});

app.get('/error/logs', (req, res) => {
  fs.readFile(path.resolve(__dirname, '../error.log'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(data);
  });
});
app.get('/logs', (req, res) => {
  fs.readFile(path.resolve(__dirname, '../combined.log'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(data);
  });
});

app.use('/api/v1', appRoutes());
app.use('/api', appRoutes());

app.use(handleError);

// app.listen(port, () => console.log(`Listing port is ${port} - pid : ${process.pid}`));
app.listen(4000, '0.0.0.0', () => {
  console.log('Server is running on port 4000');
});

app.get('/datecheck', (req, res) => {
  const time = '20:39:00';
  const kolkataTime = moment.tz(time, 'HH:mm:ss', 'Asia/Kolkata');
  const utcTime = kolkataTime.utc();
  const utctime = utcTime.format('HH:mm:ss');
  console.log('datevalue: ', utctime); // should print the time in UTC
  res.status(200).json({ data: utctime });
});




