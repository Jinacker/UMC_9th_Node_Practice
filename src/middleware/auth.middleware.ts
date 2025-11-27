import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

// ADMIN 권한 체크 미들웨어
// JWT 인증 후 사용자 role이 ADMIN인지 확인
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    // 1. JWT 인증 확인 (passport.authenticate('jwt')가 먼저 실행되어야 함)
    if (!req.user || !('role' in req.user)) {
      return res.status(StatusCodes.UNAUTHORIZED).error({
        errorCode: "AUTH001",
        reason: "인증이 필요합니다.",
        data: {}
      });
    }

    // 2. ADMIN 권한 확인
    const userRole = (req.user as any).role;
    if (userRole !== 'ADMIN') {
      return res.status(StatusCodes.FORBIDDEN).error({
        errorCode: "AUTH002",
        reason: "관리자 권한이 필요합니다.",
        data: { requiredRole: 'ADMIN', currentRole: userRole }
      });
    }

    // 3. ADMIN 권한 확인 완료
    next();
  } catch (error) {
    next(error);
  }
};
