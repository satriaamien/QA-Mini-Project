const { By, until } = require("selenium-webdriver");
const Page = require("./Page");

class searchProductPage extends Page {
  //! initialization
  constructor(driver) {
    super(driver);
  }

  //! element locators
  wrapProduct = By.css(".productList");
  product2 = By.css(" .display-7");
  textProduct = By.css(".productList.product-list-component");

  //! page action
  async endPointPage() {
    this.openUrl("/search?q=pisau+kupas&sort=RECOMMENDED");
  }

  async scroll() {
    const js_code = "arguments[0].scrollIntoView();";
    const wraplist = await this.driver.findElement(this.wrapProduct);
    await this.driver.executeScript(js_code, wraplist);
  }
  async clickProduct() {
    // use wait until
    const buttonProduct = await this.driver.findElement(this.product2);
    await this.driver.wait(until.elementIsVisible(buttonProduct), 5000);
    await buttonProduct.click();

    // await this.driver.findElement(this.product2).click();
  }
  async getTextProduct() {
    return await this.driver.findElement(this.textProduct).getText();
  }
}

// await searchProductPage.scroll();
// await searchProductPage.clickProduct();

// const js_code = "arguments[0].scrollIntoView();";
// const wraplist = await driver.findElement(By.css(".productList"));
// await driver.executeScript(js_code, wraplist);
// await driver.sleep(1000);
// await driver.findElement(By.css(".itemBlock:nth-child(2) .display-7")).click();
module.exports = searchProductPage;
