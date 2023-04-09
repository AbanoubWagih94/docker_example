const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const PORT = process.env.PORT || 4000;
//const { Client } = require('pg')
const app = express();

//connect to database
// const DB_USER = 'root';
// const DB_PASSWORD = 'example';
// const DB_PORT = 5432;
// const DB_HOST = 'postgres';
// const URI = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
// const DB_CLIENT = new Client({
//     connectionString: URI,
// });
// DB_CLIENT.connect()
//     .then(() => console.log('connect to postgres databse'))
//     .catch((err) => console.log(err));

const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_PORT = 27017;
const DB_HOST = 'mongo';
const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
mongoose.connect(URI)
    .then(() => console.log('connect to databse using docker hub'))
    .catch((err) => console.log(err));



const redisPort = 6379;
const redisHost = 'redis';
const client = redis.createClient({ url: `redis://${redisHost}:${redisPort}` });
client.on('error', (err) => console.log('Redis client error', err));
client.on('connect', () => console.log('Redis client connect'));
client.connect();
app.get('/', (req, res) => {
    client.set('products', 'products....')
    res.send('<h1>Hello dasd a</h1>')
})
app.get('/data', async (req, res) => {
    const products = await client.get('products');

    res.send(`<h1>Hello dasd a</h1> <h2>${products}</h2>`)
})
app.listen(PORT, () => console.log('app is running'));