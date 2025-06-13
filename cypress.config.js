const { defineConfig } = require("cypress");

module.exports = defineConfig({
   e2e: {
      baseUrl: 'https://squad-03-back-end.onrender.com',
      experimentalRunAllSpecs: true,
      defaultCommandTimeout: 10000,
   },
   video: false,
   viewportWidth: 1280,
   viewportHeight: 720,
})
