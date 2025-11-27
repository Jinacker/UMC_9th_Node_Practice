// Mission 도메인 라우터

import { Router } from "express";
import passport from "passport";
import { isAdmin } from "../../middleware/auth.middleware.js";
import { handleAddDinerMission, handleListDinerMission } from "./mission.controller.js";

const missionRouter = Router();

// JWT 인증 미들웨어
const isLogin = passport.authenticate('jwt', { session: false });

// 가게에 미션 추가 - POST /api/v1/missions/diners/:dinerId (ADMIN 전용)
missionRouter.post("/diners/:dinerId", isLogin, isAdmin, handleAddDinerMission);

export default missionRouter;

// ======== 6주차 미션 2 =========
// 특정 가게의 미션 목록 API 구현

missionRouter.get("/diners/:dinerId", handleListDinerMission);