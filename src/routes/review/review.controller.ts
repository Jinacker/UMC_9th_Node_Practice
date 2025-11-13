// controller => 요청 출입구

import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToAddReview } from "./review.dto.js"; // 요청 DTO 변환
import { addReview,listDinerReviews, listUserReviews } from "./review.service.js"; // Service 로직
import { AddReviewRequest } from "./review.types.js";

// ===== Request 예시 =====
// POST /api/v1/reviews/diners/3
// {
//   "userId": 1,
//   "rating": 5,
//   "content": "정말 맛있어요!"
// }

export const handleAddReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("리뷰 작성을 요청했습니다!");
    const dinerId = Number(req.params.dinerId);
    console.log("body:", req.body);

    // 요청 데이터 DTO 변환
    const reviewData = bodyToAddReview(req.body as AddReviewRequest);

    // 실제 DB 로직 수행 (service)
    const review = await addReview(dinerId, reviewData);

    // 성공 응답
    res.status(StatusCodes.CREATED).success(review); // 전역 응답 Wrapper 전달
  } catch (error) {
    next(error); // 에러 핸들러로 위임
  }
};

// ===== Response 예시 =====
// {
//   "result": {
//     "id": 1,
//     "dinerId": 3,
//     "userId": 1,
//     "rating": 5,
//     "content": "정말 맛있어요!",
//     "createdAt": "2025-11-02T12:00:00.000Z",
//     "updatedAt": "2025-11-02T12:00:00.000Z"
//   }
// }


//// 해당 가게의 모든 리뷰를 작성하는 API
export const handleListDinerReviews = async (req: Request, res: Response, next: NextFunction) => {
  try{
  const dinerId = Number(req.params.dinerId);
  const cursor: number = req.query.cursor ? Number(req.query.cursor) : 0; // 커서값 없으면 0

  const reviews = await listDinerReviews(
        dinerId, cursor
  );
  res.status(StatusCodes.OK).success(reviews);
} catch(error){
  next(error);
}
};

// ===== 6주차 과제 1번 controller =====
// 내가 작성한 리뷰 목록 GET

export const handleListUserReviews = async (req:Request, res: Response, next: NextFunction) => {
  try{
  console.log("내가 작성한 리뷰 목록을 조회합니다!");
  const userId = Number(req.params.userId);
  console.log(req.body, userId); // 요청 잘들어갔나 확인용 => GET 요청이라 req.body는 undefined로 들어간다.
  const cursor: number = req.query.cursor ? Number(req.query.cursor) : 0; // 커서값이 없으면 0으로 처리 => 커서값 Number로 처리


  const reviewList = await listUserReviews(userId, cursor);

  res.status(StatusCodes.OK).success({ // 성공시 
    message: "내가 작성한 리뷰 목록 조회 성공",
    reviewList});
} catch (error) { // 실패시
  next(error);
}
};