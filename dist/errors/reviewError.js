// 리뷰 도메인 커스텀 에러들
import { AppError } from "./baseError.js";
// R001 - 리뷰 등록 실패
export class ReviewAddFailedError extends AppError {
    constructor(data = null) {
        super(400, "리뷰 등록에 실패했습니다.", "R001", data);
    }
}
// R002 - 리뷰 불러오기 실패
export class ReviewLoadFailedError extends AppError {
    constructor(data = null) {
        super(400, "리뷰 불러오기를 실패했습니다.", "R002", data);
    }
}
//# sourceMappingURL=reviewError.js.map