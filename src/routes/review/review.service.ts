// service => 실제 비즈니스 로직 실행
import { responseFromReview } from "./review.dto.js";
import { addReviewToDB, getReviewById, checkDinerExists } from "./review.repository.js";
import { AddReviewRequest, ReviewResponseDTO } from "./review.types.js";

export const addReview = async (
  dinerId: number,
  data: AddReviewRequest
): Promise<ReviewResponseDTO> => {
  // 1. 가게 존재 여부 검증
  const dinerExists = await checkDinerExists(dinerId);
  if (!dinerExists) {
    throw new Error(`ID가 ${dinerId}인 가게를 찾을 수 없습니다.`);
  }

  // 2. Repository에 DB 저장 요청
  const reviewId = await addReviewToDB(dinerId, {
    userId: data.userId,
    rating: data.rating,
    content: data.content ?? "", // default 값 설정
  });

  if (!reviewId) {
    throw new Error("리뷰 등록에 실패했습니다.");
  }

  // 3. 방금 등록한 리뷰 데이터 조회
  const review = await getReviewById(reviewId);

  if (!review) {
    throw new Error("등록된 리뷰 정보를 불러올 수 없습니다.");
  }

  // 4. 응답용 DTO 변환 후 반환
  return responseFromReview(review);
};
