// User 관련 타입 정의

export interface UserData {
  email: string;
  name: string;
  gender: string;
  birth: Date;
  address: string;
  detailAddress: string;
  phoneNumber: string;
  preferences: number[];
}

export interface UserFromDB {
  id: number;
  email: string;
  name: string;
  gender: string;
  birth: Date;
  address: string;
  detailAddress: string;
  phoneNumber: string;
  createdAt: Date;
}

export interface PreferenceFromDB {
  id: number;
  food_category_id: number;
  user_id: number;
  name: string;
}

export interface UserResponseDTO {
  id: number;
  email: string;
  name: string;
  gender: string;
  birth: Date;
  address: string;
  detailAddress: string;
  phoneNumber: string;
  preferences: string[];
  createdAt: Date;
}
