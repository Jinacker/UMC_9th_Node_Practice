// Review 관련 타입 정의

// 요청 바디 타입 (Request Body) 겸 요청 DTO
export interface AddReviewRequest {
  userId: number; // 리뷰 작성자 ID
  rating: number; // 평점 (1~5)
  content?: string; // 리뷰 내용 (선택)
}

// DB에서 가져온 리뷰 데이터 (Repository)
export interface ReviewFromDB {
  id: number;
  diner_id: number;
  user_id: number;
  rating: number;
  content: string;
  created_at: Date;
  updated_at: Date;
}

// 응답 DTO
export interface ReviewResponseDTO {
  id: number;
  dinerId: number;
  userId: number;
  rating: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
