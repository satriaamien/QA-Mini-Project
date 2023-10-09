const Page = require("./Page");

class HomePage extends Page {
  // initialization
  constructor(driver) {
    super(driver);
  }

  // element locators
  get item() {
    return this.driver.$("id=search");
  }
  get searchInput() {
    return this.driver.$("id=search_src_text");
  }
  get enterKeys() {
    return this.driver.keys("\uE007");
  }

  // page actions
  async clickSearch() {
    await this.item.click();
  }
  async fillSearchInput(value) {
    await this.searchInput.setValue(value);
  }
  async enter() {
    await this.enterKeys;
  }
}
module.exports = HomePage;
