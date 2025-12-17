// dto => 입력 데이터 정형화 및 응답 변환
import * as ReviewTypes from "./review.types.js";

// 요청용 DTO 변환
export const bodyToAddReview = (
  body: ReviewTypes.AddReviewRequest
): ReviewTypes.AddReviewRequest => {
  return {
    rating: Number(body.rating), // 필수 (1~5)
    content: body.content?.trim() || "", // 선택 (공백 제거)
  };
};

// 응답용 DTO 변환
export const responseFromReview = (
  review: ReviewTypes.ReviewFromDB
): ReviewTypes.ReviewResponseDTO => {
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
export const responseFromReviews = (reviews: ReviewTypes.ReviewFromDB[]) => { // 리뷰의 배열로 타입 선언
  return {
    data: reviews,
    pagination: {
      cursor: reviews.at(-1)?.id ?? null,
    },
  };
};