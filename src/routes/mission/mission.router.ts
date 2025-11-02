// Mission 도메인 라우터

import { Router } from "express";
import { handleAddDinerMission } from "./mission.controller.js";

const missionRouter = Router();

// 가게에 미션 추가 - POST /api/v1/missions/diners/:dinerId
missionRouter.post("/diners/:dinerId", handleAddDinerMission);

export default missionRouter;
