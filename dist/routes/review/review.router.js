// Review 도메인 라우터
import { Router } from "express";
import passport from "passport";
import { handleAddReview, handleListDinerReviews, handleListUserReviews } from "./review.controller.js";
const reviewRouter = Router();
// JWT 인증 미들웨어
const isLogin = passport.authenticate('jwt', { session: false });
// 리뷰 작성 - POST /api/v1/reviews/diners/:dinerId (인증 필요)
reviewRouter.post("/diners/:dinerId", isLogin, handleAddReview);
// 해당 가게의 모든 리뷰를 GET 하는 API
reviewRouter.get("/diners/:dinerId", handleListDinerReviews);
// ==== 6주차 과제 1번 =====
// 내가 작성한 리뷰 목록 GET 하는 API (인증 필요)
// JWT 토큰에서 userId를 추출하여 사용
reviewRouter.get("/my-reviews", isLogin, handleListUserReviews);
export default reviewRouter;
//# sourceMappingURL=review.router.js.map