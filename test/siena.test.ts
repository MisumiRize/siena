/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../src/siena.ts" />

import chai = require("chai");
var expect = chai.expect;
import Siena = require("../src/siena");

describe("Siena.Controller", () => {
    it("has run method", () => {
        var c = new Siena.Controller();
        expect(c.run).to.be.an.instanceof(Function);
    });
});

export class TestController extends Siena.Controller {
    static dispatched: Function;

    run() {
        TestController.dispatched();
    }
}

describe("Siena.Dispatcher", () => {
    it("dispatches based on the route", (done) => {
        TestController.dispatched = done;
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
});
