const express = require('express');
require('dotenv').config()
const { Pool, Client } = require('pg');

//Constants
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

//App
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});

app.get('/', (req, res) => {
	res.status(200).send('Server connected');
});


//DB client
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'db',
    password: 'pass',
    port: 5432
})

if (process.env.NODE_ENV === 'development') {
    client.host = 'postgres'
} 

console.log("client host is:", client.host)

client.connect()
client.query('SELECT NOW()', (err, res) => {
    console.log("Error or response:: ", err, res)
    client.end()
})

