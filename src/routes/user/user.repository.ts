import { prisma } from "../../config/db.config.js";

// User 데이터 삽입
export const addUser = async (data: any) => {
  const user = await prisma.user.findFirst({ where: { email: data.email.trim() } });
  if (user) {
    return null;
  }

  // preferences를 제외한 user 데이터만 추출
  const { preferences, ...userData } = data;

  const created = await prisma.user.create({ data: userData });
  return created.id;
};

// 사용자 정보 얻기
export const getUser = async (userId: number) => {
  const user = await prisma.user.findFirstOrThrow({ where: { id: userId } });
  return user;
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId: number, foodCategoryId: number) => {
  await prisma.userFavorCategory.create({
    data: {
      userId: userId,
      foodCategoryId: foodCategoryId,
    },
  });
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId: number) => {
  const preferences = await prisma.userFavorCategory.findMany({
    select: {
      id: true,
      userId: true,
      foodCategoryId: true,
      foodCategory: true,
    },
    where: { userId: userId },
    orderBy: { foodCategoryId: "asc" },
  });

  return preferences;
};
