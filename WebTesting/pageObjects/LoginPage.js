const { By } = require("selenium-webdriver");
const Page = require("./Page");

class LoginPage extends Page {
  //! initialization
  constructor(driver) {
    super(driver);
  }

  //! element locators
  logoLogin = By.css(".iconUser-lg.auto_menu_ac.cart");
  username = By.css("#loginForm_email_family");
  password = By.css("#loginForm_password_family");
  masuk = By.css("#formLoginFamily #btnSendLoginFamily");

  textWelcome = By.css(".container.mb-5.welcome-message");

  //! page action
  async clickLogoLogin() {
    await this.driver.findElement(this.logoLogin).click();
  }
  async fillUsername(username) {
    await this.driver.findElement(this.username).sendKeys(username);
  }
  async fillPassword(password) {
    await this.driver.findElement(this.password).sendKeys(password);
  }
  async clickMasuk() {
    await this.driver.findElement(this.masuk).click();
  }
  async getWelcome() {
    return await this.driver.findElement(this.textWelcome).getText();
  }
}

module.exports = LoginPage;
