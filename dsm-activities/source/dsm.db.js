'use strict';

const mongoose = require('mongoose');

mongoose.Promise = Promise;

let dsmConnection = mongoose.createConnection('mongodb://localhost/dsm');

process
    .on('SIGINT', dsmConnection.close)
    .on('SIGTERM', dsmConnection.close);

module.exports = dsmConnection;