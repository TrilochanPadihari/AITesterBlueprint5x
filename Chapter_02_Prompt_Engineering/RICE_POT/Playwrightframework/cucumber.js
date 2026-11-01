module.exports = {
  default: {
    require: ['support/**/*.js', 'step-definitions/**/*.js'],
    format: ['progress', 'allure-cucumberjs/reporter'],
    formatOptions: {
      resultsDir: 'allure-results'
    },
    publishQuiet: true,
    worldParameters: {
      baseUrl: process.env.BASE_URL || 'https://app.vwo.com/#/login'
    }
  }
};
