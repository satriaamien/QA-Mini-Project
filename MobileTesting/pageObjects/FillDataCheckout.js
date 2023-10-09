const Page = require("./Page");

class FillDataCheckoutPage extends Page {
  // initialization
  constructor(driver) {
    super(driver);
  }

  // element locators
  get name() {
    return this.driver.$("id=edt_name");
  }
  get email() {
    return this.driver.$("id=edt_email");
  }
  get phone() {
    return this.driver.$("id=edt_phone");
  }
  get address() {
    return this.driver.$("id=edt_address");
  }
  get ship() {
    return this.driver.$("id=spinner");
  }
  get shipping() {
    return this.driver.$(
      "/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.ListView/android.widget.CheckedTextView[5]"
    );
  }
  get comment() {
    return this.driver.$("id=edt_comment");
  }

  get checkout() {
    return this.driver.$("id=btn_submit_order");
  }
  get yesPopup() {
    return this.driver.$("id=android:id/button1");
  }
  get successPopup() {
    return this.driver.$(
      "/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.ScrollView/android.widget.LinearLayout/android.widget.TextView"
    );
  }

  // page actions
  async fillName(name) {
    await this.name.setValue(name);
  }
  async fillEmail(email) {
    await this.email.setValue(email);
  }
  async fillPhone(phone) {
    await this.phone.setValue(phone);
  }
  async fillAddress(address) {
    await this.address.setValue(address);
  }
  async clickShipping() {
    await this.ship.click();
  }
  async clickChoiceShipping() {
    await this.shipping.click();
  }

  async drag() {
    await this.driver.touchPerform([
      { action: "press", options: { x: 312, y: 800 } },
      { action: "wait", options: { ms: 500 } },
      { action: "moveTo", options: { x: 381, y: 165 } },
      { action: "release" },
    ]);
  }
  async fillComment(comment) {
    await this.comment.setValue(comment);
  }
  async clickCheckout() {
    await this.checkout.click();
  }

  async clickValidationPopup() {
    await this.yesPopup.click();
  }

  async getTextpopUpSuccess() {
    const text = await this.successPopup;
    await text.waitForExist({ timeout: 8000 });
    return await text.getText();
  }
}
module.exports = FillDataCheckoutPage;
