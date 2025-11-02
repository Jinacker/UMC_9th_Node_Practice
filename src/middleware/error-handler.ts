// 전역 에러 핸들러 미들웨어

import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

//전역 에러 핸들러
// - 모든 라우트에서 발생한 에러를 캐치하여 처리
// Express의 에러 핸들링 미들웨어는 반드시 4개의 파라미터를 가져야 함 (err, req, res, next) => 아니면 그냥 일반 미들웨어로 판단한다고함.
export const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  // 에러 로그 출력 (개발 환경에서 디버깅용)
  console.error("Error occurred:");
  console.error("Path:", req.method, req.path);
  console.error("Error:", err.message);
  console.error("Stack:", err.stack);

  // 클라이언트에게 에러 응답 전송
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: "error",
    message: err.message || "서버 내부 오류가 발생했습니다.",
  });
};
