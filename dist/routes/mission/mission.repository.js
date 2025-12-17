/* eslint-disable prettier/prettier */
import { prisma } from "../../config/db.config.js";
// 가게 존재 여부 확인 => 리팩토링
export const checkDinerExists = async (dinerId) => {
    const diner = await prisma.diner.findUnique({
        where: { id: dinerId },
        select: { id: true }
    });
    return !!diner;
};
// 미션 존재 여부 확인 => 리팩토링 
export const checkMissionExists = async (missionId) => {
    const mission = await prisma.mission.findUnique({
        where: { id: missionId },
        select: { id: true }
    });
    return !!mission;
};
// ISO 8601 형식을 MySQL datetime 형식으로 변환
// => Prisma는 JS Date 객체 자동 처리하므로 별도 변환 불필요
const toDate = (iso) => {
    return iso ? new Date(iso) : null;
};
// 가게 미션 등록
export const addDinerMissionToDB = async (dinerId, data) => {
    const created = await prisma.dinerMission.create({
        data: {
            dinerId,
            missionId: data.missionId,
            startDate: new Date(data.startDate), // Prisma는 Date 객체로 자동 변환
            endDate: data.endDate ? new Date(data.endDate) : null
        }
    });
    return created.id;
};
// 가게 미션 단건 조회
export const getDinerMissionById = async (dinerMissionId) => {
    const dinerMission = await prisma.dinerMission.findUnique({
        where: { id: dinerMissionId }
    });
    return dinerMission;
};
/////// ======== 6주차 미션 2 ==========
// // 해당 가게의 미션 목록 조회 API Repository
export const getAllDinerMissions = async (dinerId, cursor) => {
    const dinerMissions = await prisma.dinerMission.findMany({
        where: { dinerId: dinerId, id: { gt: cursor } }, // dinerId와 같은 리뷰들 커서보다 큰 값 가져옴
        orderBy: { id: "asc" },
        take: 5,
        select: {
            diner: {
                select: {
                    region: true,
                    category: true,
                    name: true,
                    rating: true
                },
            }, // 이제 다이너 미션 => 유효기간 표시
            id: true,
            dinerId: true,
            missionId: true,
            startDate: true,
            endDate: true,
            mission: {
                select: {
                    id: true,
                    title: true,
                    description: true,
                    pointReward: true
                }
            }
        }
    });
    return dinerMissions;
};
//# sourceMappingURL=mission.repository.js.map