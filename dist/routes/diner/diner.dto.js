//요청용 DTO 변환
export const bodyToAddDiner = (body) => {
    return {
        name: body.name.trim(), // 공백제거
        foodCategoryId: Number(body.foodCategoryId), // 필수
        address: body.address || "", // 선택
        phoneNumber: body.phoneNumber || "", // 선택
        rating: body.rating ?? 0, // 요청에 없으면 기본값 0
    };
};
// 응답용 DTO 변환
export const responseFromDiner = (diner) => {
    return {
        id: diner.id,
        regionId: diner.region_id,
        name: diner.name,
        foodCategoryId: diner.food_category_id,
        address: diner.address,
        phoneNumber: diner.phone_number,
        rating: diner.rating ?? 0, // 평점 없으면 default 0점
    };
};
//# sourceMappingURL=diner.dto.js.map