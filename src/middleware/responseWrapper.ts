// src/middlewares/responseHandler.ts
import { Request, Response, NextFunction } from "express";

// 전역 응답 통일용 미들웨어
export const responseWrapper = (req: Request, res: Response, next: NextFunction) => {
  res.success = (success) => {
    return res.json({
      resultType: "SUCCESS",
      error: null,
      success,
    });
  };

  res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
    return res.json({
      resultType: "FAIL",
      error: { errorCode, reason, data },
      success: null,
    });
  };

  next();
};
