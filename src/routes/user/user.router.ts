// User 도메인 라우터

import { Router } from "express";
import { handleUserSignUp } from "./user.controller.js";

const userRouter = Router();

// 회원가입
userRouter.post("/signup", handleUserSignUp);

export default userRouter;

// ===== Request 예시 =====
// POST /api/v1/diners/regions/3 => region_id는 3
// {
//   "name": "홍콩반점",
//   "foodCategoryId": 1,
//   "address": "서울",
//   "phoneNumber": "02-123-4567",
//   "rating": 0, // 프론트에서 default 0 넣어줌
// }
