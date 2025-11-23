// dto => 입력 데이터 정형화 및 응답 변환
import * as MissionTypes from "./mission.types.js";
import type { DinerMissionListResponseDTO } from "./mission.types.js";

// 요청용 DTO 변환
export const bodyToAddDinerMission = (
  body: MissionTypes.AddDinerMissionRequest
): MissionTypes.AddDinerMissionRequest => {
  const result: MissionTypes.AddDinerMissionRequest = {
    missionId: Number(body.missionId), // 필수
    startDate: body.startDate, // 필수 (ISO 8601 형식)
  };

  if (body.endDate) {
    result.endDate = body.endDate; // 선택
  }

  return result;
};

// 응답용 DTO 변환
export const responseFromDinerMission = (
  dinerMission: MissionTypes.DinerMissionFromDB
): MissionTypes.DinerMissionResponseDTO => {
  return {
    id: dinerMission.id,
    dinerId: dinerMission.dinerId,
    missionId: dinerMission.missionId,
    startDate: dinerMission.startDate,
    endDate: dinerMission.endDate,
  };
};




// ====== 6주차 미션 2 ======
// ====== 가게 미션 목록 FROM DB → Response DTO ======> flat 하게 펴줌
export const responseFromDinerMissionList = (
  dinerMissionList: MissionTypes.DinerMissionListFromDB
): DinerMissionListResponseDTO => {

  return ({
    dinerMissionId: dinerMissionList.id,
    dinerId: dinerMissionList.dinerId,

    region: dinerMissionList.diner.region.name,
    category: dinerMissionList.diner.category.name,
    name: dinerMissionList.diner.name,
    rating: dinerMissionList.diner.rating ?? 0, // null 일시 기본값 설정

    missionId: dinerMissionList.mission.id,
    title: dinerMissionList.mission.title,
    description: dinerMissionList.mission.description ?? "", // null 일시 기본값 설정
    pointReward: dinerMissionList.mission.pointReward,

    startDate: dinerMissionList.startDate,
    endDate: dinerMissionList.endDate,
  });
};

