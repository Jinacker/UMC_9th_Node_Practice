// dto => 입력 데이터 정형화 및 검증

import {
  UserData,
  UserFromDB,
  PreferenceFromDB,
  UserResponseDTO,
  UserSignUpRequest,
} from "./user.types.js";

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

// 응답 받아온거 검증용 : Response 변환용 DTO => Feat. ORM => DB와 직접 상호작용 하는 부분만 ORM으로 바뀜 

export const responseFromUser = ({ user, preferences }: { user: any, preferences: any[] }) => {
  const preferFoods = preferences.map(
    (preference) => preference.foodCategory.name
  );

  return {
    email: user.email,
    name: user.name,
    preferCategory: preferFoods,
  };
};
