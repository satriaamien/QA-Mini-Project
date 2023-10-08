const requestLocal = require("supertest")("http://localhost:3000");

const chai = require("chai");
const chaiJsonSchema = require("chai-json-schema-ajv");
const schemaDataTourists = require("./Utils/TypeAllTourist");
const schemaSingleDataTourist = require("./Utils/TypeSingleTourist");
const createPayload = require("./Payloads/createPayloads");
const updateAllPayload = require("./Payloads/updateAllPayload");
const oneUpdatePayload = require("./Payloads/oneUpdatePayload");

chai.use(chaiJsonSchema);
const expect = chai.expect;

// start json with json-server --watch db.json

describe("Api Testing Daftar Tourist", () => {
  it("mendapatkan semua data tourist dan divalidasi ke skema JSON", async () => {
    const res = await requestLocal.get("/data");
    expect(res.body).jsonSchema(schemaDataTourists);
  });
  it("membuat data tourist dan divalidasi oleh skema serta memastikan data yang terupload benar", async () => {
    const res = await requestLocal.post("/data").send(createPayload);
    expect(res.body).to.be.jsonSchema(schemaSingleDataTourist);
    expect(res.body).include(createPayload);
  });

  it("memilih satu data tourist (jsonLocal) dan divalidasi responnya", async () => {
    const res = await requestLocal.get("/data/273786");
    expect(res.status).equal(200);
    expect(res.body).jsonSchema(schemaSingleDataTourist);
  });

  it("update semua data tourist divalidasi ke skema JSON dan dipastikan payload telah masuk ke database", async () => {
    const res = await requestLocal.put("/data/273786").send(updateAllPayload);
    expect(res.body).jsonSchema(schemaSingleDataTourist);
    expect(res.body).include(updateAllPayload);
  });
  it("update satu data(tourist_location) tourist divalidasi ke skema JSON dan dipastikan payload telah masuk ke database", async () => {
    const res = await requestLocal.patch("/data/273786").send(oneUpdatePayload);
    expect(res.body).jsonSchema(schemaSingleDataTourist);
    expect(res.body).include(oneUpdatePayload);
  });
  it("delete data tourist dan divalidasi telah terhapus", async () => {
    const res = await requestLocal.delete("/data/273786");
    expect(res.status).equal(200);
  });
});
