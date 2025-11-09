import { prisma } from "../../config/db.config.js";
import { AddDinerRequest, DinerFromDB } from "./diner.types.js";

// 식당 등록 => 리팩토리 
export const addDinerToDB = async(regionId:number, data: AddDinerRequest) => {
  try{
    const addedDinerToDB = await prisma.diner.create(
      {
        data: {
        regionId: regionId,
        categoryId: data.foodCategoryId,
        name: data.name,
        address: data.address ?? "",
        phoneNumber: data.phoneNumber ?? "",
        rating: data.rating ?? 0
        }
    });

    return addedDinerToDB;

  } catch(error) {
    throw(error);
  }
};

/**
 * 식당 단건 조회
 * - dinerId 기준으로 해당 식당 정보 반환
 */

export const getDinerById = async (dinerId: number) => {
  try {
    const dinerDetail = await prisma.diner.findUnique({
      where : {id:dinerId}
    });
    return dinerDetail;
  } catch(error) {
    throw(error);
  }
}

