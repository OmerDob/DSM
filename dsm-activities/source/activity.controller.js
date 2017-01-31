'use strict';

const activityModel = require('./activity.model');

module.exports = new ActivityController();

function ActivityController() {
    let _this = this;

    _this.getAllActivities = getAllActivities;
    _this.getActivityById = getActivityById;
    _this.createActivity = createActivity;
    _this.updateActivity = updateActivity;
    _this.deleteActivity = deleteActivity;

    function getAllActivities() {
        return activityModel
            .find()
            .notDeleted()
            .exec()
            .catch(handleError);
    }

    function getActivityById(activityId) {
        return activityModel
            .findById(activityId)
            .notDeleted()
            .exec()
            .catch(handleError);
    }

    function createActivity(activityData) {
        let newActivity = new activityModel(activityData);

        return newActivity
            .save()
            .catch(handleError);
    }

    function updateActivity(activityId, activityData) {
        return activityModel
            .findByIdAndUpdate(activityId, activityData, {new: true})
            .exec()
            .catch(handleError);
    }

    function deleteActivity(activityId) {
        return updateActivity(activityId, {isDeleted: true})
            .then(doc => {success: true})
            .catch(handleError);
    }

    function handleError(error) {
        throw {
            status: 500,
            message: error.message
        };
    }
}