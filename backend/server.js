//https://medium.com/@bryantheastronaut/ok-here-we-go-b9f683c5a00c
import express, { Router } from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import task from './models/task-model';
import timer from './models/timer-model';
import api from './controllers/api'
require('dotenv').config();

const app = express();
const router = Router();

const API_PORT = process.env.API_PORT || 3002;
mongoose.connect(process.env.DB_URI, { useNewUrlParser:true })
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

api(app,task,timer)

app.use('/api',router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));