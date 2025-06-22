const fs = require("fs");
const path = require("path");

function generateLighthouseConfig() {
  try {
    console.log("=========== Lighthouse 설정 생성 중 ===========");

    const lighthouseConfig = {
      ci: {
        collect: {
          url: ["http://localhost:4173/popup-list"],
          puppeteerScript: path.join(__dirname, "lighthouse-puppeteer.js"),
          settings: {
            chromeFlags: [
              "--no-sandbox",
              "--disable-setuid-sandbox",
              "--disable-dev-shm-usage",
              "--disable-web-security",
              "--disable-features=VizDisplayCompositor",
            ],
            preset: "desktop",
            throttlingMethod: "provided",
            throttling: {
              rttMs: 0,
              throughputKbps: 0,
              cpuSlowdownMultiplier: 1,
              requestLatencyMs: 0,
              downloadThroughputKbps: 0,
              uploadThroughputKbps: 0,
            },
          },
          numberOfRuns: 3,
        },
        assert: {
          assertions: {
            "categories:performance": ["warn", { minScore: 0.8 }],
            "categories:accessibility": ["error", { minScore: 0.8 }],
            "categories:best-practices": ["warn", { minScore: 0.8 }],
            "categories:seo": ["warn", { minScore: 0.8 }],
          },
        },
        upload: {
          target: "temporary-public-storage",
        },
      },
    };

    const configPath = path.join(process.cwd(), "lighthouserc.json");
    fs.writeFileSync(configPath, JSON.stringify(lighthouseConfig, null, 2));
    console.log(
      `=========== Lighthouse 설정 저장 완료 =========== \n${configPath}`,
    );

    return lighthouseConfig;
  } catch (error) {
    console.error(
      "=========== Lighthouse 설정 생성 실패 =========== \n",
      error.message,
    );
    throw error;
  }
}

if (require.main === module) {
  generateLighthouseConfig();
  console.log("=========== Lighthouse 설정 생성 완료 ===========");
}

module.exports = { generateLighthouseConfig };
