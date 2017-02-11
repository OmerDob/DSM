angular.module('dsmApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('./source/dsm-calendar/activity/activities-list/activities-list.html',
    "<div>\r" +
    "\n" +
    "    <button>New Activity</button>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div>\r" +
    "\n" +
    "    <ul>\r" +
    "\n" +
    "        <li ng-repeat=\"activity in ctrl.activities\">\r" +
    "\n" +
    "            <a href ng-click=\"ctrl.selectedActivity = activity\">{{activity.name}}</a>\r" +
    "\n" +
    "        </li>\r" +
    "\n" +
    "    </ul>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div ng-if=\"!ctrl.selectedActivity\">\r" +
    "\n" +
    "    Selected an activity to view its details.\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div ng-if=\"ctrl.selectedActivity\">\r" +
    "\n" +
    "    <div>\r" +
    "\n" +
    "        <button>Edit</button>\r" +
    "\n" +
    "        <button ng-click=\"ctrl.deleteActivity()\">Delete</button>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <span>Name: {{ctrl.selectedActivity.name}}</span><br>\r" +
    "\n" +
    "    <span>Starts at: {{ctrl.selectedActivity.startDate | date:'dd/MM/yyyy - hh:mm'}}</span><br>\r" +
    "\n" +
    "    <span>Ends at: {{ctrl.selectedActivity.endDate | date:'dd/MM/yyyy - hh:mm'}}</span><br>\r" +
    "\n" +
    "    <span ng-if=\"ctrl.selectedActivity.location\">At: {{ctrl.selectedActivity.location}}<span><br>\r" +
    "\n" +
    "    <p style=\"white-space: pre;\">{{ctrl.selectedActivity.description}}</p>\r" +
    "\n" +
    "</div>"
  );

}]);
