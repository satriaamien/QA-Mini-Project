const { By, Key } = require("selenium-webdriver");
const Page = require("./Page");

class DashboardPage extends Page {
  //! initialization
  constructor(driver) {
    super(driver);
  }

  //! element locators
  headerSearchBar = By.css("#header_searcher_desktop_input");
  dashboard = By.css("#business_homePage");
  //! page action
  async endpointPage() {
    await this.openUrl("/");
  }
  async clickDashboard() {
    await this.driver.findElement(this.dashboard).click();
  }
  async searchBar(name) {
    await this.driver.findElement(this.headerSearchBar).sendKeys("pisau kupas");
  }
  async clickEnter() {
    await this.driver.findElement(this.headerSearchBar).sendKeys(Key.ENTER);
  }
}

module.exports = DashboardPage;
