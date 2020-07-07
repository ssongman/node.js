var assert = require("assert"); //nodejs  assert module

describe("Array test", function() {
    describe("indexOf() method", function() {
        it("if not contain value then return -1", function() {
            assert.equal(0, [1,2,3].indexOf(1));
        });
    });
});
    