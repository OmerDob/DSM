'use strict';

const mongoose = require('mongoose');

const config = require('./config.service');

mongoose.Promise = Promise;

let dsmConnection = mongoose.createConnection(config.connectionString);

process
    .on('SIGINT', dsmConnection.close)
    .on('SIGTERM', dsmConnection.close);

module.exports = dsmConnection;