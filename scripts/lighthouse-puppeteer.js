const fs = require("fs");
const path = require("path");

module.exports = async (browser, context) => {
  console.log("=========== Puppeteer 스크립트 시작 ===========");

  // 토큰 파일에서 accessToken 로드
  const authFilePath = path.join(__dirname, "auth-token.json");
  let accessToken = "";

  if (fs.existsSync(authFilePath)) {
    const authData = JSON.parse(fs.readFileSync(authFilePath, "utf8"));
    accessToken = authData.accessToken;
    console.log("토큰 로드 완료");
  } else {
    throw new Error("토큰 파일이 없습니다. auth-setup.js를 먼저 실행하세요!");
  }

  const page = await browser.newPage();

  try {
    // 먼저 onboarding에 가서 인증 상태 설정
    console.log("onboarding 페이지로 이동 중...");
    await page.goto("http://localhost:4173/onboarding", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    // localStorage에 인증 정보 설정
    console.log("localStorage에 인증 정보 설정 중...");
    await page.evaluate(token => {
      const authStore = {
        state: {
          accessToken: token,
          isLogin: true,
        },
        version: 0,
      };
      localStorage.setItem("auth-store", JSON.stringify(authStore));
      console.log(
        "localStorage 설정 완료:",
        localStorage.getItem("auth-store"),
      );
    }, accessToken);

    // 잠시 대기 (인증 상태 안정화) - waitForTimeout 대신 setTimeout 사용
    console.log("인증 상태 안정화를 위해 2초 대기 중...");
    await new Promise(resolve => setTimeout(resolve, 2000));

    // // popup-list로 이동 (인증된 상태)
    // console.log("popup-list 페이지로 이동 중...");
    // await page.goto("http://localhost:4173/dashboard", {
    //   waitUntil: "networkidle0",
    //   timeout: 30000,
    // });

    // 페이지가 완전히 로드될 때까지 추가 대기
    console.log("페이지 로딩 완료 확인 중...");
    await page.waitForSelector("body", { timeout: 10000 });

    console.log("=========== Puppeteer 스크립트 완료 ===========");
    return page;
  } catch (error) {
    console.error("Puppeteer 스크립트 실행 중 오류:", error);
    await page.close();
    throw error;
  }
};
