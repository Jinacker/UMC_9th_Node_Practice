// UserMission 도메인 라우터

import { Router } from "express";
import passport from "passport";
import { handleChallengeMission,handleMyMissionList, handleCompleteMission } from "./user-mission.controller.js";

const userMissionRouter = Router();

// JWT 인증 미들웨어
const isLogin = passport.authenticate('jwt', { session: false });

// 1-4. 가게의 미션을 도전 중인 미션에 추가(미션 도전하기) (인증 필요)
userMissionRouter.post("/:dinerMissionId/challenge", isLogin, handleChallengeMission);

// ====  6주차 미션 3 =====
// 내가 진행중인 미션 목록 GET API (인증 필요)
userMissionRouter.get("/my-missions", isLogin, handleMyMissionList);


// ==== 6주차 미션 4 ======
// 내가 진행 중인 미션을 진행 완료로 바꾸기 PATCH API (인증 필요)
userMissionRouter.patch("/missions/:missionLogId/complete", isLogin, handleCompleteMission);


export default userMissionRouter;




