// controller => 요청 출입구

import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToAddDinerMission } from "./mission.dto.js"; // 요청 DTO 변환
import { addDinerMission, listDinerMission } from "./mission.service.js"; // Service 로직
import { AddDinerMissionRequest } from "./mission.types.js";
import { handleListDinerReviews } from "../review/review.controller.js";

// ===== Request 예시 =====
// POST /api/v1/missions/diners/1
// {
//   "missionId": 1,
//   "startDate": "2025-11-01T00:00:00Z",
//   "endDate": "2025-11-30T23:59:59Z"
// }

export const handleAddDinerMission = async (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.summary = '가게 미션 추가 API (ADMIN 전용)';
    #swagger.description = '특정 가게에 새로운 미션을 추가합니다. ADMIN 권한이 필요하며, 미션 ID, 시작일, 종료일 정보를 포함하여 요청합니다.';
    #swagger.security = [{
      "bearerAuth": []
    }];
    #swagger.parameters['dinerId'] = {
      in: 'path',
      description: '가게 ID',
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
              missionId: { type: "number", description: "미션 ID" },
              startDate: { type: "string", format: "date-time", description: "시작일" },
              endDate: { type: "string", format: "date-time", description: "종료일" }
            },
            required: ["missionId", "startDate", "endDate"]
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "가게 미션 추가 성공 응답",
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
                  id: { type: "number", example: 1 },
                  dinerId: { type: "number", example: 1 },
                  missionId: { type: "number", example: 1 },
                  startDate: { type: "string", format: "date-time" },
                  endDate: { type: "string", format: "date-time" }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "가게 미션 추가 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "M001" },
                  reason: { type: "string", example: "유효하지 않은 가게 ID입니다" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
    #swagger.responses[401] = {
      description: "인증 실패 (JWT 토큰 없음 또는 만료)"
    };
    #swagger.responses[403] = {
      description: "권한 없음 (ADMIN 권한 필요)",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "AUTH002" },
                  reason: { type: "string", example: "관리자 권한이 필요합니다." },
                  data: { type: "object", properties: {
                    requiredRole: { type: "string", example: "ADMIN" },
                    currentRole: { type: "string", example: "USER" }
                  }}
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
    console.log("가게 미션 추가를 요청했습니다! (ADMIN)");
    const dinerId = Number(req.params.dinerId);
    console.log("body:", req.body);

    // 요청 데이터 DTO 변환
    const missionData = bodyToAddDinerMission(req.body as AddDinerMissionRequest);

    // 실제 DB 로직 수행 (service)
    const dinerMission = await addDinerMission(dinerId, missionData);

    // 성공 응답
    res.status(StatusCodes.CREATED).success(dinerMission);
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

///////////////////////

// ========= 6주차 미션 2==========
// 특정 가게 미션 목록 조회 API 컨트롤러

export const handleListDinerMission = async (req:Request, res:Response, next: NextFunction ) => {
  /*
    #swagger.summary = '가게 미션 목록 조회 API';
    #swagger.description = '특정 가게에 등록된 모든 미션을 조회합니다. 커서 기반 페이지네이션을 지원하여 미션 목록을 나눠서 가져올 수 있습니다.';
    #swagger.parameters['dinerId'] = {
      in: 'path',
      description: '가게 ID',
      required: true,
      type: 'integer'
    };
    #swagger.parameters['cursor'] = {
      in: 'query',
      description: '페이지네이션 커서 (마지막 미션 ID)',
      required: false,
      type: 'integer',
      example: 0
    };
    #swagger.responses[200] = {
      description: "가게 미션 목록 조회 성공 응답",
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
                  message: { type: "string", example: "해당 가게의 미션 목록을 조회했습니다." },
                  DinerMission: {
                    type: "object",
                    properties: {
                      data: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: { type: "number" },
                            dinerId: { type: "number" },
                            missionId: { type: "number" },
                            startDate: { type: "string", format: "date-time" },
                            endDate: { type: "string", format: "date-time" }
                          }
                        }
                      },
                      pagination: { type: "object", properties: { cursor: { type: "number", nullable: true } }}
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "가게 미션 목록 조회 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "M002" },
                  reason: { type: "string", example: "유효하지 않은 가게 ID입니다" },
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
  try{
  console.log(req.params.dinerId, " 가게의 미션을 조회합니다.");

  const dinerId: number = Number(req.params.dinerId); // 식당 id 값
  const cursor: number = req.query.cursor ? Number(req.query.cursor) : 0; // 커서값이 없으면 0으로 처리 => 커서값 Number로 처리


  const DinerMission = await listDinerMission(dinerId,cursor);

  res.status(StatusCodes.OK).success({ // 성공시
    message: "해당 가게의 미션 목록을 조회했습니다.",
    DinerMission
  });
  } catch(error){
    next(error);
  }
};
