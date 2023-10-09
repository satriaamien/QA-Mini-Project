const { remote } = require("webdriverio");
class Page {
  constructor(driver) {
    /** @type {WebdriverIO.Browser} */
    this.driver = driver;
  }
}

module.exports = Page;
