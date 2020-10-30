define([
    "language"
], function (i18n) {
    "use strict";
    var historicalTasksModule = angular.module('windchillApp');
    historicalTasksModule.register.controller('historicalTasksCtrl', ['$scope', 'userService', 'windchillService',
        function ($scope, userService, windchillService) {
            $scope.header = {
                label: i18n.history_cal_tasks_label
            };
            $scope.title_tips = i18n.table_head_file_storage_catalog;
            $scope.pageA=i18n.search_page_all
            $scope.tableHead = {
                workitemName: i18n.table_head_name,
                themeName: i18n.table_head_theme_name,
                objectState: i18n.table_head_state,
                objectContainer: i18n.table_head_container,
                objectTime: i18n.table_head_create_time,
                role: i18n.table_head_role
            };
            $scope.allPage = 1;
            $scope.indexpage = 1;
            $scope.tableBody = [
                /*  {
                      workitemName: "编制",
                      workitemUrl: "http:/plmdev.unidoyun.com/Windchill/app/#ptc1/tcomp/infoPage?oid=OR:wt.part.WTPart:401108333&u8=1",
                      themeName: "部件 - t000001548,图样名称，A1",
                      objectUrl: "http:/plmdev.unidoyun.com/Windchill/app/#ptc1/tcomp/infoPage?oid=OR:wt.part.WTPart:401108333&u8=1",
                      objectState: "正在工作",
                      objectContainer: "XXX产品部",
                      objectTime: "2018/5/31 13：34",
                      role: "工作负责人"
                  }, {
                      workitemName: "编制",
                      workitemUrl: "http:/plmdev.unidoyun.com/Windchill/app/#ptc1/tcomp/infoPage?oid=OR:wt.part.WTPart:401108333&u8=1",
                      themeName: "部件 - t000001548,图样名称，A1",
                      objectUrl: "http:/plmdev.unidoyun.com/Windchill/app/#ptc1/tcomp/infoPage?oid=OR:wt.part.WTPart:401108333&u8=1",
                      objectState: "正在工作",
                      objectContainer: "XXX产品部",
                      objectTime: "2018/5/31 13：34",
                      role: "工作负责人"
                  }, {
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
                checkAccess: true,
                indexpage: $scope.indexpage
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
                windchillService.getHistoricalTasks($scope.params).then(function (result) {
                    if (result && result.data) {
                        $scope.tableBody = JSON.parse(result.data).data;
                        $scope.allPage = JSON.parse(result.data).data[0].totalPages;
                    }
                })
            }

            $scope.pageIndex = function (val) {
                /*if (!$scope.params.username) {
                    return
                }*/
                if (val === "pre" && $scope.indexpage > 1) {
                    $scope.indexpage--;
                    queryList();
                } else if (val === "next") {
                    $scope.indexpage++;
                    queryList();
                }
            };
            (function init() {
                getUser();
            })();
        }]);
    return historicalTasksModule;
});