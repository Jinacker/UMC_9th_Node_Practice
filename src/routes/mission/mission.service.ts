// service => 실제 비즈니스 로직 실행
import { DinerNotFoundError } from "../../errors/dinerError.js";
import { CantFindDinerMissionError, CantRegisterMissionError, MissionNotFoundError } from "../../errors/missionError.js";
import { responseFromDinerMission, responseFromDinerMissionList } from "./mission.dto.js";
import {
  addDinerMissionToDB,
  getDinerMissionById,
  checkDinerExists,
  checkMissionExists,
  getAllDinerMissions,
} from "./mission.repository.js";
import { AddDinerMissionRequest, DinerMissionResponseDTO,DinerMissionListResponseDTO } from "./mission.types.js";

export const addDinerMission = async (
  dinerId: number,
  data: AddDinerMissionRequest
): Promise<DinerMissionResponseDTO> => {
  // 1. 가게 존재 여부 검증
  const dinerExists = await checkDinerExists(dinerId);
  if (!dinerExists) {
    throw new DinerNotFoundError(`ID가 ${dinerId}인 가게를 찾을 수 없습니다.`);
  }

  // 2. 미션 존재 여부 검증
  const missionExists = await checkMissionExists(data.missionId);
  if (!missionExists) {
    throw new MissionNotFoundError(`ID가 ${data.missionId}인 미션을 찾을 수 없습니다.`);
  }

  // 3. Repository에 DB 저장 요청
  const requestData: {
    missionId: number;
    startDate: string;
    endDate?: string;
  } = {
    missionId: data.missionId,
    startDate: data.startDate,
  };

  if (data.endDate) {
    requestData.endDate = data.endDate;
  }

  const dinerMissionId = await addDinerMissionToDB(dinerId, requestData);

  if (!dinerMissionId) {
    throw new CantRegisterMissionError("가게 미션 등록에 실패했습니다.");
  }

  // 4. 방금 등록한 가게 미션 데이터 조회
  const dinerMission = await getDinerMissionById(dinerMissionId);

  if (!dinerMission) {
    throw new CantFindDinerMissionError("등록된 가게 미션 정보를 불러올 수 없습니다.");
  }

  // 5. 응답용 DTO 변환 후 반환
  return responseFromDinerMission(dinerMission);
};


////////

// ====== 6주차 미션 2 =======
// 해당 가게의 미션 목록 조회 API Service

export const listDinerMission = async (dinerId: number, cursor: number): Promise<DinerMissionListResponseDTO[]> => { // Response 배열 반환 타입 설정

  // 1. 가게 존재 여부 검증
  const dinerExists = await checkDinerExists(dinerId);
  if (!dinerExists) {
    throw new DinerNotFoundError(`ID가 ${dinerId}인 가게를 찾을 수 없습니다.`);
  }

  // 2. 해당 가게의 미션 목록 조회
  const dinerMissionList = await getAllDinerMissions(dinerId, cursor);

  return dinerMissionList.map(responseFromDinerMissionList); // 배열이므로 dto에 매핑 ㄱㄱ 
};

