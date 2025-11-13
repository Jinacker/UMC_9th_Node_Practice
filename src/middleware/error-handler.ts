// 전역 에러 핸들러 미들웨어

import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import {DuplicateUserEmailError} from '../error.js';


export const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error("Error occurred:");
  console.error("Path:", req.method, req.path);
  console.error("Error:", err.message);
  console.error("Stack:", err.stack);

  // DuplicateUserEmailError 처리 (커스텀에러)
  if (err instanceof DuplicateUserEmailError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      resultType: "FAIL",
      error: {
        errorCode: err.errorCode,
        reason: err.reason,
        data: err.data,
      },
      success: null,
    });
  }

  // 기본 에러 처리
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
