const setupDriver = require("../Utils/setupDriver");
const CheckoutPage = require("../pageObjects/CheckoutPage");
const DetailItemPage = require("../pageObjects/DetailItemPage");
const HomePage = require("../pageObjects/homePage");
const { expect } = require("chai");
const { Key } = require("webdriverio");
const FillDataCheckoutPage = require("../pageObjects/FillDataCheckout");

describe("first", () => {
  /**@type {WebdriverIO.Browser} */ let driver;
  /**@type {HomePage} */ let homePage;
  /**@type {DetailItemPage} */ let detailItemPage;
  /**@type {CheckoutPage} */ let checkoutPage;
  /**@type {FillDataCheckoutPage} */ let fillDataCheckoutPage;

  before(async () => {
    driver = await setupDriver();
    homePage = new HomePage(driver);
    detailItemPage = new DetailItemPage(driver);
    checkoutPage = new CheckoutPage(driver);
    fillDataCheckoutPage = new FillDataCheckoutPage(driver);
  });

  after(async () => {
    await driver.pause(3000);
    await driver.deleteSession();
  });

  //// var onePriceItem; //global scope item
  const jumlah_pesan = 2;

  describe("FT_001_E2E_BUY", () => {
    describe("E2E_001 percobaan pencarian item usb", () => {
      it("memunculkan item dengan kategori nama usb", async () => {
        await homePage.clickSearch();
        await homePage.fillSearchInput("usb");
        await homePage.enterKeys;
      });
    });

    describe("E2E_002 percobaan memilih item ke 2 berdasarkan hasil filter", () => {
      it("menampilkan harga dan detail produk", async () => {
        await detailItemPage.clickItem2();
        const price = await detailItemPage.getTextPriceOneItem();
        const product = await detailItemPage.getTextDetailProduct();
        expect(product).include("USB");
        expect(price).equal(19);
        //// onePriceItem = price;
      });
    });
    describe("E2E_003 percobaan klik tombol cart ", () => {
      it("memunculkan popup jumlah item order", async () => {
        await detailItemPage.clickAddCart();
        const text = await detailItemPage.getTextPopup();
        expect(text).include("order");
      });
    });
  });
  describe("E2E_004 percobaan memasukkan jumlah item ", () => {
    it("jumlah item sesuai inputan oleh user ", async () => {
      await detailItemPage.fillOrderValue(`${jumlah_pesan}`);
      const text = await detailItemPage.getTextOrderValue();
      expect(text).equal(`${jumlah_pesan}`);
      await detailItemPage.clickAddCartPopup();
      await detailItemPage.clickCart();
    });
  });
  describe("E2E_005 percobaan cek jumlah pesanan", () => {
    it("jumlah item yang telah diinput sesuai", async () => {
      const text = await checkoutPage.getTextItemCo();
      // console.log("text ", text);
      expect(text).include(`x ${jumlah_pesan}`);
    });
  });

  describe("E2E_006 percobaan cek total pembayaran include sesuai dengan pajak ", () => {
    it("total pembayaran dengan pajak sesuai", async () => {
      let calculateTotalItemCart = await checkoutPage.calculatePriceAllItem();
      let textPriceIncludeTax = await checkoutPage.getTextPriceIncludeTax();
      // console.log("textPriceIncludeTax ", textPriceIncludeTax);
      // console.log(" totalItemCart ", totalItemCart);
      // totalItemCart = totalItemCart.match(/\d/g);
      // totalItemCart = parseInt(totalItemCart.join(""));
      // let percentageTax = totalItemCart * tax;
      // let hasil = Math.ceil(percentageTax + totalItemCart);
      // console.log("hasil ", hasil);
      expect(textPriceIncludeTax).include(`${calculateTotalItemCart}`);
      await driver.$("id=btn_checkout").click();
    });
  });
  describe("E2E_007 mengisi alamat detail checkout", () => {
    it("memunculkan  verify popup checkout", async () => {
      await fillDataCheckoutPage.fillName("samintho");
      await fillDataCheckoutPage.fillEmail("samintho@gmail.com");
      await fillDataCheckoutPage.fillPhone("+6281324734851");
      await fillDataCheckoutPage.fillAddress("sragen");
      await fillDataCheckoutPage.clickShipping();
      await fillDataCheckoutPage.clickChoiceShipping();
      await fillDataCheckoutPage.drag();
      await fillDataCheckoutPage.fillComment("tolong dipaketkan yang rapi");
      await fillDataCheckoutPage.clickCheckout();
    });
  });
  describe("E2E_008 percobaan menyetujui validasi popup", () => {
    it("memunculkan popup congratulation", async () => {
      await fillDataCheckoutPage.clickValidationPopup();
      const text = await fillDataCheckoutPage.getTextpopUpSuccess();
      expect(text).include("Thank you");
    });
  });
});
