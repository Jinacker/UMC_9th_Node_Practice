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
    userId: log.user_id,
    dinerMissionId: log.diner_mission_id,
    status: log.status,
    startedAt: log.started_at,
  };
};
