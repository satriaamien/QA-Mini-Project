const Page = require("./Page");

class CheckoutPage extends Page {
  // initialization
  constructor(driver) {
    super(driver);
  }

  // element locators
  get textItemCo() {
    return this.driver.$("id=product_quantity");
  }
  get allItem() {
    return this.driver.$("id=product_price");
  }
  get priceIncludeTax() {
    return this.driver.$("id=txt_total_price");
  }

  // page actions
  async getTextItemCo() {
    return await this.textItemCo.getText();
  }
  async calculatePriceAllItem() {
    let totalItemCart;
    const tax = 0.1;
    const textTotalItemCart = await this.allItem.getText();

    totalItemCart = textTotalItemCart.match(/\d/g); //[[..],[..]]
    totalItemCart = parseInt(totalItemCart.join("")); //join without coma
    const percentageTax = totalItemCart * tax;
    const hasil = Math.ceil(percentageTax + totalItemCart); //bulatkan
    return hasil;
  }
  async getTextPriceIncludeTax() {
    return await this.priceIncludeTax.getText();
  }
}
// priceItemCart
// priceItemCart
module.exports = CheckoutPage;
