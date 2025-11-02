// Diner 도메인 라우터

import { Router } from "express";
import { handleAddDiner } from "./diner.controller.js";

const dinerRouter = Router();

// 1-1. 특정 지역에 가게 추가하기 API
dinerRouter.post("/regions/:regionId", handleAddDiner);

export default dinerRouter;
