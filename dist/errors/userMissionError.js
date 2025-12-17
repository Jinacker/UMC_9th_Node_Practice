// 유저 도메인 커스텀 에러들
import { AppError } from "./baseError.js";
// C001 - 이미 도전중인 미션
export class AlreadyChallengeError extends AppError {
    constructor(data = null) {
        super(409, "이미 도전중인 미션입니다.", "C001", data);
    }
}
// C002 - 미션 도전 실패
export class FailedChallengeError extends AppError {
    constructor(data = null) {
        super(400, "미션 도전에 실패했습니다.", "C002", data);
    }
}
// C003 - 미션 도전 로그 불러오기 실패
export class FailedLoadChallengeLog extends AppError {
    constructor(data = null) {
        super(400, "미션 도전 로그 불러오기를 실패했습니다.", "C003", data);
    }
}
// C004 - 해당 유저의 미션이 아님
export class NotYourMissionError extends AppError {
    constructor(data = null) {
        super(403, "미션 도전 로그 불러오기를 실패했습니다.", "C004", data);
    }
}
// C005 - 도전하지 않은 미션
export class NotChallengedMissionError extends AppError {
    constructor(data = null) {
        super(404, "도전하지 않은 미션입니다.", "C005", data);
    }
}
//# sourceMappingURL=userMissionError.js.map