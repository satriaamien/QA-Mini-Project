const { before, it } = require("mocha");
const { By, until, Actions, WebDriver, Key } = require("selenium-webdriver");

const setupDriver = require("./utils/setupDriver");
const DashboardPage = require("./pageObjects/dashboardPage");
const SearchProductPage = require("./pageObjects/searchProductPage");
const DetailItemPage = require("./pageObjects/DetailItemPage");
const ShoppingCart = require("./pageObjects/ShoppingCart");
const LoginPage = require("./pageObjects/LoginPage");
const { expect } = require("chai");

// async function getCloseAdBtn(driver) {
//   let button;
//   try {
//     // button = await driver.wait(
//     //   until.elementIsVisible(By.css(".dy-lb-close")),
//     //   7000
//     // );

//     button = await driver.wait(
//       until.elementIsVisible(By.css(".dy-lb-close")),
//       4000
//     );
//     // console.log("butonnn :", button);
//   } catch (err) {
//     button = false;
//   } finally {
//     return button;
//   }
// }

// async function closeAd(driver) {
//   const addBtn = await getCloseAdBtn(driver);

//   if (addBtn != false) {
//     await addBtn.click();
//   }
// }

describe("FT_001_E2E_BUY", () => {
  /**@type {WebDriver} */ let driver;
  /**@type {DashboardPage} */ let dashboardPage;
  /**@type {SearchProductPage} */ let searchProductPage;
  /**@type {DetailItemPage} */ let detailItemPage;
  /**@type {ShoppingCart} */ let shoppingCart;
  /**@type {LoginPage} */ let loginPage;

  before(async () => {
    // driver = await new Builder().forBrowser(Browser.CHROME).build();
    driver = await setupDriver();
    driver.manage().window().maximize();

    dashboardPage = new DashboardPage(driver);
    searchProductPage = new SearchProductPage(driver);
    detailItemPage = new DetailItemPage(driver);
    shoppingCart = new ShoppingCart(driver);
    loginPage = new LoginPage(driver);
    await dashboardPage.endpointPage();
  });
  beforeEach(async () => {
    await driver.sleep(3000);
  });

  after(async () => {
    // await driver.close();
  });

  async function closeAds() {
    let textAds;
    let clickCloseAds;
    try {
      await driver.sleep(2000);
      const ads = await driver.findElement(By.css(".dy-modal-contents"));
      clickCloseAds = await driver.findElement(
        By.css(".dy-modal-contents .dy-lb-close")
      );

      textAds = await ads.getText();
    } catch (err) {
      console.log(textAds);
    } finally {
      if (textAds) {
        await clickCloseAds.click();
      }
    }
  }

  describe("E2E_001 Percobaan Login pada halaman Login", async () => {
    it("Menampilkan Halaman Selamat Datang", async () => {
      await closeAds();
      await loginPage.clickLogoLogin();
      await closeAds();
      await driver.sleep(2000);
      await loginPage.fillUsername("85163624243");
      await loginPage.fillPassword("@Samintho123");
      await loginPage.clickMasuk();
      await driver.sleep(4000);
      const text = await loginPage.getWelcome();
      expect(text).include("Selamat datang");
    });
  });

  describe("E2E_002 Percobaan Search Produk Pisau Kupas pada Halaman Dashboard", () => {
    it("terdapat data pisau kupas", async () => {
      //   await closeAd(driver);
      //   await driver.findElement(By.css(".dy-lb-close")).click();
      //   await dashboardPage.clickDashboard();
      await dashboardPage.clickDashboard();
      await dashboardPage.searchBar("pisau kupas");
      await dashboardPage.clickEnter();
      await searchProductPage.scroll();
      const text = await searchProductPage.getTextProduct();
      expect(text).include("pisau kupas");
    });
  });
  describe("E2E_003 Percobaan Memilih Produk VÖRDA tipe pisau kupas pada halaman search Product", async () => {
    it("redirect halaman detail item produk dengan tipe item pisau kupas", async () => {
      await searchProductPage.clickProduct();
      // await detailItemPage.scroll();
      const text = await detailItemPage.getTextItemProduct();
      expect(text).include("Pisau kupas");
    });
  });
  describe.skip("E2E_004 Percobaan pencet tombol tambah dan kurang ", () => {
    it("nilai berhasil ditambah dan dikurangi", async () => {
      await detailItemPage.clickPlus();
      const textPlus = await detailItemPage.getTextCount();
      console.log("textPlus ", textPlus);
      expect(textPlus).equal("2");
      await detailItemPage.clickMinus();
      const textMinus = await detailItemPage.getTextCount();
      expect(textMinus).equal("1");
    });
  });
  describe("E2E_005 Percobaan pencet tombol love ", () => {
    it("nilai berhasil ditambah ke love logo", async () => {
      await detailItemPage.clickLove();
      const text = await detailItemPage.getTextLove();
      console.log("text", text);
      expect(text).include("1");
    });
  });
  // describe("E2E_005 Percobaan Tambah Keranjang ", () => {
  //   it("nilai berhasil bertambah pada logo cart", async () => {
  //     await detailItemPage.clickAddToCart();
  //     await driver.sleep(4000);
  //     await detailItemPage.clickNextCart();
  //     const text = await detailItemPage.getTextCart();
  //     expect(text).include("1");
  //   });
  // });

  // describe("E2E_006 Percobaan pengiriman barang", async () => {
  //   it("harga sesuai dengan barang yang dipesan", async () => {
  //     await shoppingCart.scroll();
  //     await shoppingCart.fillPostalCode("57214");
  //     await driver.sleep(2000);
  //     await shoppingCart.clickListPostal();
  //     //   await driver.sleep(2000);
  //     await shoppingCart.clickPickup();
  //     await shoppingCart.clickCollect();
  //     await shoppingCart.clickBtnLokasi();
  //     await driver.sleep(2000);
  //     await shoppingCart.clickBtnBayar();
  //     await driver.sleep(3000);
  //     await shoppingCart.scrollCheckout();
  //     const text = await shoppingCart.getTextpriceCo();
  //     console.log("text harga ".text);
  //     expect(text).include("69.900");
  //   });
  // });
});
