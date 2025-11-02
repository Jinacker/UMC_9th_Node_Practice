// controller => 요청 출입구

import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes"; // HTTP 응답 상태 코드 가져다 쓰기 위한것.
import { bodyToUser } from "../dtos/user.dto.js"; // 요청 => dto 변환용
import { userSignUp } from "../services/user.service.js"; // 회원가입 service 로직
import { UserSignUpRequest } from "../types/user.types.js";

export const handleUserSignUp = async (req: Request, res: Response, _next: NextFunction) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  //(여기서 DTO의 bodyToUser를 이용해 요청 데이터 dto로 변환해서 service로 전달)
  const user = await userSignUp(bodyToUser(req.body as UserSignUpRequest)); // service의 userSignUp으로 요청 전달 => await으로 동기처리 => 결과 받아오는거 완료 되어야 다음으로 넘어감.
  res.status(StatusCodes.OK).json({ result: user }); // userSignUp이 완료되면 => 그때 결과를 res응답을 반환
};
