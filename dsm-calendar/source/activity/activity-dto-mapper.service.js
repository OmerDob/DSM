'use strict';

const dtoMapperFactoryService = require('../services/dto-mapper-factory.service');

let activityDtoMap = {
    '_id': 'id',
    'name': 'name',
    'startDate': 'startDate',
    'endDate': 'endDate',
    'location': 'location',
    'description': 'description'
};

module.exports = dtoMapperFactoryService.createDtoMapper({
    map: activityDtoMap
});