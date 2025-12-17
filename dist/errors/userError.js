// 유저 도메인 커스텀 에러들
import { AppError } from "./baseError.js";
// U001 - 이메일 중복
export class DuplicateUserEmailError extends AppError {
    constructor(data = null) {
        super(400, "이미 존재하는 이메일입니다.", "U001", data);
    }
}
// U002 - 사용자를 찾을 수 없음
export class UserNotFoundError extends AppError {
    constructor(data = null) {
        super(404, "사용자를 찾을 수 없습니다.", "U002", data);
    }
}
//# sourceMappingURL=userError.js.map