// Review 도메인 라우터

import { Router } from "express";
import { handleAddReview, handleListDinerReviews, handleListUserReviews } from "./review.controller.js";

const reviewRouter = Router();

// 리뷰 작성 - POST /api/v1/reviews/diners/:dinerId
reviewRouter.post("/diners/:dinerId", handleAddReview);


// 해당 가게의 모든 리뷰를 GET 하는 API
reviewRouter.get("/diners/:dinerId", handleListDinerReviews );

// ==== 6주차 과제 1번 =====
// 내가 작성한 리뷰 목록 GET 하는 API 
// => userId를 url param으로 노출하면 보안이 안좋아서 로그인 한 뒤, session이나 토큰에서 userId를 꺼내서 줘야한다.
// 하지만 로그인이 인증인가가 구현 안되어있으니 이대로 하겠다.
reviewRouter.get("/users/:userId", handleListUserReviews );


export default reviewRouter;
