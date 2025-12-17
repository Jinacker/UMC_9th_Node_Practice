// Diner 도메인 커스텀 에러들
import { AppError } from "./baseError.js";
// D001 - 식당 등록 실패
export class CantRegisterDinerError extends AppError {
    constructor(data = null) {
        super(400, "식당 등록에 실패했습니다.", "D001", data);
    }
}
// D002 - 식당 정보를 찾을 수 없음
export class DinerNotFoundError extends AppError {
    constructor(data = null) {
        super(404, "식당 정보를 찾을 수 없습니다.", "D002", data);
    }
}
//# sourceMappingURL=dinerError.js.map