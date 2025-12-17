// Diner 관련 타입 정의

// 요청 바디 타입 (Request Body) 겸 요청 DTO
export interface AddDinerRequest {
  name: string; // 식당 이름
  foodCategoryId: number; // 음식 카테고리 ID (외래키)
  address?: string; // 선택 입력
  phoneNumber?: string; // 선택 입력
  rating?: number; // 선택 입력
}

// DB에서 가져온 식당 데이터 (Repository)
export interface DinerFromDB {
  id: number;
  region_id: number;
  food_category_id: number;
  name: string;
  address: string;
  phone_number: string;
  rating: number;
}

// 응답 DTO
export interface DinerResponseDTO {
  id: number;
  regionId: number;
  name: string;
  foodCategoryId: number;
  address: string;
  phoneNumber: string;
  rating: number;
}
