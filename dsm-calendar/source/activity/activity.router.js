'use strict';

const express = require('express');

const actionToMiddleware = require('../services/action-to-middleware.service');
const activityController = require('./activity.controller');

let activityRouter = express.Router();

activityRouter
    .get('/', actionToMiddleware.toMiddleware(activityController.getAllActivities))
    .get('/:id', actionToMiddleware.toMiddleware(activityController.getActivityById))
    .post('/', actionToMiddleware.toMiddleware(activityController.createActivity))
    .put('/:id', actionToMiddleware.toMiddleware(activityController.updateActivity))
    .delete('/:id', actionToMiddleware.toMiddleware(activityController.deleteActivity));

module.exports = activityRouter;