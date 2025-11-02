// dto => 입력 데이터 정형화 및 검증

import {
  UserData,
  UserFromDB,
  PreferenceFromDB,
  UserResponseDTO,
  UserSignUpRequest,
} from "../types/user.types.js";

// Request body 변화용 DTO

export const bodyToUser = (body: UserSignUpRequest): UserData => {
  const birth = new Date(body.birth); //날짜 변환

  return {
    email: body.email, //필수
    name: body.name, // 필수
    gender: body.gender, // 필수
    birth, // 필수
    address: body.address || "", //선택
    detailAddress: body.detailAddress || "", //선택
    phoneNumber: body.phoneNumber, //필수
    preferences: body.preferences, // 필수
  };
};

////////////////////////////////////////////////////////////

// 응답 받아온거 검증용 : Response 변환용 DTO

export const responseFromUser = ({
  user,
  preferences,
}: {
  user: UserFromDB;
  preferences: PreferenceFromDB[];
}): UserResponseDTO => {
  // DB에서 가져온 user 객체 예시:
  // user = { id: 1, email: "test@example.com", name: "진", gender: "M", birth: "2000-06-04T00:00:00Z", ... }
  // preferences = [ { category: "운동" }, { category: "음악" } ]

  // 클라가 보기 좋은 형태로 변환
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    gender: user.gender,
    birth: user.birth,
    address: user.address,
    detailAddress: user.detailAddress,
    phoneNumber: user.phoneNumber,
    preferences: preferences.map((pref) => pref.name), // preference의 이름만 배열로 엮어서 반환해줌
    createdAt: user.createdAt,
  };
};
