// Use express.js
const express = require('express');
const server = express();

// Set up body-parser (to handle json files)
const bodyParser = require('body-parser');
server.use(bodyParser.json());

// set-up env 
//require('dotenv/config');
const dotenv = require('dotenv');
dotenv.config();

// set-up port
const PORT = process.env.PORT || 5000;

// start listening to port
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// mongo DB database
const mongoose = require('mongoose');

mongoose.connect(
    process.env.DB_CONNECTOR, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
}, () => {
    console.log('Connected to DataBase!');
})

// import routes
const api_routes = require('./api/api');
const authRoute = require('./api/auth');

// middleware
server.use('/uploads', express.static('uploads'));
server.use('/api/v1', api_routes);
server.use('/api/v1/user', authRoute);

