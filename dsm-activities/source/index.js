'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config.service');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
    console.log(`${new Date(Date.now())} - Request: "${req.url}" (${req.method.toUpperCase()})`);
    next();
});

app.get('/checkHealth', (req, res) => res.json({status: 200}));

app.use('/', require('./activity.router'));

app.listen(config.port, () => {
    console.log(`activities service started on localhost:${config.port}`);
});