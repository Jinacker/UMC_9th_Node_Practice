// dto => 입력 데이터 정형화 및 검증
// Request body 변화용 DTO
export const bodyToUser = (body) => {
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
// ==== 업데이트 용 Body TO User
export const bodyToUpdatedUser = (body) => {
    const birth = new Date(body.birth); //날짜 변환
    return {
        email: body.email, //필수
        name: body.name, // 필수
        gender: body.gender, // 필수
        birth, // 필수
        address: body.address || "", //선택
        detailAddress: body.detailAddress || "", //선택
        phoneNumber: body.phoneNumber, //필수
    };
};
////////////////////////////////////////////////////////////
// 응답 받아온거 검증용 : Response 변환용 DTO => Feat. ORM => DB와 직접 상호작용 하는 부분만 ORM으로 바뀜 
export const responseFromUser = ({ user, preferences, }) => {
    const preferFoods = preferences.map((preference) => preference.foodCategory.name);
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        gender: user.gender,
        birth: user.birth,
        address: user.address,
        detailAddress: user.detailAddress,
        phoneNumber: user.phoneNumber,
        preferences: preferFoods,
        createdAt: user.createdAt, // DB 구조에 따라 optional
    };
};
// === 유저 수정용 응답 DTO ====
export const responseFromUpdatedUser = (user) => {
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        gender: user.gender,
        birth: user.birth,
        address: user.address,
        detailAddress: user.detailAddress,
        phoneNumber: user.phoneNumber,
        createdAt: user.createdAt, // DB 구조에 따라 optional
    };
};
//# sourceMappingURL=user.dto.js.map