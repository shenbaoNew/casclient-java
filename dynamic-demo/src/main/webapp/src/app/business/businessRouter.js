define([
    "language"
], function (i18n) {
    'use strict';
    var businessRouter = angular.module('windchillApp', ['ui.router', 'pascalprecht.translate']);
    businessRouter.config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state("recentlyVisited", {
                    url: '/recentlyVisited',
                    templateUrl: 'src/app/business/views/recentlyVisited.html',
                    controller: 'recentlyVisitedCtrl',
                    resolve: {
                        loadCtrl: ['$q',
                            function ($q) {
                                var deferred = $q.defer();
                                require([
                                    "src/app/business/controllers/recentlyVisitedCtrl.js",
                                    "app/business/services/userService",
                                    "app/business/services/windchillService"
                                ], function () {
                                    deferred.resolve();
                                });
                                return deferred.promise;
                            }]
                    }
                })
                .state("myPDMLinkProducts", {
                    url: '/myPDMLinkProducts',
                    templateUrl: 'src/app/business/views/myPDMLinkProducts.html',
                    controller: 'myPDMLinkProductsCtrl',
                    resolve: {
                        loadCtrl: ['$q',
                            function ($q) {
                                var deferred = $q.defer();
                                require([
                                    "src/app/business/controllers/myPDMLinkProductsCtrl.js",
                                    "app/business/services/userService",
                                    "app/business/services/windchillService"
                                ], function () {
                                    deferred.resolve();
                                });
                                return deferred.promise;
                            }]
                    }
                })
                .state("myWTObjects", {
                    url: '/myWTObjects',
                    templateUrl: 'src/app/business/views/myWTObjects.html',
                    controller: 'myWTObjectsCtrl',
                    resolve: {
                        loadCtrl: ['$q',
                            function ($q) {
                                var deferred = $q.defer();
                                require([
                                    "src/app/business/controllers/myWTObjectsCtrl.js",
                                    "app/business/services/userService",
                                    "app/business/services/windchillService"
                                ], function () {
                                    deferred.resolve();
                                });
                                return deferred.promise;
                            }]
                    }
                })
                .state("myCheckOut", {
                    url: '/myCheckOut',
                    templateUrl: 'src/app/business/views/myCheckOut.html',
                    controller: 'myCheckOutCtrl',
                    resolve: {
                        loadCtrl: ['$q',
                            function ($q) {
                                var deferred = $q.defer();
                                require([
                                    "src/app/business/controllers/myCheckOutCtrl.js",
                                    "app/business/services/userService",
                                    "app/business/services/windchillService"
                                ], function () {
                                    deferred.resolve();
                                });
                                return deferred.promise;
                            }]
                    }
                })
                .state("toDoTasks", {
                    url: '/toDoTasks',
                    templateUrl: 'src/app/business/views/toDoTasks.html',
                    controller: 'toDoTasksCtrl',
                    resolve: {
                        loadCtrl: ['$q',
                            function ($q) {
                                var deferred = $q.defer();
                                require([
                                    "src/app/business/controllers/toDoTasksCtrl.js",
                                    "app/business/services/userService",
                                    "app/business/services/windchillService"
                                ], function () {
                                    deferred.resolve();
                                });
                                return deferred.promise;
                            }]
                    }
                })
                .state("historicalTasks", {
                    url: '/historicalTasks',
                    templateUrl: 'src/app/business/views/historicalTasks.html',
                    controller: 'historicalTasksCtrl',
                    resolve: {
                        loadCtrl: ['$q',
                            function ($q) {
                                var deferred = $q.defer();
                                require([
                                    "src/app/business/controllers/historicalTasksCtrl.js",
                                    "app/business/services/userService",
                                    "app/business/services/windchillService"
                                ], function () {
                                    deferred.resolve();
                                });
                                return deferred.promise;
                            }]
                    }
                })
                .state("myUpdates", {
                    url: '/myUpdates',
                    templateUrl: 'src/app/business/views/myUpdates.html',
                    controller: 'myUpdatesCtrl',
                    resolve: {
                        loadCtrl: ['$q',
                            function ($q) {
                                var deferred = $q.defer();
                                require([
                                    "src/app/business/controllers/myUpdatesCtrl.js",
                                    "app/business/services/userService",
                                    "app/business/services/windchillService"
                                ], function () {
                                    deferred.resolve();
                                });
                                return deferred.promise;
                            }]
                    }
                });
            $urlRouterProvider.otherwise('/recentlyVisited');
            window.isdev = true;
        }]);
    businessRouter.config(function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
        businessRouter.register = {
            //得到$controllerProvider的引用
            controller: $controllerProvider.register,
            //同样的，这里也可以保存directive／filter／service的引用
            directive: $compileProvider.directive,
            filter: $compileProvider.register,
            service: $provide.service
        };
    });
    businessRouter.config(['$translateProvider', function ($translateProvider) {
        $translateProvider.translations('en-us', i18n);
        $translateProvider.translations('zh-cn', i18n);
        $translateProvider.preferredLanguage(window.urlParams.lang);
    }]);
    return businessRouter;
});
