//https://medium.com/@bryantheastronaut/ok-here-we-go-b9f683c5a00c
import express, { Router } from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import { getSecret } from './secrets';
require('dotenv').config();

const app = express();
const router = Router();

const API_PORT = process.env.API_PORT || 3002;
console.log(process.env.DB_URI)
mongoose.connect(process.env.DB_URI)
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

router.get('/test', (req,res) => {
    console.log('asdf')
    res.json({ message: 'asdf' });
});

app.use('/api',router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));