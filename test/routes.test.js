const assert = require("assert");
const expect = require("chai").expect;
const request = require("supertest");
const app = require("../app");

describe("Unit testing the /* route", function() {
  it("should return OK status", function() {
    return request(app)
      .get("/*")
      .then(function(response) {
        assert.equal(response.status, 404);
      });
  });

  it("should return message on rendering", function() {
    return request(app)
      .get("/*")
      .then(function(response) {
        expect(response.text).to.contain(
          "The page you are looking for does not exist. Please, navigate back to the home page."
        );
      });
  });
});
