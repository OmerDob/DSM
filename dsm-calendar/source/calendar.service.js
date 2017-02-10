'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const config = require('./services/config.service');
const requestLogger = require('./services/request-logger.middleware');
const actionResult = require('./services/action-result.middleware');
const activity = require('./activity');

module.exports = new CalendarService();

function CalendarService() {
    let _this = this;

    _this.start = start;

    let _app = express();

    function ctor() {
        setUpMiddlewares();
        setUpRouting();
        setUpActionResultHandling();
    }

    function setUpMiddlewares() {
        _app.use(bodyParser.json());
        _app.use(bodyParser.urlencoded({extended: true}));
        _app.use(requestLogger);
    }

    function setUpRouting() {
        _app.get('/checkHealth', (req, res) => res.json({status: 200}));
        _app.use('/activity', activity.router);
    }

    function setUpActionResultHandling() {
        _app.use(actionResult.resolve);
        _app.use(actionResult.handle);
    }

    function start() {
        _app.listen(config.port, () => {
            console.log(`Activities service started on localhost:${config.port}`);
        });
    }

    ctor();
}