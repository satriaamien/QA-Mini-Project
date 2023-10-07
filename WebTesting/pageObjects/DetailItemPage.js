const { By, Key, until } = require("selenium-webdriver");
const Page = require("./Page");

class DetailItemPage extends Page {
  //! initialization
  constructor(driver) {
    super(driver);
  }

  //! element locators
  detailItem = By.css(".item_detail_information.clearfix");
  plus = By.css("span[data-action='sum']");
  minus = By.css("#minus");
  love = By.css(".addShoppingList");
  addToCart = By.css(".addToCart");
  goToCart = By.css(".goToCart");
  textItemProduct = By.css("#productSelected .itemInfo");
  textCount = By.css(".itemCounter #count_10521943");
  textLove = By.css(
    ".container.headerMenuProducts .iconFavourite-lg.cart.full #numItems"
  );
  textCart = By.css("#iconShoppingDesktop");

  //! page action
  async scroll() {
    const js_code = "arguments[0].scrollIntoView();";
    const wraplist = await this.driver.findElement(this.detailItem);
    await this.driver.executeScript(js_code, wraplist);
  }
  async clickPlus() {
    await this.driver.findElement(this.plus).click();
  }
  async clickMinus() {
    await this.driver.findElement(this.minus).click();
  }
  async clickLove() {
    await this.driver.findElement(this.love).click();
  }
  async clickAddToCart() {
    await this.driver.findElement(this.addToCart).click();
  }
  async clickNextCart() {
    const btnAddCart = this.driver.findElement(this.goToCart);
    await this.driver.wait(until.elementIsVisible(btnAddCart), 6000);
    await btnAddCart.click();
  }

  async getTextItemProduct() {
    return await this.driver.findElement(this.textItemProduct).getText();
  }
  async getTextCount() {
    return await this.driver.findElement(this.textCount).getText();
  }
  async getTextLove() {
    return await this.driver.findElement(this.textLove).getText();
  }
  async getTextCart() {
    return await this.driver.findElement(this.textCart).getText();
  }
}

module.exports = DetailItemPage;
