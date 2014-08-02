/// <reference path="../typings/tsd.d.ts" />

import Chai = require("chai");
var expect = Chai.expect;
import Rule = require("../src/rule");

describe("Rule", () => {
    it("can be initialized with rule string", () => {
        expect(new Rule("/foo")).not.to.be.null;
    });

    it("can be initialized with rule RegExp", () => {
        expect(new Rule(/\/foo/)).not.to.be.null;
    });

    describe("compile()", () => {
        it("returns compiled RegExp", () => {
            expect(new Rule("/foo").compile().toString()).to.be.equal("/^/foo/");
        });

        it("compiled escaped RegExp pattern", () => {
            expect(new Rule("/foo").compile().test("/foo")).to.be.ok;
        });

        it("replaces placeholder", () => {
            var r = new Rule("/foo/:id/bar");
            expect(r.compile().toString()).to.be.equal("/^/foo/([^/]+)/bar/");
            expect((<any>r).register[0]).to.be.equal("id");
        });

        it("replaces multiple placeholders", () => {
            var r = new Rule("/foo/:id/:action");
            expect(r.compile().toString()).to.be.equal("/^/foo/([^/]+)/([^/]+)/");
            expect((<any>r).register[0]).to.be.equal("id");
            expect((<any>r).register[1]).to.be.equal("action");
        });

        it("calls compiling once", () => {
            var r = new Rule("/foo/:id/:action");
            r.compile();
            expect(r.compile().toString()).to.be.equal("/^/foo/([^/]+)/([^/]+)/");
            expect((<any>r).register.length).to.be.equal(2);
        });
    });

    describe("test()", () => {
        it("tests the RegExp pattern", () => {
            expect(new Rule("/foo").test("/foo")).to.be.ok;
            expect(new Rule("/foo").test("/bar")).not.to.be.ok;
        });

        it("tests with the placeholder and stores the captures", () => {
            var r = new Rule("/foo/:id/bar");
            expect(r.test("/foo/123/bar")).to.be.ok;
            expect(r.capture["id"]).to.be.equal("123");
        });

        it("captures with multiple placeholder", () => {
            var r = new Rule("/foo/:id/:action");
            expect(r.test("/foo/123/bar")).to.be.ok;
            expect(r.capture["id"]).to.be.equal("123");
            expect(r.capture["action"]).to.be.equal("bar");
        });
    });
});
