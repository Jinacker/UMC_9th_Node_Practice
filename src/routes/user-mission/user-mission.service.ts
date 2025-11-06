// service => 실제 비즈니스 로직 실행

import { responseFromMissionClearLog,responseFromMyMissionList } from "./user-mission.dto.js";
import {
  checkOngoingMission,
  addMissionClearLog,
  getMissionClearLogById,
  getMyMissionListRepo
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


/// ====== 6주차 미션 3 =======
// 내가 진행중인 미션 목록 조회 => service

export const myMissionListService = async (userId:number, cursor:number) => { // 리턴타입은 맨 마지막에 추가하는게 좋을까요..?
  
  // 내 진행중인 미션 목록 조회
  const MyMissionList = await getMyMissionListRepo(userId, cursor);

  return MyMissionList.map(responseFromMyMissionList); // 배열로 받아오니 dto에 map으로 매핑해줌

};