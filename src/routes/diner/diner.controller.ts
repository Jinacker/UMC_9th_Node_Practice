// controller => 요청 출입구

import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToAddDiner } from "./diner.dto.js"; // 요청 DTO 변환
import { addDiner } from "./diner.service.js"; // Service 로직
import { AddDinerRequest } from "./diner.types.js";

// ===== Request 예시 =====
// POST /api/v1/diners/regions/3
// {
//   "name": "홍콩반점",
//   "foodCategoryId": 1,
//   "address": "서울",
//   "phoneNumber": "02-123-4567",
//   "rating": 0
// }

export const handleAddDiner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("식당 등록을 요청했습니다!");
    const regionId = Number(req.params.regionId);
    console.log("body:", req.body);

    // 요청 데이터 DTO 변환
    const dinerData = bodyToAddDiner(req.body as AddDinerRequest);

    // 실제 DB 로직 수행 (service)
    const diner = await addDiner(regionId, dinerData);

    // 성공 응답
    res.status(StatusCodes.CREATED).success(diner);
  } catch (error) {
    next(error); // 에러 핸들러로 위임
  }
};

// ===== Response 예시 =====
// {
//   "result": {
//     "id": 14,
//     "regionId": 3,
//     "name": "홍콩반점0410",
//     "foodCategoryId": 1,
//     "address": "서울",
//     "phoneNumber": "02-123-4567",
//     "rating": 0,
//     "createdAt": "2025-11-02T11:30:24.000Z"
//   }
// }
