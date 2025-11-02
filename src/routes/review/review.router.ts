// Review 도메인 라우터

import { Router } from "express";
import { handleAddReview } from "./review.controller.js";

const reviewRouter = Router();

// 리뷰 작성 - POST /api/v1/reviews/diners/:dinerId
reviewRouter.post("/diners/:dinerId", handleAddReview);

export default reviewRouter;
