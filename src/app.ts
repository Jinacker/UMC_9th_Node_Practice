// express 자체 설정
import cors from "cors";
import express, { Request, Response } from "express";
import userRouter from "./routes/user/user.router.js";
import reviewRouter from "./routes/review/review.router.js";
import dinerRouter from "./routes/diner/diner.router.js";
import missionRouter from "./routes/mission/mission.router.js";
import userMissionRouter from "./routes/user-mission/user-mission.router.js";
import cookieParser from 'cookie-parser';


import { errorHandler } from "./middleware/error-handler.js";
import morgan from "morgan";

const app = express();

// ===== 미들웨어 설정 =====
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev")); // HTTP 요청 로깅용 => 매우매우 유용하네
app.use(cookieParser()); // 쿠키 parser


// ===== 라우터 설정 =====

// ===== 실습 ======
// 쿠키 만드는 라우터 
app.get('/setcookie', (req, res) => {
    // 'myCookie'라는 이름으로 'hello' 값을 가진 쿠키를 생성
    res.cookie('myCookie', 'hello', { maxAge: 60000 }); // 60초간 유효
    res.send('쿠키가 생성되었습니다!');
});

// 쿠키 읽는 라우터 
app.get('/getcookie', (req, res) => {
    // cookie-parser 덕분에 req.cookies 객체에서 바로 꺼내 쓸 수 있음
    const myCookie = req.cookies.myCookie; 
    
    if (myCookie) {
        console.log(req.cookies); // { myCookie: 'hello' }
        res.send(`당신의 쿠키: ${myCookie}`);
    } else {
        res.send('쿠키가 없습니다.');
    }
});
// ===== 실습 ======


// 헬스 체크
app.get("/", (_req: Request, res: Response) => {
  res.send("Node Server is running!");
});

// 도메인별 라우트
app.use("/api/v1/users", userRouter); // User 도메인 라우트
app.use("/api/v1/diners", dinerRouter); // diner 도메인 라우트
app.use("/api/v1/missions", missionRouter); // mission 도메인 라우트
app.use("/api/v1/reviews", reviewRouter); // review 도메인 라우트
app.use("/api/v1/user-missions", userMissionRouter); // user-mission 도메인 라우트

// ===== 에러 핸들링 미들웨어 =====
// 전역 에러 핸들러
app.use(errorHandler);

export default app;
