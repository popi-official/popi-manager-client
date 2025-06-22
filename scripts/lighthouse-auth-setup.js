const fs = require("fs");
const path = require("path");

function createLighthouseAuthConfig() {
  try {
    const authFilePath = path.join(__dirname, "auth-token.json");
    let accessToken = "";

    if (fs.existsSync(authFilePath)) {
      const authData = JSON.parse(fs.readFileSync(authFilePath, "utf8"));
      accessToken = authData.accessToken;
    } else {
      throw new Error("토큰 파일이 없습니다.");
    }

    // popup-list용 별도 설정 생성
    const authConfig = {
      ci: {
        collect: {
          url: ["http://localhost:4173/dashboard"],
          puppeteerScript: path.join(__dirname, "lighthouse-puppeteer.js"),
          settings: {
            chromeFlags: [
              "--no-sandbox",
              "--disable-setuid-sandbox",
              "--disable-dev-shm-usage",
              "--disable-web-security",
            ],
            preset: "desktop",
            throttlingMethod: "provided",
            throttling: {
              rttMs: 0,
              throughputKbps: 0,
              cpuSlowdownMultiplier: 1,
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

    // Puppeteer 스크립트 생성
    const puppeteerScript = `
module.exports = async (browser, context) => {
  const page = await browser.newPage();
  
  // localStorage에 인증 정보 설정
  await page.evaluateOnNewDocument(() => {
    const authStore = {
      state: {
        accessToken: "${accessToken}",
        isLogin: true,
      },
      version: 0,
    };
    localStorage.setItem("auth-store", JSON.stringify(authStore));
  });
  
  return page;
};
    `;

    const configPath = path.join(process.cwd(), "lighthouserc.auth.json");
    const scriptPath = path.join(__dirname, "lighthouse-puppeteer.js");

    fs.writeFileSync(configPath, JSON.stringify(authConfig, null, 2));
    fs.writeFileSync(scriptPath, puppeteerScript);

    console.log("인증용 Lighthouse 설정 생성 완료:");
    console.log(`- Config: ${configPath}`);
    console.log(`- Script: ${scriptPath}`);

    return { configPath, scriptPath };
  } catch (error) {
    console.error("인증용 Lighthouse 설정 생성 실패:", error.message);
    throw error;
  }
}

if (require.main === module) {
  createLighthouseAuthConfig();
}

module.exports = { createLighthouseAuthConfig };
