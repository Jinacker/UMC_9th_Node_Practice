// 전역 에러 핸들러 미들웨어

import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import {DuplicateUserEmailError} from '../errors/error.js';


export const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error("Error occurred:");
  console.error("Path:", req.method, req.path);
  console.error("Error:", err.message);
  console.error("Stack:", err.stack);

// 커스텀 에러 처리
  if (err instanceof AppError) {
    return res.status(err.status).json({
      resultType: "FAIL",
      error: {
        errorCode: err.errorCode,
        reason: err.message,
        data: err.data,
      },
    });
  }


  // 기본 에러 처리 => 이것도 전역 응답 Wrapper랑 비슷하게 구성 수정
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    resultType: "FAIL",
    error: {
      errorCode: "INTERNAL_SERVER_ERROR",
      reason: err.message || "서버 내부 오류가 발생했습니다.",
      data: null,
    },
    success: null,
  });
};
