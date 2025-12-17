// 자주 생기는 에러 모음
import { AppError } from "./baseError.js";
// 400 - 잘못된 요청
export class BadRequestError extends AppError {
    constructor(message = "잘못된 요청입니다.", data = null) {
        super(400, message, "BAD_REQUEST", data);
    }
}
// 401 - 인증 필요
export class UnauthorizedError extends AppError {
    constructor(message = "인증이 필요합니다.", data = null) {
        super(401, message, "UNAUTHORIZED", data);
    }
}
// 403 - 접근 권한 없음
export class ForbiddenError extends AppError {
    constructor(message = "접근 권한이 없습니다.", data = null) {
        super(403, message, "FORBIDDEN", data);
    }
}
// 404 - 리소스 없음
export class NotFoundError extends AppError {
    constructor(message = "리소스를 찾을 수 없습니다.", data = null) {
        super(404, message, "NOT_FOUND", data);
    }
}
// 409 - 중복/충돌
export class ConflictError extends AppError {
    constructor(message = "리소스가 이미 존재합니다.", data = null) {
        super(409, message, "CONFLICT", data);
    }
}
// 500 - 서버 내부 오류
export class InternalServerError extends AppError {
    constructor(message = "서버 내부 오류가 발생했습니다.", data = null) {
        super(500, message, "INTERNAL_SERVER_ERROR", data);
    }
}
//# sourceMappingURL=commonError.js.map