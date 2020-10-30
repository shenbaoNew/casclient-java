define([
    "language"
], function (i18n) {
    "use strict";
    var recentlyVisitedModule = angular.module('windchillApp');
    recentlyVisitedModule.register.controller('recentlyVisitedCtrl', ['$scope', '$http', 'userService', 'windchillService',
        function ($scope, $http, userService, windchillService) {
            $scope.header = {
                label: i18n.recent_visit_label
            };
            $scope.title_tips = i18n.table_head_file_storage_catalog;
            $scope.tableHead = {
                number: i18n.table_head_number,
                prdName: i18n.table_head_name,
                modifytime: i18n.table_head_edit_time,
                state: i18n.table_head_state,
                container: i18n.table_head_container,
                version: i18n.table_head_version
            };
            $scope.tableBody = [];
            $scope.params = {
                username: "",
                checkAccess: true
            };

            function getUser() {
                userService.getUserInformation().then(function (result) {
                    if (result && result.data && result.data.name) {
                        $scope.params.username = result.data.name;
                        queryList()
                    }
                });
            }

            function queryList() {
                windchillService.getRecentlyList($scope.params).then(function (result) {
                    $scope.tableBody = JSON.parse(result.data).data;
                })
            }

            (function init() {
                getUser();
            })();
        }]);
    return recentlyVisitedModule;
});