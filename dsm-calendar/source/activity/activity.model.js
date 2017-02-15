'use strict';

const mongoose = require('mongoose');

const dsmDb = require('../services/dsm.db');

let activitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    location: String,
    description: String,
    isDeleted: {
        type: Boolean,
        select: false,
        default: false
    }
}, {
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform: removeObject_is
    }
});

activitySchema.query.notDeleted = function () {
    return this.or([{isDeleted: false}, {isDeleted: undefined}]);
};

function removeObject_is(doc, ret) {
    delete ret._id;

    return ret;
}

module.exports = dsmDb.model('Activity', activitySchema);