/// <reference path="../typings/tsd.d.ts" />

import Chai = require("chai");
var expect = Chai.expect;
import Rule = require("../src/rule");

describe("Rule", () => {
    it("can be initialized with rule string", () => {
        expect(new Rule("/foo")).not.to.be.null;
    });
});
