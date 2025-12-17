// Mission 도메인 커스텀 에러들
import { AppError } from "./baseError.js";
// M001 - 미션을 찾을 수 없음
export class MissionNotFoundError extends AppError {
    constructor(data = null) {
        super(404, "해당 미션을 찾을 수 없습니다.", "M001", data);
    }
}
// M002 - 해당 가게에 미션 등록 실패
export class CantRegisterMissionError extends AppError {
    constructor(data = null) {
        super(400, "해당 가게에 미션 등록을 실패했습니다.", "M002", data);
    }
}
// M003 - 등록된 가게 미션 정보를 불러올 수 없습니다.
export class CantFindDinerMissionError extends AppError {
    constructor(data = null) {
        super(404, "등록된 가게의 미션 정보를 불러올 수 없습니다.", "M003", data);
    }
}
//# sourceMappingURL=missionError.js.map