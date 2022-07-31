import supertest from "supertest";
import { expect } from "chai";
const request = supertest("https://gorest.co.in/public-api/");
const token =
  "c343ba69c0481be59613acab0223d799c323acef6ad00c495e7e77a3862c45a5";

describe("Users", () => {
  it("GET /users", () => {
    return request.get(`users?access-token=${token}`).then((res) => {
      expect(res.body.data).to.not.be.empty;
    });
  });

  it("GET /users/:id", () => {
    return request.get(`users/3424?access-token=${token}`).then((res) => {
      expect(res.body.data.id).to.be.equal(3424);
    });
  });

  it("GET /users with query params", () => {
    const url = `users?access-token=${token}&gender=female&status=active`;

    return request.get(url).then((res) => {
      expect(res.body.data).to.not.be.empty;
      res.body.data.forEach((data) => {
        expect(data.gender).to.be.equal("female");
        expect(data.status).to.be.equal("active");
      });
    });
  });
});
