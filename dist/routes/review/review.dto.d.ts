import * as ReviewTypes from "./review.types.js";
export declare const bodyToAddReview: (body: ReviewTypes.AddReviewRequest) => ReviewTypes.AddReviewRequest;
export declare const responseFromReview: (review: ReviewTypes.ReviewFromDB) => ReviewTypes.ReviewResponseDTO;
export declare const responseFromReviews: (reviews: ReviewTypes.ReviewFromDB[]) => {
    data: ReviewTypes.ReviewFromDB[];
    pagination: {
        cursor: number | null;
    };
};
//# sourceMappingURL=review.dto.d.ts.map