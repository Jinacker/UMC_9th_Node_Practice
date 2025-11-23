import swaggerAutogen from "swagger-autogen";

// 빌드시에만 openapi.json 생성

const doc = {
  info: {
    title: "UMC 9th",
    description: "UMC 9th Node.js 테스트 프로젝트입니다.",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local server",
    },
  ],
};

const outputFile = "./src/openapi.json";

// glob 패턴은 swagger-autogen이 지원하지 않기 때문에 직접 나열해야 한다고 한다.
const routes = [
  "./src/server.ts",
  "./src/routes/user/user.router.ts",
  "./src/routes/review/review.router.ts",
  "./src/routes/diner/diner.router.ts",
  "./src/routes/mission/mission.router.ts",
  "./src/routes/user-mission/user-mission.router.ts",
];

const options = {
  openapi: "3.0.0",
  disableLogs: true,
};

swaggerAutogen(options)(outputFile, routes, doc)
  .then(() => console.log("Swagger 문서 생성 완료!"))
  .catch((err) => console.error("Swagger 생성 실패:", err));
