const { setWorldConstructor, World } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { LoginPage } = require('../pages/login.page');

class VwoWorld extends World {
  constructor(options) {
    super(options);
    this.browser = undefined;
    this.context = undefined;
    this.page = undefined;
    this.loginPage = undefined;
    this.baseUrl = options.parameters.baseUrl;
  }

  async startBrowser() {
    try {
      this.browser = await chromium.launch({
        headless: process.env.HEADLESS !== 'false'
      });
      this.context = await this.browser.newContext();
      this.page = await this.context.newPage();
      this.loginPage = new LoginPage(this.page);
    } catch (error) {
      throw new Error(`Unable to start the browser: ${error.message}`);
    }
  }

  async closeBrowser() {
    try {
      if (this.browser) {
        await this.browser.close();
      }
    } catch (error) {
      throw new Error(`Unable to close the browser: ${error.message}`);
    }
  }
}

setWorldConstructor(VwoWorld);
