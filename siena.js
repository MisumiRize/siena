define(["require", "exports"], function(require, exports) {
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

    
    return Siena;
});
