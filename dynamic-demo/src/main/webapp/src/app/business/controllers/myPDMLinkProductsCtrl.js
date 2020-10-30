define([
    "language"
], function (i18n) {
    "use strict";
    var myPDMLinkProductsModule = angular.module('windchillApp');
    myPDMLinkProductsModule.register.controller('myPDMLinkProductsCtrl', ['$scope', 'userService', 'windchillService',
        function ($scope, userService, windchillService) {
            $scope.header = {
                label: i18n.my_pdm_link_products_label
            };
            $scope.tableHead = {
                container: i18n.table_head_name,
                creator: i18n.table_head_create_people,
                createtime: i18n.table_head_create_time
            };
            $scope.tableBody = [
                /* {
                     container: 'xxx产品库',
                     containerUrl: 'http:/plmdev.unidoyun.com/Windchill/app/#ptc1/tcomp/infoPage?oid=OR:wt.pdmlink.PDMLinkProduct:142887090&u8=1',
                     creator: '张三',
                     createtime: "2010/05/30 16:08 CST"
                 },
                 {
                     container: 'xxx零件库',
                     containerUrl: 'http:/plmdev.unidoyun.com/Windchill/app/#ptc1/tcomp/infoPage?oid=OR:wt.pdmlink.PDMLinkProduct:142887090&u8=1',
                     creator: 'wcadmin',
                     createtime: "2010/05/30 16:08 CST"
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
                windchillService.getMyPDMLinkProducts($scope.params).then(function (result) {
                    $scope.tableBody = JSON.parse(result.data).data;
                })
            }

            (function init() {
                getUser();
            })()
        }]);
    return myPDMLinkProductsModule;
});