// service => 실제 비즈니스 로직 실행
import { DinerNotFoundError } from "../../errors/dinerError.js";
import { ReviewAddFailedError, ReviewLoadFailedError } from "../../errors/reviewError.js";
import { responseFromReview } from "./review.dto.js";
import { addReviewToDB, getReviewById, checkDinerExists, getAllDinerReviews, getAllMyReviews } from "./review.repository.js";
import { AddReviewRequest, ReviewResponseDTO } from "./review.types.js";

export const addReview = async (
  dinerId: number,
  userId: number,
  data: AddReviewRequest
): Promise<ReviewResponseDTO> => {
  // 1. 가게 존재 여부 검증
  const dinerExists = await checkDinerExists(dinerId);
  if (!dinerExists) {
    throw new DinerNotFoundError(`ID가 ${dinerId}인 가게를 찾을 수 없습니다.`);
  }

  // 2. Repository에 DB 저장 요청
  const addedReview = await addReviewToDB(dinerId, {
    userId: userId,
    rating: data.rating,
    content: data.content ?? "", // default 값 설정
  });

  if (!addedReview) {
    throw new ReviewAddFailedError("리뷰 등록에 실패했습니다.");
  }

  // 3. 방금 등록한 리뷰 데이터 조회
  const review = await getReviewById(addedReview.id);

  if (!review) {
    throw new ReviewLoadFailedError("등록된 리뷰 정보를 불러올 수 없습니다.");
  }

  // 4. 응답용 DTO 변환 후 반환
  return responseFromReview(review);
};

/////// 해당 가게의 모든 리뷰 조회 API Service
export const listDinerReviews = async (dinerId: number, cursor:number) => {
  const reviews = await getAllDinerReviews(dinerId,cursor);
return reviews.map(responseFromReview); // 리뷰가 배열로 오니 각각 다 => ResponseFromReview에 매핑해서 결과 반환
};


// ===== 6주차 과제 1번 =====
// 내가 작성한 리뷰들 GET 하는 Service
export const listUserReviews = async(userId:number, cursor: number) => {
  const myReviews = await getAllMyReviews(userId,cursor);

  if (!myReviews) {
    throw new ReviewLoadFailedError("내 리뷰 작성 목록 불러오기를 실패했습니다."); // controller로 에러를 throw해줌.
  }

  return myReviews.map(responseFromReview); // Repository에서 받아온 리뷰 배열 => DTO에 map으로 각각 파싱

};