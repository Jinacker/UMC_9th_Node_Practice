// UserMission 관련 타입 정의

// 미션 도전 요청 바디 타입 (Request Body)
export interface ChallengeMissionRequest {
  userId: number; // 유저 ID
}

// // DB에서 가져온 미션 도전 로그 데이터 (Repository)
// export interface MissionClearLogFromDB {
//   id: number;
//   userId: number;
//   diner_mission_id: number;
//   point_history_id: number | null;
//   status: "진행중" | "완료" | "실패";
//   started_at: Date;
//   completed_at: Date | null;
// }

// 응답 DTO
export interface ChallengeMissionResponseDTO {
  id: number;
  userId: number;
  dinerMissionId: number;
  status: string;
  startedAt: Date;
}


/// ===== 6주차 미션 3 ======
// 내가 진행중인 미션 목록 타입 
export interface myMissionResponseDTO {
  id: number;
  userId: number;
  dinerMissionId: number;
  status: string;
  startedAt: Date;

  regionId: number;
  name: string;
  foodCategoryId: number;
  address: string | null;
  phoneNumber: string | null;
  rating: number | null;

  dinerId: number;
  region: string;
  category: string;

  missionId: number;
  title: string;
  description: string | null;
  pointReward: number;
}

export interface MissionClearLogFromDB {
  id: number;
  userId: number;
  dinerMissionId: number;
  status: string;
  startedAt: Date;

  dinerMission: {
    startDate: Date;
    dinerId: number,

    diner: {
      id: number;
      regionId: number;
      name: string;
      address: string | null;
      phoneNumber: string | null;
      rating: number | null;
      categoryId: number;
      region: { name:string};   
      category: { name:string};  
    };

    mission: {
      id: number;
      title: string;
      description: string | null;
      pointReward: number;
    };
  };
}
