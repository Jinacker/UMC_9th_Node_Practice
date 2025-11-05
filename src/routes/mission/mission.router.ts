// Mission 도메인 라우터

import { Router } from "express";
import { handleAddDinerMission, handleListDinerMission } from "./mission.controller.js";

const missionRouter = Router();

// 가게에 미션 추가 - POST /api/v1/missions/diners/:dinerId
missionRouter.post("/diners/:dinerId", handleAddDinerMission);

export default missionRouter;

// ======== 6주차 미션 2 =========
// 특정 가게의 미션 목록 API 구현

missionRouter.get("/diners/:dinerId", handleListDinerMission);