/**
 * Created by kaspe on 2017-01-06.
 */

var expect = require("chai").expect;
var request = require("request");

describe("Test af REST getAllUsers", function ()
{
    let expectedBody =
        [
            {
                "_id": "586fc0d41dd98127ac4cfe7b",
                "name": "navnA",
                "username": "navnB",
                "password": "bubber",
                "__v": 0
            },
            {
                "_id": "586fc0d41dd98127ac4cfe7c",
                "name": "navnC",
                "username": "navnD",
                "password": "bubber",
                "__v": 0
            }
        ];

    describe("test af res code", function ()
    {

        var url = "http://localhost:3000/api/allusers";

        it("returns status 200", function (done)
        {
            request(url, function (error, response, body)
            {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it("test af body", function (done)
        {
            request(url, function (error, response, body)
            {
                expect(body).to.equal(JSON.stringify(expectedBody));
                done();
            });
        });

    });
});