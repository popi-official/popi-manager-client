const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

async function setupAuth() {
  try {
    console.log("=========== JWT 토큰 획득 중 ===========");

    const response = await fetch("https://dev-api.ceo.popi.today/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: process.env.TEST_EMAIL || "manager1",
        password: process.env.TEST_PASSWORD || "password1",
      }),
    });

    if (!response.ok) {
      throw new Error(`로그인 실패: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("로그인 응답:", data);

    if (!data.success || !data.data || !data.data.accessToken) {
      console.log("전체 응답:", JSON.stringify(data, null, 2));
      throw new Error("로그인 실패 또는 토큰이 없습니다");
    }

    const accessToken = data.data.accessToken;
    console.log("=========== JWT 토큰 획득 성공 ===========");

    const authData = {
      accessToken,
      timestamp: new Date().toISOString(),
      expiresIn: data.data.expiresIn || 3600,
    };

    const authFilePath = path.join(__dirname, "auth-token.json");
    fs.writeFileSync(authFilePath, JSON.stringify(authData, null, 2));
    console.log(`토큰 저장 완료: ${authFilePath}`);

    return accessToken;
  } catch (error) {
    console.error("인증 설정 실패:", error.message);
    throw error;
  }
}

async function setupBrowserAuth(accessToken) {
  console.log("=========== 브라우저 인증 상태 설정 중 ===========");
  
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-web-security",
    ],
  });

  try {
    const page = await browser.newPage();
    
    // 애플리케이션 페이지로 이동
    await page.goto("http://localhost:4173/onboarding", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    // localStorage에 인증 정보 설정 (Zustand persist 형식에 맞춤)
    await page.evaluate((token) => {
      const authStore = {
        state: {
          accessToken: token,
          isLogin: true,
        },
        version: 0,
      };
      localStorage.setItem("auth-store", JSON.stringify(authStore));
    }, accessToken);

    // 쿠키 설정 (리프레시 토큰용 - 실제 쿠키명은 백엔드 설정에 따라 조정 필요)
    await page.setCookie({
      name: "refreshToken",
      value: "dummy-refresh-token", // 실제 환경에서는 로그인 응답에서 가져와야 함
      domain: "localhost",
      path: "/",
      httpOnly: false,
      secure: false,
    });

    console.log("브라우저 인증 상태 설정 완료");
  } finally {
    await browser.close();
  }
}

if (require.main === module) {
  setupAuth()
    .then(token => {
      console.log("인증 설정 완료!");
      process.exit(0);
    })
    .catch(error => {
      console.error("인증 설정 실패:", error);
      process.exit(1);
    });
}

module.exports = { setupAuth, setupBrowserAuth };
