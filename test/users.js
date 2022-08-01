import supertest from "supertest";
import { expect } from "chai";
const request = supertest("https://gorest.co.in/public-api/");
const token =
  "c343ba69c0481be59613acab0223d799c323acef6ad00c495e7e77a3862c45a5";

describe("Users", () => {
  let userId;

  describe("POST", () => {
    it("/users", () => {
      const data = {
        email: `testname${Math.floor(Math.random() * 1000)}@gmail.com`,
        name: "testname",
        gender: "male",
        status: "active",
      };

      return request
        .post("users")
        .set("Authorization", `Bearer ${token}`)
        .send(data)
        .then((res) => {
          expect(res.body.data).to.deep.include(data);
          userId = res.body.data.id;
          console.log(userId);
        });
    });
  });

  describe("GET", () => {
    it("/users", () => {
      return request.get(`users?access-token=${token}`).then((res) => {
        expect(res.body.data).to.not.be.empty;
      });
    });

    it("/users/:id", () => {
      return request
        .get(`users/${userId}?access-token=${token}`)
        .then((res) => {
          expect(res.body.data.id).to.be.equal(userId);
        });
    });

    it("/users with query params", () => {
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

  describe("PUT", () => {
    it("/users/:id", () => {
      const data = {
        name: `Tyron - ${Math.floor(Math.random() * 1000)}`,
        gender: "male",
        status: "active",
      };

      return request
        .put(`users/${userId}`)
        .set("Authorization", `Bearer ${token}`)
        .send(data)
        .then((res) => {
          expect(res.body.data).to.deep.include(data);
        });
    });
  });

  describe("DELETE", () => {
    it("/users/:id", () => {
      return request
        .delete(`users/${userId}`)
        .set("Authorization", `Bearer ${token}`)
        .then((res) => {
          expect(res.body.data).to.be.equal(null);
        });
    });
  });
});
