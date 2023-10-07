const { Builder, Browser } = require("selenium-webdriver");

const setupDriver = async () => {
  const driver = await new Builder().forBrowser(Browser.CHROME).build();
  return driver;
};

module.exports = setupDriver;
