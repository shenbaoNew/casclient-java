define([
    "app/business/businessRouter"
], function () {
    'use strict';
    var userService = angular.module('windchillApp');
    userService.register.service('userService', ['$http', function ($http) {
        this.userUrl = window.configData.appPath + "/user/me";
        this.getUserInformation = function () {
            return $http.get(this.userUrl)
        }
    }]);
    return userService;
});
