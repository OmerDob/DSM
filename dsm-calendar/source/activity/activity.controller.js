'use strict';

const activityModel = require('./activity.model');
const activityDtoMapperService = require('./activity-dto-mapper.service');

module.exports = new ActivityController();

function ActivityController() {
    let _this = this;

    _this.getAllActivities = getAllActivities;
    _this.getActivityById = getActivityById;
    _this.createActivity = createActivity;
    _this.updateActivity = updateActivity;
    _this.deleteActivity = deleteActivity;

    function getAllActivities() {
        let query = activityModel.find();

        return handleQuery(query, true);
    }

    function getActivityById(activityId) {
        let query = activityModel.findById(activityId);

        return handleQuery(query);
    }

    function createActivity(activityData) {
        let newActivity = new activityModel(activityData);
        let resultPromise = newActivity.save();

        return handleResultPromise(resultPromise);
    }

    function updateActivity(activityId, activityDto) {
        let activity = activityDtoMapperService.backToBase(activityDto);
        let resultPromise = activityModel
            .findByIdAndUpdate(activityId, activity, {new: true})
            .exec()
        
        return handleResultPromise(resultPromise);
    }

    function deleteActivity(activityId) {
        return activityModel
            .findByIdAndUpdate(activityId, {isDeleted: true}, {new: true})
            .exec()
            .then(doc => {return {success: true};})
            .catch(handleError);
    }

    function handleQuery(query, multiResult) {
        let resultPromise = query
            .notDeleted()
            .exec();
        
        return handleResultPromise(resultPromise, multiResult);
    }

    function handleResultPromise(resultPromise, multiResult) {
        return resultPromise
            .then(multiResult ? activityDtoMapperService.toDtos : activityDtoMapperService.toDto)
            .catch(handleError);
    }

    function handleError(error) {
        throw {
            status: 500,
            message: error.message
        };
    }
}