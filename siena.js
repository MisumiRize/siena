!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Siena=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Siena;
(function (Siena) {
    var Dispatcher = (function () {
        function Dispatcher(location) {
            this.location = location;
            this.stash = [];
        }
        Dispatcher.prototype.addRoute = function (rule, controllerName) {
            this.stash.push({ rule: new Rule(rule), controllerName: controllerName });
            return this;
        };

        Dispatcher.prototype.dispatch = function (location) {
            if (typeof location === "undefined") { location = null; }
            location = (location == null) ? this.location : location;
            for (var i = 0, len = this.stash.length; i < len; i++) {
                var rule = this.stash[i].rule;
                var controller = this.stash[i].controllerName;
                if (rule.test(location.pathname)) {
                    new controller().run();
                    return;
                }
            }
        };
        return Dispatcher;
    })();
    Siena.Dispatcher = Dispatcher;

    var Controller = (function () {
        function Controller() {
        }
        Controller.prototype.run = function () {
        };
        return Controller;
    })();
    Siena.Controller = Controller;

    var Rule = (function () {
        function Rule(rule) {
            this.rule = rule;
        }
        Rule.prototype.test = function (path) {
            return new RegExp("^" + this.rule).test(path);
        };
        return Rule;
    })();
})(Siena || (Siena = {}));

module.exports = Siena;

},{}]},{},[1])(1)
});