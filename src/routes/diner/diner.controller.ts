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
  /*
    #swagger.summary = '가게 추가 API';
    #swagger.description = '특정 지역에 새로운 가게를 추가합니다. 가게명, 음식 카테고리, 주소, 전화번호, 평점 정보를 포함하여 요청합니다.';
    #swagger.parameters['regionId'] = {
      in: 'path',
      description: '지역 ID',
      required: true,
      type: 'integer'
    };
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: { type: "string", description: "가게명" },
              foodCategoryId: { type: "number", description: "음식 카테고리 ID" },
              address: { type: "string", description: "주소" },
              phoneNumber: { type: "string", description: "전화번호" },
              rating: { type: "number", description: "평점", default: 0 }
            },
            required: ["name", "foodCategoryId", "address", "phoneNumber"]
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "가게 추가 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  id: { type: "number", example: 14 },
                  regionId: { type: "number", example: 3 },
                  name: { type: "string", example: "홍콩반점" },
                  foodCategoryId: { type: "number", example: 1 },
                  address: { type: "string", example: "서울" },
                  phoneNumber: { type: "string", example: "02-123-4567" },
                  rating: { type: "number", example: 0 },
                  createdAt: { type: "string", format: "date-time" }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "가게 추가 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "D001" },
                  reason: { type: "string", example: "유효하지 않은 지역 ID입니다" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
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
