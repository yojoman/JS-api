import supertest from "supertest";
import {expect} from "chai";
const request = supertest("https://gorest.co.in/public-api/");
const token =
  "c343ba69c0481be59613acab0223d799c323acef6ad00c495e7e77a3862c45a5";

describe("Users", () => {
  it("GET /Users", (done) => {
    request.get(`users?access-token=${token}`).end((err, res) => {
      expect(res.body.data).to.not.be.empty;
      done();
      // console.log(err);
      // console.log(res.body.data);
    });
  });
});
