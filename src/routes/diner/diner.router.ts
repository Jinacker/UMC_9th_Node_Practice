// Diner 도메인 라우터

import { Router } from "express";
import { handleAddDiner } from "./diner.controller.js";
import passport from "passport";
import { isAdmin } from "../../middleware/auth.middleware.js";

const dinerRouter = Router();

// JWT 인증 미들웨어
const isLogin = passport.authenticate('jwt', { session: false });

// 1-1. 특정 지역에 가게 추가하기 API (ADMIN 전용)
dinerRouter.post("/regions/:regionId", isLogin, isAdmin, handleAddDiner);

export default dinerRouter;
