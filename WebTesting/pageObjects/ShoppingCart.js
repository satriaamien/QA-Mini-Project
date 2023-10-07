const { By, Key } = require("selenium-webdriver");
const Page = require("./Page");

class ShoppingCart extends Page {
  //! initialization
  constructor(driver) {
    super(driver);
  }

  //! element locators
  codePostal = By.css("#search_zone_search-locality-process-order_typeahead");
  listPostal = By.css(".typeahead__list .typeahead__item a");
  pickup = By.css(".card__wrap.col-md-4.card__wrap:nth-child(2)");
  collect = By.css(
    ".process-order-option-card-component-container:nth-child(1)"
  );
  btnLokasi = By.css("#c_and_c_modal-button");
  btnBayar = By.css(".stickyCheckoutBottom #checkout-button");
  scrollCo = By.css(".btn-pay");
  hargaCO = By.css(".col-lg-7.mt-4.separation .col-6.text-right");

  //! page action
  async scroll() {
    const js_code = "arguments[0].scrollIntoView();";
    const wraplist = await this.driver.findElement(this.codePostal);
    await this.driver.executeScript(js_code, wraplist);
  }
  async fillPostalCode(postalCode) {
    // await this.driver.findElement(By.name("one")), Keys.CONTROL)
    const postal = await this.driver.findElement(this.codePostal);
    await postal.sendKeys(Key.CONTROL + "A");
    await postal.sendKeys(postalCode);
  }
  async clickListPostal() {
    await this.driver.findElement(this.listPostal).click();
  }
  async clickPickup() {
    await this.driver.findElement(this.pickup).click();
  }
  async clickCollect() {
    // const btnCollect = this.driver.findElement(this.collect);
    // await this.driver.wait(until.elementIsVisible(btnCollect), 6000);
    // await btnCollect.click();
    await this.driver.findElement(this.collect).click();
  }
  async clickBtnLokasi() {
    await this.driver.findElement(this.btnLokasi).click();
  }
  async clickBtnBayar() {
    await this.driver.findElement(this.btnBayar).click();
  }
  async scrollCheckout() {
    const js_code = "arguments[0].scrollIntoView();";
    const wraplist = await this.driver.findElement(this.scrollCo);
    await this.driver.executeScript(js_code, wraplist);
  }
  async getTextpriceCo() {
    return await this.driver.findElement(this.hargaCO).getText();
  }
}

module.exports = ShoppingCart;
