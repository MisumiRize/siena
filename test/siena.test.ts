/// <reference path="../typings/tsd.d.ts" />

import Chai = require("chai");
var expect = Chai.expect;
import Siena = require("../src/siena");

describe("Siena.Controller", () => {
    it("has run method", () => {
        var c = new Siena.Controller();
        expect(c.run).to.be.an.instanceof(Function);
    });
});

export class TestController extends Siena.Controller {
    static dispatched: Function;

    run(param) {
        TestController.dispatched(param);
    }
}

describe("Siena.Dispatcher", () => {
    describe("disparch()", () => {
        it("dispatches based on the route", (done) => {
            TestController.dispatched = () => {
                done();
            };
            new Siena.Dispatcher({pathname: "/foo"})
                .addRoute("/foo", TestController)
                .dispatch();
        });
    
        it("does not dispatch to wrong controller", () => {
            TestController.dispatched = () => {
                throw new Error();
            };
            new Siena.Dispatcher({pathname: "/foo"})
                .addRoute("/bar", TestController)
                .dispatch();
        });
    
        it("prioritize firstly added route", () => {
            TestController.dispatched = () => {
                throw new Error();
            };
            new Siena.Dispatcher({pathname: "/foo"})
                .addRoute("/foo", Siena.Controller)
                .addRoute("/foo", TestController)
                .dispatch();
        });

        it("does not dispatch location with no parameter to the route with placeholder", () => {
            TestController.dispatched = () => {
                throw new Error();
            };
            new Siena.Dispatcher({pathname: "/foo"})
                .addRoute("/foo/:id", TestController)
                .dispatch();
        });
    
        it("dispatches the route with placeholder", (done) => {
            TestController.dispatched = (param) => {
                if (param["id"] == "123") {
                    done();
                }
            };
            new Siena.Dispatcher({pathname: "/foo/123"})
                .addRoute("/foo/:id", TestController)
                .dispatch();
        });
    });
});
