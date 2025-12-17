// controller => 요청 출입구
import { StatusCodes } from "http-status-codes"; // HTTP 응답 상태 코드 가져다 쓰기 위한것.
import { bodyToUpdatedUser, bodyToUser } from "./user.dto.js"; // 요청 => dto 변환용
import { userSignUp, userPatch } from "./user.service.js"; // 회원가입 service 로직
export const handleUserSignUp = async (req, res, _next) => {
    console.log("회원가입을 요청했습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용
    /*
      #swagger.summary = '회원 가입 API';
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: { type: "string" },
                name: { type: "string" },
                gender: { type: "string" },
                birth: { type: "string", format: "date" },
                address: { type: "string" },
                detailAddress: { type: "string" },
                phoneNumber: { type: "string" },
                preferences: { type: "array", items: { type: "number" } }
              }
            }
          }
        }
      };
      #swagger.responses[200] = {
        description: "회원 가입 성공 응답",
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
                    email: { type: "string" },
                    name: { type: "string" },
                    preferCategory: { type: "array", items: { type: "string" } }
                  }
                }
              }
            }
          }
        }
      };
      #swagger.responses[400] = {
        description: "회원 가입 실패 응답",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                resultType: { type: "string", example: "FAIL" },
                error: {
                  type: "object",
                  properties: {
                    errorCode: { type: "string", example: "U001" },
                    reason: { type: "string" },
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
    //(여기서 DTO의 bodyToUser를 이용해 요청 데이터 dto로 변환해서 service로 전달)
    const user = await userSignUp(bodyToUser(req.body)); // service의 userSignUp으로 요청 전달 => await으로 동기처리 => 결과 받아오는거 완료 되어야 다음으로 넘어감.
    res.status(StatusCodes.OK).success(user); // userSignUp이 완료되면 => 그때 결과를 res응답을 반환 // => 전역 응답 통일 미들웨어로 전달
};
// ==== 회원 정보 수정 API ====
export const handleUserPatch = async (req, res, next) => {
    /*
    #swagger.summary = '회원정보 수정 API';
    #swagger.description = 'JWT 토큰으로 인증된 사용자가 자신의 회원정보를 수정합니다.';
    #swagger.security = [{
      "bearerAuth": []
    }];
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: { type: "string", example: "김진" },
              gender: { type: "string", example: "M" },
              birth: { type: "string", format: "date", example: "2000-01-01" },
              address: { type: "string", example: "서울시 송파구" },
              detailAddress: { type: "string", example: "101동 1001호" },
              phoneNumber: { type: "string", example: "010-1234-5678" },
              preferences: {
                type: "array",
                items: { type: "number", example: 2 },
                example: [1, 3]
              }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "회원정보 수정 성공 응답",
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
                  userId: { type: "number", example: 1 },
                  name: { type: "string", example: "김진" },
                  gender: { type: "string", example: "M" },
                  birth: { type: "string", example: "2000-01-01" },
                  phoneNumber: { type: "string", example: "010-1234-5678" },
                  preferCategory: {
                    type: "array",
                    items: { type: "string" },
                    example: ["양식", "카페"]
                  }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "회원정보 수정 실패 (잘못된 요청)",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U002" },
                  reason: { type: "string", example: "비밀번호 규칙 위반 또는 잘못된 입력값" },
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
  */
    try {
        console.log("유저 정보 수정을 요청했습니다!");
        // JWT 인증된 사용자 정보에서 userId 추출
        if (!req.user || !('id' in req.user)) {
            return res.status(StatusCodes.UNAUTHORIZED).error({
                errorCode: "AUTH001",
                reason: "인증이 필요합니다.",
                data: {}
            });
        }
        const userId = req.user.id; // JWT 토큰에서 추출한 User ID
        console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용
        const user = await userPatch(userId, bodyToUpdatedUser(req.body)); // DTO 변환 및 Service 로직으로 전달
        res.status(StatusCodes.OK).success(user); // 성공 응답
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=user.controller.js.map