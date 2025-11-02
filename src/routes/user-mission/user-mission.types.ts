// UserMission 관련 타입 정의

// 미션 도전 요청 바디 타입 (Request Body)
export interface ChallengeMissionRequest {
  userId: number; // 유저 ID
}

// DB에서 가져온 미션 도전 로그 데이터 (Repository)
export interface MissionClearLogFromDB {
  id: number;
  user_id: number;
  diner_mission_id: number;
  point_history_id: number | null;
  status: "진행중" | "완료" | "실패";
  started_at: Date;
  completed_at: Date | null;
}

// 응답 DTO
export interface ChallengeMissionResponseDTO {
  id: number;
  userId: number;
  dinerMissionId: number;
  status: string;
  startedAt: Date;
}
