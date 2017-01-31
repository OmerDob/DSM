'use strict';

const express = require('express');

const actionDefiner = require('./action-definer.service');
const activityController = require('./activity.controller');

let activityRouter = express.Router();

actionDefiner
    .defineAction(activityRouter, {
        action: activityController.getAllActivities,
        method: 'get'
    })
    .defineAction(activityRouter, {
        action: activityController.getActivityById,
        method: 'get',
        params: ['activityId']
    })
    .defineAction(activityRouter, {
        action: activityController.createActivity,
        method: 'post'
    })
    .defineAction(activityRouter, {
        action: activityController.updateActivity,
        method: 'put',
        params: ['activityId']
    })
    .defineAction(activityRouter, {
        action: activityController.deleteActivity,
        method: 'delete',
        params: ['activityId']
    });

module.exports = activityRouter;