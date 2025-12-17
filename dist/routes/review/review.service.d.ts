import { AddReviewRequest, ReviewResponseDTO } from "./review.types.js";
export declare const addReview: (dinerId: number, userId: number, data: AddReviewRequest) => Promise<ReviewResponseDTO>;
export declare const listDinerReviews: (dinerId: number, cursor: number) => Promise<ReviewResponseDTO[]>;
export declare const listUserReviews: (userId: number, cursor: number) => Promise<ReviewResponseDTO[]>;
//# sourceMappingURL=review.service.d.ts.map