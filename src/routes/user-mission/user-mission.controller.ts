// controller => 요청 출입구

import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToChallengeMission } from "./user-mission.dto.js";
import { challengeMission } from "./user-mission.service.js";
import { ChallengeMissionRequest } from "./user-mission.types.js";

// ===== Request 예시 =====
// POST /api/v1/user-missions/1/challenge
// {
//   "userId": 1
// }

export const handleChallengeMission = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("미션 도전을 요청했습니다!");
    const dinerMissionId = Number(req.params.dinerMissionId);
    console.log("body:", req.body);

    // 요청 데이터 DTO 변환
    const missionData = bodyToChallengeMission(req.body as ChallengeMissionRequest);

    // 실제 DB 로직 수행 (service)
    const missionLog = await challengeMission(dinerMissionId, missionData);

    // 성공 응답
    res.status(StatusCodes.CREATED).json({
      result: missionLog,
    });
  } catch (error) {
    next(error); // 에러 핸들러로 위임
  }
};

// ===== Response 예시 =====
// {
//   "result": {
//     "id": 1,
//     "userId": 1,
//     "dinerMissionId": 1,
//     "status": "진행중",
//     "startedAt": "2025-11-03T00:00:00.000Z"
//   }
// }
