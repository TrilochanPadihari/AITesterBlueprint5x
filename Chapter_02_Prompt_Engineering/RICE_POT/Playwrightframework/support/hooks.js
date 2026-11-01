const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(30000);

Before(async function () {
  await this.startBrowser();
});

After(async function () {
  await this.closeBrowser();
});
