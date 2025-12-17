import swaggerUiExpress from "swagger-ui-express";
import swaggerFile from "../openapi.json" with { type: "json" };

// 서버 실행시 이미 생성된 openapi.json만 불러오게 분리
const SwaggerSetup = (app: any) => {
  app.use(
    "/docs",
    swaggerUiExpress.serve,
    swaggerUiExpress.setup(swaggerFile)
  );
};

export default SwaggerSetup;
