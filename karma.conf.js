module.exports = {
  browsers: ['ChromiumHeadless'],
  customLaunchers: {
    ChromiumHeadless: {
      base: 'Chromium',
      flags: ['--headless', '--no-sandbox', '--disable-gpu']
    }
  }
};