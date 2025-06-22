const fs = require("fs");
const path = require("path");

function generateLighthouseConfig() {
  try {
    console.log("=========== Lighthouse 설정 생성 중 ===========");
    const authFilePath = path.join(__dirname, "auth-token.json");
    let accessToken = "";

    if (fs.existsSync(authFilePath)) {
      const authData = JSON.parse(fs.readFileSync(authFilePath, "utf8"));
      accessToken = authData.accessToken;
      console.log("저장된 토큰 로드 완료");
    } else {
      console.warn("토큰 파일이 없습니다. auth-setup.js를 먼저 실행하세요!");
    }

    const lighthouseConfig = {
      ci: {
        collect: {
          url: [
            "http://localhost:4173/onboarding",
            "http://localhost:4173/popup-list",
            "http://localhost:4173/dashboard",
          ],
          settings: {
            chromeFlags: [
              "--no-sandbox",
              "--disable-setuid-sandbox",
              "--disable-dev-shm-usage",
              "--disable-web-security",
              "--disable-features=VizDisplayCompositor",
            ],
            extraHeaders: accessToken
              ? JSON.stringify({
                  Authorization: `Bearer ${accessToken}`,
                })
              : undefined,
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
