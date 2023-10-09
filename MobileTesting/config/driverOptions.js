const path = require("path");

const driverOptions = {
  hostname: "127.0.0.1",
  port: 4723,
  logLevel: "error",
  capabilities: {
    platformName: "Android",
    "appium:automationName": "UIAutomator2",
    "appium:deviceName": "emulator-5554",
    "appium:app": path.join(process.cwd(), "apk/EcommerceSolodroid.apk"),
    "appium:appPackage": "com.solodroid.solomerce",
    // "appium:appActivity": ".MainActivity",
    // "appium:appActivity": "com.solodroid.solomerce.activities.MainActivity",
    // "appium:appActivity": "com.solodroid.solomerce",
  },
};

module.exports = driverOptions;
