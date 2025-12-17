// controller => 요청 출입구

import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToAddReview } from "./review.dto.js"; // 요청 DTO 변환
import { addReview,listDinerReviews, listUserReviews } from "./review.service.js"; // Service 로직
import { AddReviewRequest } from "./review.types.js";

// ===== Request 예시 =====
// POST /api/v1/reviews/diners/3
// Authorization: Bearer <JWT_TOKEN>
// {
//   "rating": 5,
//   "content": "정말 맛있어요!"
// }

export const handleAddReview = async (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.summary = '리뷰 작성 API';
    #swagger.description = '특정 가게에 대한 리뷰를 작성합니다. JWT 토큰으로 인증된 사용자만 사용할 수 있으며, 평점(1-5)과 리뷰 내용을 포함하여 요청합니다.';
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
              rating: { type: "number", description: "평점 (1-5)", minimum: 1, maximum: 5 },
              content: { type: "string", description: "리뷰 내용" }
            },
            required: ["rating", "content"]
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "리뷰 작성 성공 응답",
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
                  dinerId: { type: "number", example: 3 },
                  userId: { type: "number", example: 1 },
                  rating: { type: "number", example: 5 },
                  content: { type: "string", example: "정말 맛있어요!" },
                  createdAt: { type: "string", format: "date-time" }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "리뷰 작성 실패 응답 (잘못된 요청)",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "R001" },
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
  try {
    console.log("리뷰 작성을 요청했습니다!");

    // JWT 인증된 사용자 정보에서 userId 추출
    if (!req.user || !('id' in req.user)) {
      return res.status(StatusCodes.UNAUTHORIZED).error({
        errorCode: "AUTH001",
        reason: "인증이 필요합니다.",
        data: {}
      });
    }

    const userId = (req.user as any).id;
    const dinerId = Number(req.params.dinerId);
    console.log("body:", req.body);

    // 요청 데이터 DTO 변환
    const reviewData = bodyToAddReview(req.body as AddReviewRequest);

    // 실제 DB 로직 수행 (service)
    const review = await addReview(dinerId, userId, reviewData);

    // 성공 응답
    res.status(StatusCodes.CREATED).success(review); // 전역 응답 Wrapper 전달
  } catch (error) {
    next(error); // 에러 핸들러로 위임
  }
};

// ===== Response 예시 =====
// {
//   "resultType": "SUCCESS",
//   "error": null,
//   "success": {
//     "id": 1,
//     "dinerId": 3,
//     "userId": 1,
//     "rating": 5,
//     "content": "정말 맛있어요!",
//     "createdAt": "2025-11-02T12:00:00.000Z",
//     "updatedAt": "2025-11-02T12:00:00.000Z"
//   }
// }


//// 해당 가게의 모든 리뷰를 작성하는 API
export const handleListDinerReviews = async (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.summary = '가게 리뷰 목록 조회 API';
    #swagger.description = '특정 가게에 작성된 모든 리뷰를 조회합니다. 커서 기반 페이지네이션을 지원하여 리뷰 목록을 나눠서 가져올 수 있습니다.';
    #swagger.parameters['dinerId'] = {
      in: 'path',
      description: '가게 ID',
      required: true,
      type: 'integer'
    };
    #swagger.parameters['cursor'] = {
      in: 'query',
      description: '페이지네이션 커서 (마지막 리뷰 ID)',
      required: false,
      type: 'integer',
      example: 0
    };
    #swagger.responses[200] = {
      description: "상점 리뷰 목록 조회 성공 응답",
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
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        store: { type: "object", properties: { id: { type: "number" }, name: { type: "string" } } },
                        user: { type: "object", properties: { id: { type: "number" }, email: { type: "string" }, name: { type: "string" } } },
                        content: { type: "string" }
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
    };
    #swagger.responses[400] = {
      description: "리뷰 목록 조회 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "R002" },
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
  const dinerId = Number(req.params.dinerId);
  const cursor: number = req.query.cursor ? Number(req.query.cursor) : 0; // 커서값 없으면 0

  const reviews = await listDinerReviews(
        dinerId, cursor
  );
  res.status(StatusCodes.OK).success(reviews);
} catch(error){
  next(error);
}
};

// ===== 6주차 과제 1번 controller =====
// 내가 작성한 리뷰 목록 GET

export const handleListUserReviews = async (req:Request, res: Response, next: NextFunction) => {
  /*
    #swagger.summary = '내 리뷰 목록 조회 API';
    #swagger.description = 'JWT 토큰으로 인증된 사용자가 작성한 모든 리뷰를 조회합니다. 커서 기반 페이지네이션을 지원하여 리뷰 목록을 나눠서 가져올 수 있습니다.';
    #swagger.security = [{
      "bearerAuth": []
    }];
    #swagger.parameters['cursor'] = {
      in: 'query',
      description: '페이지네이션 커서 (마지막 리뷰 ID)',
      required: false,
      type: 'integer',
      example: 0
    };
    #swagger.responses[200] = {
      description: "사용자 리뷰 목록 조회 성공 응답",
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
                  message: { type: "string", example: "내가 작성한 리뷰 목록 조회 성공" },
                  reviewList: {
                    type: "object",
                    properties: {
                      data: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: { type: "number" },
                            store: { type: "object", properties: { id: { type: "number" }, name: { type: "string" } } },
                            user: { type: "object", properties: { id: { type: "number" }, email: { type: "string" }, name: { type: "string" } } },
                            content: { type: "string" },
                            rating: { type: "number" },
                            createdAt: { type: "string", format: "date-time" }
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
      description: "사용자 리뷰 목록 조회 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "R003" },
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
  try{
  console.log("내가 작성한 리뷰 목록을 조회합니다!");

  // JWT 인증된 사용자 정보에서 userId 추출
  if (!req.user || !('id' in req.user)) {
    return res.status(StatusCodes.UNAUTHORIZED).error({
      errorCode: "AUTH001",
      reason: "인증이 필요합니다.",
      data: {}
    });
  }

  const userId = (req.user as any).id;
  const cursor: number = req.query.cursor ? Number(req.query.cursor) : 0; // 커서값이 없으면 0으로 처리 => 커서값 Number로 처리


  const reviewList = await listUserReviews(userId, cursor);

  res.status(StatusCodes.OK).success({ // 성공시
    message: "내가 작성한 리뷰 목록 조회 성공",
    reviewList});
} catch (error) { // 실패시
  next(error);
}
};