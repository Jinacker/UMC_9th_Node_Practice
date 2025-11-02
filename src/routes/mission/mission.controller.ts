// controller => 요청 출입구

import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToAddDinerMission } from "./mission.dto.js"; // 요청 DTO 변환
import { addDinerMission } from "./mission.service.js"; // Service 로직
import { AddDinerMissionRequest } from "./mission.types.js";

// ===== Request 예시 =====
// POST /api/v1/missions/diners/1
// {
//   "missionId": 1,
//   "startDate": "2025-11-01T00:00:00Z",
//   "endDate": "2025-11-30T23:59:59Z"
// }

export const handleAddDinerMission = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("가게 미션 추가를 요청했습니다!");
    const dinerId = Number(req.params.dinerId);
    console.log("body:", req.body);

    // 요청 데이터 DTO 변환
    const missionData = bodyToAddDinerMission(req.body as AddDinerMissionRequest);

    // 실제 DB 로직 수행 (service)
    const dinerMission = await addDinerMission(dinerId, missionData);

    // 성공 응답
    res.status(StatusCodes.CREATED).json({
      result: dinerMission,
    });
  } catch (error) {
    next(error); // 에러 핸들러로 위임
  }
};

// ===== Response 예시 =====
// {
//   "result": {
//     "id": 1,
//     "dinerId": 1,
//     "missionId": 1,
//     "startDate": "2025-11-01T00:00:00.000Z",
//     "endDate": "2025-11-30T23:59:59.000Z"
//   }
// }
