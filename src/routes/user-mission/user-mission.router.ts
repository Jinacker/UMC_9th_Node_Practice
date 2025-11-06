// UserMission 도메인 라우터

import { Router } from "express";
import { handleChallengeMission,handleMyMissionList } from "./user-mission.controller.js";

const userMissionRouter = Router();

// 1-4. 가게의 미션을 도전 중인 미션에 추가(미션 도전하기)
userMissionRouter.post("/:dinerMissionId/challenge", handleChallengeMission);

// ====  6주차 미션 3 =====
// 내가 진행중인 미션 목록 GET API
userMissionRouter.get("/users/:userId", handleMyMissionList);

export default userMissionRouter;

