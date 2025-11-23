import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";

import { Request,Response, NextFunction } from "express";

// === 스웨거 셋팅 관련 코드 따로 분리 ===
// 스웨거 관련 미들웨어 세트 => 일종의 미들웨어를 등록해주는 "팩토리 함수"

const SwaggerSetup = (app:any) => {
        app.use(
        "/docs",
        swaggerUiExpress.serve,
        swaggerUiExpress.setup({}, {
        swaggerOptions: {
        url: "/openapi.json",
        },})
    );

    app.get("/openapi.json", async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.ignore = true
        const options = {
            openapi: "3.0.0",
            disableLogs: true,
            writeOutputFile: false,
    };
    const outputFile = "/dev/null"; // 파일 출력은 사용하지 않습니다.
        const routes = ["./src/server.ts", "src/routes/*/*.router.ts"]; // routes에 있는 엔드포인트들도 연결
        const doc = {
            info: {
            title: "UMC 9th",
            description: "UMC 9th Node.js 테스트 프로젝트입니다.",
        },
        host: "localhost:3000",
    };

        const result = await swaggerAutogen(options)(outputFile, routes, doc);
        res.json(result ? result.data : null);
    });
};

export default SwaggerSetup;