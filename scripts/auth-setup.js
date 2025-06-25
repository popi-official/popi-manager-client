const fs = require("fs");
const path = require("path");

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

module.exports = { setupAuth };
