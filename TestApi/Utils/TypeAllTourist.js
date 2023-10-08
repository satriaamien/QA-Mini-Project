const schemabody = {
  type: "array",
  items: {
    type: "object",
    properties: {
      id: { type: "number" },
      tourist_name: { type: "string" },
      tourist_email: { type: "string" },
      tourist_location: { type: "string" },
    },
  },
};

module.exports = schemabody;
