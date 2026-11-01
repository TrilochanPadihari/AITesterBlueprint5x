class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('xpath=(//input[@type="email" or contains(translate(@placeholder,"EMAIL","email"),"email")])[1]');
    this.passwordInput = page.locator('xpath=(//input[@type="password" or contains(translate(@placeholder,"PASSWORD","password"),"password")])[1]');
    this.rememberMeInput = page.locator('xpath=(//input[@type="checkbox" and (contains(translate(@name,"REMEMBER","remember"),"remember") or contains(translate(@id,"REMEMBER","remember"),"remember") or contains(translate(@aria-label,"REMEMBER","remember"),"remember"))])[1]');
    this.submitButton = page.locator('xpath=(//button[@type="submit"] | //input[@type="submit"] | //button[contains(translate(normalize-space(.),"LOGIN","login"),"login") or contains(translate(normalize-space(.),"SIGN IN","sign in"),"sign in")])[1]');
    this.authenticationError = page.locator('xpath=(//*[contains(translate(normalize-space(.),"INVALIDINCORRECTFAILEDERROR","invalidincorrectfailederror"),"invalid") or contains(translate(normalize-space(.),"INVALIDINCORRECTFAILEDERROR","invalidincorrectfailederror"),"incorrect") or contains(translate(normalize-space(.),"INVALIDINCORRECTFAILEDERROR","invalidincorrectfailederror"),"failed") or contains(translate(normalize-space(.),"INVALIDINCORRECTFAILEDERROR","invalidincorrectfailederror"),"error")])[1]');
  }

  async open(baseUrl) {
    try {
      await this.page.goto(baseUrl);
    } catch (error) {
      throw new Error(`Unable to open the VWO login page: ${error.message}`);
    }
  }

  async submitCredentials(email, password, rememberMe = false) {
    try {
      await this.emailInput.fill(email);
      await this.passwordInput.fill(password);
      if (rememberMe && await this.rememberMeInput.count()) {
        await this.rememberMeInput.check();
      }
      await this.submitButton.click();
    } catch (error) {
      throw new Error(`Unable to submit VWO login credentials: ${error.message}`);
    }
  }

  async hasAuthenticationError() {
    try {
      return await this.authenticationError.isVisible();
    } catch (error) {
      throw new Error(`Unable to verify the authentication error: ${error.message}`);
    }
  }

  async isDashboardDisplayed() {
    try {
      return !/login/i.test(this.page.url());
    } catch (error) {
      throw new Error(`The VWO dashboard was not displayed: ${error.message}`);
    }
  }
}

module.exports = { LoginPage };
