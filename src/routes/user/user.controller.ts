// controller => 요청 출입구

import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes"; // HTTP 응답 상태 코드 가져다 쓰기 위한것.
import { bodyToUser } from "./user.dto.js"; // 요청 => dto 변환용
import { userSignUp } from "./user.service.js"; // 회원가입 service 로직
import { UserSignUpRequest } from "./user.types.js";

export const handleUserSignUp = async (req: Request, res: Response, _next: NextFunction) => {
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
  const user = await userSignUp(bodyToUser(req.body as UserSignUpRequest)); // service의 userSignUp으로 요청 전달 => await으로 동기처리 => 결과 받아오는거 완료 되어야 다음으로 넘어감.
  res.status(StatusCodes.OK).success(user); // userSignUp이 완료되면 => 그때 결과를 res응답을 반환 // => 전역 응답 통일 미들웨어로 전달
};
