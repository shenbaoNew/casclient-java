define([
    "app/business/businessRouter",
], function () {
    'use strict';
    return angular.module('windchillApp').register.service('windchillService', ['$http', function ($http) {
        this.recentlyVisitedUrl = window.configData.appPath + '/windchill/recentlyVisited';
        this.myPDMLinkProductsUrl = window.configData.appPath + "/windchill/myPDMLinkProducts";
        this.myCheckOutUrl = window.configData.appPath + "/windchill/myCheckOut";
        this.myWTObjectsUrl = window.configData.appPath + "/windchill/myWTObjects";
        this.toDoTasksUrl = window.configData.appPath + "/windchill/toDoTasks";
        this.historicalTasksUrl = window.configData.appPath + "/windchill/historicalTasks";
        this.myUpDatesUrl = window.configData.appPath + "/windchill/myUpdates";
        this.getRecentlyList = function (params) {
            var recentUrl = "";
            if (params) {
                recentUrl = this.recentlyVisitedUrl + '?';
                for (var key in params) {
                    recentUrl = recentUrl + key + '=' + params[key] + '&';
                }
                if (recentUrl.lastIndexOf('&')) {
                    recentUrl = recentUrl.substring(0, recentUrl.lastIndexOf('&'))
                }
            }
            return $http.get(recentUrl)
        };
        this.getMyPDMLinkProducts = function (params) {
            var myPDMLinkUrl = "";
            if (params) {
                myPDMLinkUrl = this.myPDMLinkProductsUrl + '?';
                for (var key in params) {
                    myPDMLinkUrl = myPDMLinkUrl + key + '=' + params[key] + '&';
                }
                if (myPDMLinkUrl.lastIndexOf('&')) {
                    myPDMLinkUrl = myPDMLinkUrl.substring(0, myPDMLinkUrl.lastIndexOf('&'))
                }
            }
            return $http.get(myPDMLinkUrl)
        };
        this.getMyWTObjects = function (params) {
            var WTOUrl = "";
            if (params) {
                WTOUrl = this.myWTObjectsUrl + '?';
                for (var key in params) {
                    WTOUrl = WTOUrl + key + '=' + params[key] + '&';
                }
                if (WTOUrl.lastIndexOf('&')) {
                    WTOUrl = WTOUrl.substring(0, WTOUrl.lastIndexOf('&'))
                }
            }
            return $http.get(WTOUrl)
        };
        this.getMyCheckOut = function (params) {
            var myCheckUrl = "";
            if (params) {
                myCheckUrl = this.myCheckOutUrl + '?';
                for (var key in params) {
                    myCheckUrl = myCheckUrl + key + '=' + params[key] + '&';
                }
                if (myCheckUrl.lastIndexOf('&')) {
                    myCheckUrl = myCheckUrl.substring(0, myCheckUrl.lastIndexOf('&'))
                }
            }
            return $http.get(myCheckUrl)
        };
        this.getToDotasks = function (params) {
            var toDoUrl = "";
            if (params) {
                toDoUrl = this.toDoTasksUrl + '?';
                for (var key in params) {
                    toDoUrl = toDoUrl + key + '=' + params[key] + '&';
                }
                if (toDoUrl.lastIndexOf('&')) {
                    toDoUrl = toDoUrl.substring(0, toDoUrl.lastIndexOf('&'))
                }
            }
            return $http.get(toDoUrl)
        };
        this.getHistoricalTasks = function (params) {
            var historyUrl = "";
            if (params) {
                historyUrl = this.historicalTasksUrl + '?';
                for (var key in params) {
                    historyUrl = historyUrl + key + '=' + params[key] + '&';
                }
                if (historyUrl.lastIndexOf('&')) {
                    historyUrl = historyUrl.substring(0, historyUrl.lastIndexOf('&'))
                }
            }
            return $http.get(historyUrl)
        };
        this.getMyUpDates = function (params) {
            var myUpUrl = "";
            if (params) {
                myUpUrl = this.myUpDatesUrl + '?';
                for (var key in params) {
                    myUpUrl = myUpUrl + key + '=' + params[key] + '&';
                }
                if (myUpUrl.lastIndexOf('&')) {
                    myUpUrl = myUpUrl.substring(0, myUpUrl.lastIndexOf('&'))
                }
            }
            return $http.get(myUpUrl)
        }
    }]);
});
