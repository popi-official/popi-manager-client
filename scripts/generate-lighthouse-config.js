const fs = require("fs");
const path = require("path");

function generateLighthouseConfig() {
  try {
    console.log("=========== Lighthouse 설정 생성 중 ===========");

    // Chrome 경로 설정 (GitHub Actions vs 로컬)
    let chromePath;
    let chromeFlags = [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-web-security",
      "--disable-features=VizDisplayCompositor",
    ];

    if (process.env.CHROME_PATH) {
      // GitHub Actions 환경
      chromePath = process.env.CHROME_PATH;
      chromeFlags.push("--headless", "--disable-gpu");
      console.log(`GitHub Actions Chrome 경로: ${chromePath}`);
    } else {
      // 로컬 환경 - Puppeteer Chrome 사용
      try {
        const puppeteer = require("puppeteer");
        chromePath = puppeteer.executablePath();
        console.log(`로컬 Puppeteer Chrome 경로: ${chromePath}`);
      } catch (error) {
        console.warn(
          "Puppeteer를 찾을 수 없습니다. 시스템 Chrome을 사용합니다.",
        );
        chromePath = undefined;
      }
    }

    const lighthouseConfig = {
      ci: {
        collect: {
          url: ["http://localhost:4173/popup-list"],
          puppeteerScript: "./scripts/lighthouse-puppeteer.js",
          puppeteerLaunchOptions: {
            executablePath: chromePath,
            args: chromeFlags,
            headless: true,
          },
          settings: {
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
