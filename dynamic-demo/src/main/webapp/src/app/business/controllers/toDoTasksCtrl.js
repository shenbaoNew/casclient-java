define([
    "language"
], function (i18n) {
    "use strict";
    var toDoTasksModule = angular.module('windchillApp');
    toDoTasksModule.register.controller('toDoTasksCtrl', ['$scope', 'userService', 'windchillService',
        function ($scope, userService, windchillService) {
            $scope.header = {
                label: i18n.to_do_tasks_label
            };
            $scope.title_tips = i18n.table_head_file_storage_catalog;
            $scope.tableHead = {
                workitemName: i18n.table_head_name,
                themeName: i18n.table_head_theme_name,
                objectState: i18n.table_head_state,
                objectContainer: i18n.table_head_container,
                objectTime: i18n.table_head_create_time,
                role: i18n.table_head_role
            };
            $scope.tableBody = [
                /* {
                     workitemName: "编制",
                     workitemUrl: "http:/plmdev.unidoyun.com/Windchill/app/#ptc1/tcomp/infoPage?oid=OR:wt.part.WTPart:401108333&u8=1",
                     themeName: "部件 - t000001548,图样名称，A1",
                     objectUrl: "http:/plmdev.unidoyun.com/Windchill/app/#ptc1/tcomp/infoPage?oid=OR:wt.part.WTPart:401108333&u8=1",
                     objectState: "正在工作",
                     objectContainer: "XXX产品部",
                     objectTime: "2018/5/31 13：34",
                     role: "工作负责人"
                 },
                 {
                     workitemName: "编制",
                     workitemUrl: "http:/plmdev.unidoyun.com/Windchill/app/#ptc1/tcomp/infoPage?oid=OR:wt.part.WTPart:401108333&u8=1",
                     themeName: "部件 - t000001548,图样名称，A1",
                     objectUrl: "http:/plmdev.unidoyun.com/Windchill/app/#ptc1/tcomp/infoPage?oid=OR:wt.part.WTPart:401108333&u8=1",
                     objectState: "正在工作",
                     objectContainer: "XXX产品部",
                     objectTime: "2018/5/31 13：34",
                     role: "工作负责人"
                 },
                 {
                     workitemName: "编制",
                     workitemUrl: "http:/plmdev.unidoyun.com/Windchill/app/#ptc1/tcomp/infoPage?oid=OR:wt.part.WTPart:401108333&u8=1",
                     themeName: "部件 - t000001548,图样名称，A1",
                     objectUrl: "http:/plmdev.unidoyun.com/Windchill/app/#ptc1/tcomp/infoPage?oid=OR:wt.part.WTPart:401108333&u8=1",
                     objectState: "正在工作",
                     objectContainer: "XXX产品部",
                     objectTime: "2018/5/31 13：34",
                     role: "工作负责人"
                 }*/
            ];
            $scope.params = {
                username: "",
                checkAccess: true
            };

            function getUser() {
                userService.getUserInformation().then(function (result) {
                    if (result) {
                        $scope.params.username = result.data.name;
                        queryList()
                    }
                });
            }

            function queryList() {
                windchillService.getToDotasks($scope.params).then(function (result) {
                    $scope.tableBody = JSON.parse(result.data).data;
                })
            }

            (function init() {
                getUser();
            })();
        }]);
    return toDoTasksModule;
});