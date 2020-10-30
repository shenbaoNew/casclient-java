define([
    "language"
], function (i18n) {
    "use strict";
    var myCheckOutModule = angular.module('windchillApp');
    myCheckOutModule.register.controller('myCheckOutCtrl', ['$scope', 'userService', 'windchillService',
        function ($scope, userService, windchillService) {
            $scope.header = {
                label: i18n.my_checkout_label
            };
            $scope.title_tips = i18n.table_head_file_storage_catalog;
            $scope.tableHead = {
                number: i18n.table_head_number,
                name: i18n.table_head_name,
                modifytime: i18n.table_head_edit_time,
                container: i18n.table_head_container,
                state: i18n.table_head_state,
                version: i18n.table_head_version
            };

            $scope.tableBody = [
                /*     {
                        number: "8BK1531354135",
                        name: "XXX部件",
                        objUrl: "http:/plmdev.unidoyun.com/Windchill/app/#ptc1/tcomp/infoPage?oid=OR:wt.pdmlink.PDMLinkProduct:142887090&u8=1",
                        modifytime: "2808/08/13 12:13",
                        container: "XXX产品库",
                        state: "已发布",
                        version: "A1"
                    },
                    {
                        number: "8BK1531354135",
                        name: "XXX部件",
                        objUrl: "http:/plmdev.unidoyun.com/Windchill/app/#ptc1/tcomp/infoPage?oid=OR:wt.pdmlink.PDMLinkProduct:142887090&u8=1",
                        modifytime: "2808/08/13 12:03",
                        container: "XXX产品库",
                        state: "已发布",
                        version: "A1"
                    },
                    {
                        number: "8BK1531354135",
                        name: "XXX部件",
                        objUrl: "http:/plmdev.unidoyun.com/Windchill/app/#ptc1/tcomp/infoPage?oid=OR:wt.pdmlink.PDMLinkProduct:142887090&u8=1",
                        modifytime: "2808/08/13 12:03",
                        container: "XXX产品库",
                        state: "已发布",
                        version: "A1"
                    }*/
            ];
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
                windchillService.getMyCheckOut($scope.params).then(function (result) {
                    $scope.tableBody = JSON.parse(result.data).data;
                })
            }

            (function init() {
                getUser();
            })();
        }]);
    return myCheckOutModule;
});