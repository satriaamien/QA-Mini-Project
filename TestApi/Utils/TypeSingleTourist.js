const singleTourist = {
  type: "object",
  properties: {
    id: { type: "number" },
    tourist_name: { type: "string" },
    tourist_email: { type: "string" },
    location: { type: "string" },
    createdat: { type: "string" },
  },
};
module.exports = singleTourist;
