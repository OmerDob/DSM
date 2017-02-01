'use strict';

module.exports = logRequest;

function logRequest(req, res, next) {
    console.log(`${new Date(Date.now())} - Request: "${req.url}" (${req.method.toUpperCase()})`);
    next();    
}