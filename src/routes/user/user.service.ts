// service => 실제 로직 작동

import { DuplicateUserEmailError, UserNotFoundError } from "../../errors/userError.js";
import { responseFromUser } from "./user.dto.js";
import { addUser, getUser, getUserPreferencesByUserId, setPreference } from "./user.repository.js"; // repository에서 가져오는 함수들
import { UserData, UserResponseDTO } from "./user.types.js";

export const userSignUp = async (data: UserData): Promise<UserResponseDTO> => {
  const joinUserId = await addUser({
    // 여기서 addUser는 "repository"의 함수 => 실제 DB에 저장하는 함수에 요청 넘겨주는것.
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: data.birth,
    address: data.address,
    detailAddress: data.detailAddress,
    phoneNumber: data.phoneNumber,
    preferences: data.preferences,
  });

  if (joinUserId === null) {
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.",data);
  }

  for (const preference of data.preferences) {
    // 한 유저가 여러개의 "음식 취향" 가질수있으니 반복문으로 돌림.
    await setPreference(joinUserId, preference);
  }
  // 여기까지가 데이터 입력

  const user = await getUser(joinUserId); // 데이터 검증용 => 지금 입력한 유저 데이터 확인용으로 받아옴

  if (!user) {
    throw new UserNotFoundError("사용자를 찾을 수 없습니다.");
  }

  const preferences = await getUserPreferencesByUserId(joinUserId); // 이것도 취향 제대로 들어갔는지 검증용

  // 최종 응답 전달  => (service => DTO => controller)
  return responseFromUser({ user, preferences }); // 검증용 응답 => dto로 전달
};
