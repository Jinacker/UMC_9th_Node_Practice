// service => 실제 비즈니스 로직 실행

import { responseFromMissionClearLog } from "./user-mission.dto.js";
import {
  checkOngoingMission,
  addMissionClearLog,
  getMissionClearLogById,
} from "./user-mission.repository.js";
import { ChallengeMissionRequest, ChallengeMissionResponseDTO } from "./user-mission.types.js";

export const challengeMission = async (
  dinerMissionId: number,
  data: ChallengeMissionRequest
): Promise<ChallengeMissionResponseDTO> => {
  // 1. 이미 도전 중인 미션인지 확인
  const isOngoing = await checkOngoingMission(data.userId, dinerMissionId);

  if (isOngoing) {
    throw new Error("이미 도전 중인 미션입니다.");
  }

  // 2. Repository에 미션 도전 로그 추가
  const logId = await addMissionClearLog(data.userId, dinerMissionId);

  if (!logId) {
    throw new Error("미션 도전 등록에 실패했습니다.");
  }

  // 3. 방금 등록한 미션 도전 로그 조회
  const missionLog = await getMissionClearLogById(logId);

  if (!missionLog) {
    throw new Error("등록된 미션 도전 정보를 불러올 수 없습니다.");
  }

  // 4. 응답용 DTO 변환 후 반환
  return responseFromMissionClearLog(missionLog);
};
