// controller => 요청 출입구

import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToChallengeMission } from "./user-mission.dto.js";
import { challengeMission, myMissionListService, completeMissionService } from "./user-mission.service.js";
import { ChallengeMissionRequest } from "./user-mission.types.js";

// ===== Request 예시 =====
// POST /api/v1/user-missions/1/challenge
// {
//   "userId": 1
// }

export const handleChallengeMission = async (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.summary = '미션 도전 API';
    #swagger.description = '가게의 미션에 도전합니다. 사용자 ID를 포함하여 요청하면 해당 미션이 진행 중인 미션으로 추가됩니다.';
    #swagger.parameters['dinerMissionId'] = {
      in: 'path',
      description: '가게 미션 ID',
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
              userId: { type: "number", description: "사용자 ID" }
            },
            required: ["userId"]
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "미션 도전 성공 응답",
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
                  userId: { type: "number", example: 1 },
                  dinerMissionId: { type: "number", example: 1 },
                  status: { type: "string", example: "진행중" },
                  startedAt: { type: "string", format: "date-time" }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "미션 도전 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "UM001" },
                  reason: { type: "string", example: "이미 도전 중인 미션입니다" },
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
    console.log("미션 도전을 요청했습니다!");
    const dinerMissionId = Number(req.params.dinerMissionId);
    console.log("body:", req.body);

    // 요청 데이터 DTO 변환
    const missionData = bodyToChallengeMission(req.body as ChallengeMissionRequest);

    // 실제 DB 로직 수행 (service)
    const missionLog = await challengeMission(dinerMissionId, missionData);

    // 성공 응답
    res.status(StatusCodes.CREATED).success(missionLog);
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

/// ======= 6주차 미션 3 ========
// 내가 진행중인 미션 목록 => controller

export const handleMyMissionList = async (req:Request, res:Response, next: NextFunction) => {
  /*
    #swagger.summary = '내 진행중인 미션 목록 조회 API';
    #swagger.description = '사용자가 현재 진행 중인 모든 미션을 조회합니다. 커서 기반 페이지네이션을 지원하여 미션 목록을 나눠서 가져올 수 있습니다.';
    #swagger.parameters['userId'] = {
      in: 'path',
      description: '사용자 ID',
      required: true,
      type: 'integer'
    };
    #swagger.parameters['cursor'] = {
      in: 'query',
      description: '페이지네이션 커서 (마지막 미션 로그 ID)',
      required: false,
      type: 'integer',
      example: 0
    };
    #swagger.responses[200] = {
      description: "진행중인 미션 목록 조회 성공 응답",
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
                  message: { type: "string", example: "내가 진행중인 미션 목록을 찾아왔어요!" },
                  MyMissionList: {
                    type: "object",
                    properties: {
                      data: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: { type: "number" },
                            userId: { type: "number" },
                            dinerMissionId: { type: "number" },
                            status: { type: "string", example: "진행중" },
                            startedAt: { type: "string", format: "date-time" }
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
      description: "진행중인 미션 목록 조회 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "UM002" },
                  reason: { type: "string", example: "유효하지 않은 사용자 ID입니다" },
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

    console.log(req.params.userId, "내가 진행중인 미션 목록을 조회합니다."); // 요청 체크

    const userId:number = Number(req.params.userId);
    const cursor: number = req.query.cursor ? Number(req.query.cursor) : 0; // 커서값이 없으면 0으로 처리 => 커서값 Number로 처리

    const MyMissionList = await myMissionListService(userId,cursor);// 질문: 여기선 dto랑 서비스에서 타입을 검증해서 굳이 타입 검증 안해도 될까요..?

    res.status(StatusCodes.OK).success(
      {
        message: "내가 진행중인 미션 목록을 찾아왔어요!",
        MyMissionList
      }
    )
  } catch (error) {
    next(error);
  }
};




// ======== 6주차 미션 4 ==========
// // 내가 진행 중인 미션을 진행 완료로 바꾸기 PATCH API => Controller

export const handleCompleteMission = async (req:Request, res:Response, next:NextFunction) => {
  /*
    #swagger.summary = '미션 완료 처리 API';
    #swagger.description = '진행 중인 미션을 완료 상태로 변경합니다. 사용자 ID와 미션 로그 ID를 통해 특정 미션을 완료 처리합니다.';
    #swagger.parameters['userId'] = {
      in: 'path',
      description: '사용자 ID',
      required: true,
      type: 'integer'
    };
    #swagger.parameters['missionLogId'] = {
      in: 'path',
      description: '미션 로그 ID',
      required: true,
      type: 'integer'
    };
    #swagger.responses[200] = {
      description: "미션 완료 처리 성공 응답",
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
                  message: { type: "string", example: "미션 완료 처리 완료" },
                  completedMission: {
                    type: "object",
                    properties: {
                      id: { type: "number" },
                      userId: { type: "number" },
                      dinerMissionId: { type: "number" },
                      status: { type: "string", example: "완료" },
                      startedAt: { type: "string", format: "date-time" },
                      completedAt: { type: "string", format: "date-time" }
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
      description: "미션 완료 처리 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "UM003" },
                  reason: { type: "string", example: "진행 중인 미션이 아닙니다" },
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
    console.log(`${req.params.userId} 유저의 ${req.params.missionLogId} 미션을 완료합니다.`)
    console.log(req.body); // 체크용 요청 바디

    const userId:number = Number(req.params.userId);
    const missionLogId:number = Number(req.params.missionLogId);

    const completedMission = await completeMissionService(userId, missionLogId);

    res.status(StatusCodes.OK).success({
      message: "미션 완료 처리 완료" ,
      completedMission
    });
  } 
  catch (error) {
    next(error);
  }
};
