'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config.service');
const requestLogger = require('./request-logger.middleware');
const actionResult = require('./action-result.middleware');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(requestLogger);

app.get('/checkHealth', (req, res) => res.json({status: 200}));
app.use('/', require('./activity.router'));

app.use(actionResult.resolve);
app.use(actionResult.handle);

app.listen(config.port, () => {
    console.log(`Activities service started on localhost:${config.port}`);
});