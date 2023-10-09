const { remote } = require("webdriverio");
const driverOptions = require("../config/driverOptions");

const setupDriver = async () => {
  const driver = await remote(driverOptions);
  return driver;
};

module.exports = setupDriver;
