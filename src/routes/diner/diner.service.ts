// service => 실제 비즈니스 로직 실행
import { responseFromDiner } from "./diner.dto.js";
import { addDinerToDB, getDinerById } from "./diner.repository.js";
import { AddDinerRequest, DinerResponseDTO } from "./diner.types.js";

export const addDiner = async (
  regionId: number,
  data: AddDinerRequest
): Promise<DinerResponseDTO> => {
  // 1. Repository에 DB 저장 요청
  const dinerId = await addDinerToDB(regionId, {
    name: data.name,
    foodCategoryId: data.foodCategoryId,
    address: data.address ?? "", // default 값 설정
    phoneNumber: data.phoneNumber ?? "",
    rating: data.rating ?? 0,
  });

  if (!dinerId) {
    throw new Error("식당 등록에 실패했습니다.");
  }

  // 2. 방금 등록한 식당 데이터 조회
  const diner = await getDinerById(dinerId);

  if (!diner) {
    throw new Error("등록된 식당 정보를 불러올 수 없습니다.");
  }

  // 3. 응답용 DTO 변환 후 반환
  return responseFromDiner(diner);
};
