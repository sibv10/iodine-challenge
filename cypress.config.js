const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://iodinesoftware.com',

    // @note site switches to mweb at 1025
    viewportWidth: 1100,
    viewportHeight: 660,

    // @note enables cross-domain iframe access
    chromeWebSecurity: false
  },
});
