const request = require("supertest");
const mongoose = require('mongoose');
const app = require("../app");

afterAll(() => mongoose.disconnect());

describe("Test the root path", () => {
    test("It should response the GET method", async done => {

        await request(app)
            .get("/")
            .then(response => {
                expect(response.body).toBeTruthy();
                done();
            });
    });

});