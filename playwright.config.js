const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/system',
  fullyParallel: false,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173', // Vite's default local development port
    trace: 'on-first-retry',
  },
  // Automatically boot up your backend Express server before tests run
  webServer: {
    command: 'node backend/server.js',
    url: 'http://localhost:3000/tasks',
    reuseExistingServer: !process.env.CI,
    timeout: 10 * 1000,
  },
});