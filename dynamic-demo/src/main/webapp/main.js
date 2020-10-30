'use strict';
var languageKey = "i18Language";
var languageToken = getDefaultLanguage();
if (!window.urlParams) {
    window.urlParams = {};
}
window.urlParams.lang = languageToken;

function getDefaultLanguage() {
    var locale = getLanguageFromUrl() || getLanguageFromCookie();
    if (!locale) {
        if (navigator.appName === 'Netscape') {
            locale = navigator.language;
        } else {
            locale = navigator.browserLanguage;
        }
    }
    if (locale === 'zh-CN' || locale === 'zh-cn') {
        document.cookie = languageKey + '=' + encodeURIComponent('zh-CN');
        return 'zh-cn';
    }
    document.cookie = languageKey + '=' + encodeURIComponent('en-US');
    return 'en-us';
}

function getLanguageFromUrl() {
    var key = "locale";
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    var language = "";
    if (r !== null) {
        language = r[2];
    }
    reg = null;
    r = null;
    return language == null || language == "" || language == "undefined" ? "" : language
}

function getLanguageFromCookie() {
    if (!document.cookie) {
        document.cookie = '';
    }
    var cookies = document.cookie.split(';');
    var cookie;
    for (var i = 0, cookieLen = cookies.length; i < cookieLen; i++) {
        cookie = cookies[i].trim().split('=');
        if (!cookie || (cookie.length < 2)) {
            continue;
        }
        if (languageKey === cookie[0]) {
            return decodeURIComponent(cookie[1]);
        }
    }
    return undefined;
}

require.config({
    "baseUrl": "./",
    "paths": {
        angular: "lib/angular/angular",
        jquery: "lib/jquery-3.3.1.min",
        uiRouter: "lib/angular-ui/angular-ui-router",
        translate: "lib/angular/angular-translate",
        bootstrap: "lib/bootstrap-3.3.7-dist/js/bootstrap.min",
        app: "src/app",
        language: "i18n/default/" + languageToken
    },
    waitSeconds: 7,  //出现网络慢加载文件慢的时候  设置最长等待时间7s
    shim: {  //这里shim等于快速定义一个模块，定义模块需要的依赖
        'angular': {
            exports: 'angular'
        },
        uiRouter: {
            deps: ['angular']   //依赖什么模块
        },
        translate: {
            deps: ['angular']
        },
        bootstrap: {
            deps: ['jquery']
        }
    }
});
require(["jquery", "angular", "uiRouter", "translate"], function () {
    require(["app/business/businessRouter"], function (app) {
        angular.bootstrap($("html"), [app.name]);
    });
});