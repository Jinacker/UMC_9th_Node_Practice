// express 자체 설정
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import userRouter from "./routes/user/user.router.js";
import reviewRouter from "./routes/review/review.router.js";
import dinerRouter from "./routes/diner/diner.router.js";
import missionRouter from "./routes/mission/mission.router.js";
import userMissionRouter from "./routes/user-mission/user-mission.router.js";
import cookieParser from 'cookie-parser';

import { responseWrapper } from './middleware/responseWrapper.js';
import { errorHandler } from "./middleware/error-handler.js";
import morgan from "morgan";
import SwaggerSetup from "./config/swagger.js";

const app = express();

// ===== 미들웨어 설정 =====
app.use(cors());
app.use(express.static("public"));
app.use(express.json()); // body parser (express 내장)
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev")); // HTTP 요청 로깅용 => 매우매우 유용하네
app.use(cookieParser()); // 쿠키 parser


// ===== Swagger =====
SwaggerSetup(app);

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

const isLogin = (req:Request, res:Response, next:NextFunction) => {
    // cookie-parser가 만들어준 req.cookies 객체에서 username을 확인
    const { username } = req.cookies; 

    if (username) {
        console.log(`[인증 성공] ${username}님, 환영합니다.`);
        next(); 
    } else {
    
        console.log('[인증 실패] 로그인이 필요합니다.');
        res.status(401).send('<script>alert("로그인이 필요합니다!");location.href="/login";</script>');
    }
};


app.get('/', (req, res) => {
    res.send(`
        <h1>메인 페이지</h1>
        <p>이 페이지는 로그인이 필요 없습니다.</p>
        <ul>
            <li><a href="/mypage">마이페이지 (로그인 필요)</a></li>
        </ul>
    `);
});


app.get('/login', (req, res) => {
    res.send('<h1>로그인 페이지</h1><p>로그인이 필요한 페이지에서 튕겨나오면 여기로 옵니다.</p>');
});


app.get('/mypage', isLogin, (req, res) => {
    res.send(`
        <h1>마이페이지</h1>
        <p>환영합니다, ${req.cookies.username}님!</p>
        <p>이 페이지는 로그인한 사람만 볼 수 있습니다.</p>
    `);
});


app.get('/set-login', (req, res) => {
    res.cookie('username', 'UMC9th', { maxAge: 3600000 });
    res.send('로그인 쿠키(username=UMC9th) 생성 완료! <a href="/mypage">마이페이지로 이동</a>');
});


app.get('/set-logout', (req, res) => {
    res.clearCookie('username');
    res.send('로그아웃 완료 (쿠키 삭제). <a href="/">메인으로</a>');
});


// ===== 실습 ======

// 전역 응답 Wrapper => 이게 맨 위에 있어야되구나! => 라우팅 보다 위에 있어야함
app.use(responseWrapper);

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
