// Mission 관련 타입 정의

// 요청 바디 타입 (Request Body) 겸 요청 DTO
export interface AddDinerMissionRequest {
  missionId: number; // 추가할 미션 ID
  startDate: string; // 미션 시작일 (ISO 8601 형식)
  endDate?: string; // 미션 종료일 (선택, ISO 8601 형식)
}

// DB에서 가져온 가게 미션 데이터 (Repository)
export interface DinerMissionFromDB {
  id: number;
  diner_id: number;
  mission_id: number;
  start_date: Date;
  end_date: Date | null;
}

// 응답 DTO
export interface DinerMissionResponseDTO {
  id: number;
  dinerId: number;
  missionId: number;
  startDate: Date;
  endDate: Date | null;
}
