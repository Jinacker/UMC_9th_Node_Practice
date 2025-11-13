// controller => 요청 출입구

import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToChallengeMission } from "./user-mission.dto.js";
import { challengeMission, myMissionListService, completeMissionService } from "./user-mission.service.js";
import { ChallengeMissionRequest } from "./user-mission.types.js";

// ===== Request 예시 =====
// POST /api/v1/user-missions/1/challenge
// {
//   "userId": 1
// }

export const handleChallengeMission = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("미션 도전을 요청했습니다!");
    const dinerMissionId = Number(req.params.dinerMissionId);
    console.log("body:", req.body);

    // 요청 데이터 DTO 변환
    const missionData = bodyToChallengeMission(req.body as ChallengeMissionRequest);

    // 실제 DB 로직 수행 (service)
    const missionLog = await challengeMission(dinerMissionId, missionData);

    // 성공 응답
    res.status(StatusCodes.CREATED).success(missionLog);
  } catch (error) {
    next(error); // 에러 핸들러로 위임
  }
};

// ===== Response 예시 =====
// {
//   "result": {
//     "id": 1,
//     "userId": 1,
//     "dinerMissionId": 1,
//     "status": "진행중",
//     "startedAt": "2025-11-03T00:00:00.000Z"
//   }
// }

/// ======= 6주차 미션 3 ========
// 내가 진행중인 미션 목록 => controller

export const handleMyMissionList = async (req:Request, res:Response, next: NextFunction) => {
  try {

    console.log(req.params.userId, "내가 진행중인 미션 목록을 조회합니다."); // 요청 체크

    const userId:number = Number(req.params.userId);
    const cursor: number = req.query.cursor ? Number(req.query.cursor) : 0; // 커서값이 없으면 0으로 처리 => 커서값 Number로 처리

    const MyMissionList = await myMissionListService(userId,cursor);// 질문: 여기선 dto랑 서비스에서 타입을 검증해서 굳이 타입 검증 안해도 될까요..?

    res.status(StatusCodes.OK).success(
      {
        message: "내가 진행중인 미션 목록을 찾아왔어요!",
        MyMissionList
      }
    )
  } catch (error) {
    next(error);
  }
};




// ======== 6주차 미션 4 ==========
// // 내가 진행 중인 미션을 진행 완료로 바꾸기 PATCH API => Controller

export const handleCompleteMission = async (req:Request, res:Response, next:NextFunction) => {
  try {
    console.log(`${req.params.userId} 유저의 ${req.params.missionLogId} 미션을 완료합니다.`)
    console.log(req.body); // 체크용 요청 바디

    const userId:number = Number(req.params.userId);
    const missionLogId:number = Number(req.params.missionLogId);

    const completedMission = await completeMissionService(userId, missionLogId);

    res.status(StatusCodes.OK).success({
      message: "미션 완료 처리 완료" ,
      completedMission
    });
  } 
  catch (error) {
    next(error);
  }
};
