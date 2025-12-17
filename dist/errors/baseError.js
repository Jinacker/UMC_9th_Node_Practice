// 에러를 생성하는 공통 부모 에러
export class AppError extends Error {
    constructor(status, message, errorCode, data) {
        super(message);
        this.status = status;
        this.errorCode = errorCode;
        this.data = data;
        // JS에서 Error 상속할 때 반드시 추가해야 함
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
//# sourceMappingURL=baseError.js.map