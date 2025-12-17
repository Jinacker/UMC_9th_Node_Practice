// 요청용 DTO 변환
export const bodyToAddDinerMission = (body) => {
    const result = {
        missionId: Number(body.missionId), // 필수
        startDate: body.startDate, // 필수 (ISO 8601 형식)
    };
    if (body.endDate) {
        result.endDate = body.endDate; // 선택
    }
    return result;
};
// 응답용 DTO 변환
export const responseFromDinerMission = (dinerMission) => {
    return {
        id: dinerMission.id,
        dinerId: dinerMission.dinerId,
        missionId: dinerMission.missionId,
        startDate: dinerMission.startDate,
        endDate: dinerMission.endDate,
    };
};
// ====== 6주차 미션 2 ======
// ====== 가게 미션 목록 FROM DB → Response DTO ======> flat 하게 펴줌
export const responseFromDinerMissionList = (dinerMissionList) => {
    return ({
        dinerMissionId: dinerMissionList.id,
        dinerId: dinerMissionList.dinerId,
        region: dinerMissionList.diner.region.name,
        category: dinerMissionList.diner.category.name,
        name: dinerMissionList.diner.name,
        rating: dinerMissionList.diner.rating ?? 0, // null 일시 기본값 설정
        missionId: dinerMissionList.mission.id,
        title: dinerMissionList.mission.title,
        description: dinerMissionList.mission.description ?? "", // null 일시 기본값 설정
        pointReward: dinerMissionList.mission.pointReward,
        startDate: dinerMissionList.startDate,
        endDate: dinerMissionList.endDate,
    });
};
//# sourceMappingURL=mission.dto.js.map