// dto => 입력 데이터 정형화 및 응답 변환
import * as MissionTypes from "./mission.types.js";

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
    dinerId: dinerMission.diner_id,
    missionId: dinerMission.mission_id,
    startDate: dinerMission.start_date,
    endDate: dinerMission.end_date,
  };
};
