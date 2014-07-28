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
                    new controller().run();
                    return;
                }
            }
        }
    }

    export class Controller {
        run(): void { }
    }

    export interface Location {
        pathname: string;
    }

    class Rule {
        constructor(private rule: string) { }

        test(path: string): boolean {
            return new RegExp("^" + this.rule).test(path);
        }
    }

    interface Route {
        rule: Rule;
        controllerName: typeof Controller;
    }
}

export = Siena;
