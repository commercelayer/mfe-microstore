import type { PlaywrightTestConfig } from "@playwright/test"

// Resolve the env once here, in the main process: workers and the dev server
// started by `webServer` inherit the result instead of each fetching from AWS.
// varlock looks for `.env.schema` in the current working directory, so switch
// to this package while loading it: otherwise running Playwright from the
// repository root (e.g. from an editor extension) loads an empty env.
const cwd = process.cwd()
process.chdir(__dirname)
try {
  require("varlock/auto-load")
} finally {
  process.chdir(cwd)
}

// Reference: https://playwright.dev/docs/test-configuration
const config: PlaywrightTestConfig = {
  // Timeout per test
  timeout: 30 * 1000,
  // Test directory
  testDir: "specs",
  // If a test fails, retry it additional 2 times
  retries: 0,
  // Artifacts folder where screenshots, videos, and traces are stored.
  outputDir: "test-results/",
  workers: 1,
  maxFailures: 2,
  // Fail on CI if `test.only` was left in the source code
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI
    ? [
        ["line"],
        ["junit", { outputFile: "test-results/junit.xml" }],
        ["html", { open: "never" }],
      ]
    : "list",

  // Run your local dev server before starting the tests:
  // https://playwright.dev/docs/test-advanced#launching-a-development-web-server-during-the-tests
  webServer: {
    command: "pnpm dev",
    port: 3000,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },

  use: {
    // Retry a test if its failing with enabled tracing. This allows you to analyse the DOM, console logs, network traffic etc.
    // More information: https://playwright.dev/docs/trace-viewer
    trace: "retry-with-trace",
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    // Artifacts
    screenshot: "only-on-failure",
    video: "retry-with-video",
  },

  projects: [
    {
      name: "Chromium",
      use: {
        // Configure the browser to use.
        browserName: "chromium",
        // Any Chromium-specific options.
        viewport: { width: 1200, height: 900 },
        launchOptions: {
          // logger: {
          //   isEnabled: (name, severity) => true,
          //   log: (name, severity, message, args) =>
          //     console.log(name, severity, message, args),
          // },
          // slowMo: 100,
        },
      },
    },
    // {
    //   name: "Mobile Safari",
    //   use: devices["iPhone 12"],
    // },
  ],
}
export default config
