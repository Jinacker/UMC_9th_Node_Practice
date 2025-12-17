import { AppError } from "./baseError.js";
export declare class BadRequestError extends AppError {
    constructor(message?: string, data?: any);
}
export declare class UnauthorizedError extends AppError {
    constructor(message?: string, data?: any);
}
export declare class ForbiddenError extends AppError {
    constructor(message?: string, data?: any);
}
export declare class NotFoundError extends AppError {
    constructor(message?: string, data?: any);
}
export declare class ConflictError extends AppError {
    constructor(message?: string, data?: any);
}
export declare class InternalServerError extends AppError {
    constructor(message?: string, data?: any);
}
//# sourceMappingURL=commonError.d.ts.map