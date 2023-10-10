import { sleep } from "k6";
import { browser } from "k6/experimental/browser";
import dashboardBerry from "./browser-test/01_Dashboard_berry.browser.test.js";
import newArrival from "./browser-test/02_NewArrival_berry.browser.test.js";
import detailProduct from "./browser-test/03_DetailProduct_berry.browser.test.js";
import aboutDashboard from "./browser-test/04_About_berry.browser.test.js";

import dashboardProt from "./protocols-test/01_Dashboard.protocol.test.js";
import detailProductProt from "./protocols-test/02_DetailProduct.protocol.test.js";
import aboutProt from "./protocols-test/04_About.protocol.test.js";
import newArrivalProt from "./protocols-test/03_NewArrival.protocol.test.js";

//? k6 run --out cloud .\main.js

export const options = {
  scenarios: {
    protocolBased: {
      exec: "protocolBasedScript",
      //smoke
      executor: "constant-vus",
      vus: 10,
      duration: "10s",
    },

    browserBased: {
      exec: "browserTestScript",
      executor: "shared-iterations",
      vus: "1",
      options: {
        browser: {
          type: "chromium",
        },
      },
    },
  },
};

export async function browserTestScript() {
  const page = browser.newPage();
  try {
    await dashboardBerry(page);
    await newArrival(page);
    await detailProduct(page);
    await aboutDashboard(page);
    sleep(1);
  } finally {
    page.close();
  }
}

export async function protocolBasedScript() {
  //protocol
  dashboardProt();
  detailProductProt();
  newArrivalProt();
  aboutProt();
}

// export function ProtocolTest() {
