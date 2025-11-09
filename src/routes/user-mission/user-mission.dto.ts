// dto => 입력 데이터 정형화 및 응답 변환
import * as UserMissionTypes from "./user-mission.types.js";

// 요청용 DTO 변환
export const bodyToChallengeMission = (
  body: UserMissionTypes.ChallengeMissionRequest
): UserMissionTypes.ChallengeMissionRequest => {
  return {
    userId: Number(body.userId), // 필수
  };
};

// 응답용 DTO 변환
export const responseFromMissionClearLog = (
  log: UserMissionTypes.MissionClearLogFromDB
): UserMissionTypes.ChallengeMissionResponseDTO => {
  return {
    id: log.id,
    userId: log.userId,
    dinerMissionId: log.dinerMissionId,
    status: log.status,
    startedAt: log.startedAt,
  };
};



// ======= 6주차 미션 3 =======
//// === 내 현재 진행중 미션 목록 DTO ===
// DB => 응답용 DTO 변환
export const responseFromMyMissionList = (
  log: UserMissionTypes.MissionClearLogFromDB): UserMissionTypes.myMissionResponseDTO => {
  return {
    id: log.id,
    userId: log.userId,
    dinerMissionId: log.dinerMissionId,
    status: log.status,
    startedAt: log.startedAt,

    // diner
    regionId: log.dinerMission.diner.regionId,
    name: log.dinerMission.diner.name,
    foodCategoryId: log.dinerMission.diner.categoryId,
    address: log.dinerMission.diner.address,
    phoneNumber: log.dinerMission.diner.phoneNumber,
    rating: log.dinerMission.diner.rating,

    // mission + dinerMission extra
    dinerId: log.dinerMission.dinerId ?? log.dinerMission.diner.id,
    region: log.dinerMission.diner.region.name, 
    category: log.dinerMission.diner.category.name, 

    missionId: log.dinerMission.mission.id,
    title: log.dinerMission.mission.title,
    description: log.dinerMission.mission.description,
    pointReward: log.dinerMission.mission.pointReward,
  };
};


// ====== 6주차 미션 4 ========
// 진행중인 미션을 성공으로 Patch 하는 API

// 응답용 DTO 변환 => 미션 내용이랑 포인트 나오게 ㄱㄱ  => API마다 DTO를 새로 만드는게 맞는것인가..
export const responseForClearLog = (log: UserMissionTypes.ClearedLogFromDB): UserMissionTypes.ChallengeMissionResponseDTO => {
  return {
    id: log.id,
    userId: log.userId,
    pointHistoryId: log.pointHistoryId,
    dinerMissionId: log.dinerMissionId,
    status: log.status,
    startedAt: log.startedAt,
    completedAt: log.completedAt,
  };
};