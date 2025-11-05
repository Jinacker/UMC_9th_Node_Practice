// Review 관련 타입 정의

// 요청 바디 타입 (Request Body) 겸 요청 DTO
export interface AddReviewRequest {
  userId: number; // 리뷰 작성자 ID
  rating: number; // 평점 (1~5)
  content?: string; // 리뷰 내용 (선택)
}

// 해당 가게의 모든 리뷰 조회 API => Get + urlParams로 매핑해서 Reqeust body랑 DTO 필요없음

// DB에서 가져온 리뷰 데이터 (Repository)
export interface ReviewFromDB {
  id: number;
  dinerId: number;
  userId: number;
  rating: number;
  content: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// 응답 DTO
export interface ReviewResponseDTO {
  id: number;
  dinerId: number;
  userId: number;
  rating: number;
  content: string | null;
  createdAt: Date;
  updatedAt: Date;
}

