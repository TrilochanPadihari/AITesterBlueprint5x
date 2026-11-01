const assert = require('node:assert/strict');
const { Given, When, Then } = require('@cucumber/cucumber');

Given('the VWO login page is open', async function () {
  await this.loginPage.open(this.baseUrl);
  assert.match(this.page.url(), /app\.vwo\.com\/#\/login|app\.vwo\.com\/login/i);
});

When('I submit the login form with email {string} and password {string}', async function (email, password) {
  await this.loginPage.submitCredentials(email, password);
});

When('I submit the login form with configured valid credentials', async function () {
  const email = process.env.VWO_VALID_EMAIL;
  const password = process.env.VWO_VALID_PASSWORD;
  if (!email || !password) {
    throw new Error('VWO_VALID_EMAIL and VWO_VALID_PASSWORD must be set for the valid login scenario.');
  }
  await this.loginPage.submitCredentials(email, password, process.env.VWO_REMEMBER_ME === 'true');
});

Then('an authentication error is displayed', async function () {
  assert.equal(await this.loginPage.hasAuthenticationError(), true);
});

Then('the VWO dashboard is displayed', async function () {
  assert.equal(await this.loginPage.isDashboardDisplayed(), true);
});
