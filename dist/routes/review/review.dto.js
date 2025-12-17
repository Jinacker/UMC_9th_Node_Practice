// 요청용 DTO 변환
export const bodyToAddReview = (body) => {
    return {
        rating: Number(body.rating), // 필수 (1~5)
        content: body.content?.trim() || "", // 선택 (공백 제거)
    };
};
// 응답용 DTO 변환
export const responseFromReview = (review) => {
    return {
        id: review.id,
        dinerId: review.dinerId,
        userId: review.userId,
        rating: review.rating,
        content: review.content,
        createdAt: review.createdAt,
        updatedAt: review.updatedAt,
    };
};
// 리뷰 목록 반환용 DTO
export const responseFromReviews = (reviews) => {
    return {
        data: reviews,
        pagination: {
            cursor: reviews.at(-1)?.id ?? null,
        },
    };
};
//# sourceMappingURL=review.dto.js.map