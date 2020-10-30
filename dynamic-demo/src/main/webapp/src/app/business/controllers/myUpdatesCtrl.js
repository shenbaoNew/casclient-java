define([
    "language"
], function (i18n) {
    "use strict";
    var myUpdatesModule = angular.module('windchillApp');
    myUpdatesModule.register.controller('myUpdatesCtrl', ['$scope', 'userService', 'windchillService',
        function ($scope, userService, windchillService) {
            $scope.header = {
                label: i18n.my_updates_lable
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
                /*  {
                      number:"8BK498463513",
                      name:"XXX部件",
                      objUrl:"http:/plmdev.unidoyun.com/Windchill/app/#ptc1/tcomp/infoPage?oid=OR:wt.pdmlink.PDMLinkProduct:142887090&u8=1",
                      modifytime:"2801/08/14 10:55",
                      container:"XXX产品库",
                      state:"已发布",
                      version:"A.1"
                  },{
                      number:"8BK498463513",
                      name:"XXX部件",
                      objUrl:"http:/plmdev.unidoyun.com/Windchill/app/#ptc1/tcomp/infoPage?oid=OR:wt.pdmlink.PDMLinkProduct:142887090&u8=1",
                      modifytime:"2801/08/14 10:55",
                      container:"XXX产品库",
                      state:"已发布",
                      version:"A.1"
                  },{
                      number:"8BK498463513",
                      name:"XXX部件",
                      objUrl:"http:/plmdev.unidoyun.com/Windchill/app/#ptc1/tcomp/infoPage?oid=OR:wt.pdmlink.PDMLinkProduct:142887090&u8=1",
                      modifytime:"2801/08/14 10:55",
                      container:"XXX产品库",
                      state:"已发布",
                      version:"A.1"
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
                windchillService.getMyUpDates($scope.params).then(function (result) {
                    $scope.tableBody = JSON.parse(result.data).data;
                })
            }

            (function init() {
                getUser();
            })();
        }]);
    return myUpdatesModule;
});