import Rule = require("./rule");

module Siena {
    export class Dispatcher {
        private stash: Array<Route> = [];
    
        constructor(private location: Location) { }
    
        addRoute(rule: string, controllerName: typeof Controller): Dispatcher {
            this.stash.push({rule: new Rule(rule), controllerName: controllerName});
            return this;
        }
    
        dispatch(location: Location = null): void {
            location = (location == null) ? this.location : location;
            for (var i = 0, len = this.stash.length; i < len; i++) {
                var rule = this.stash[i].rule;
                var controller = this.stash[i].controllerName;
                if (rule.test(location.pathname)) {
                    new controller().run(rule.capture);
                    return;
                }
            }
        }
    }

    export class Controller {
        run(params: { [key: string]: string }): void { }
    }

    export interface Location {
        pathname: string;
    }

    interface Route {
        rule: Rule;
        controllerName: typeof Controller;
    }
}

export = Siena;
