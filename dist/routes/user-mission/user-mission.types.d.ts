export interface ChallengeMissionRequest {
}
export interface ChallengeMissionResponseDTO {
    id: number;
    userId: number;
    pointHistoryId?: number | null | undefined;
    dinerMissionId: number;
    status: string;
    startedAt: Date;
    completedAt?: Date | null | undefined;
}
export interface myMissionResponseDTO {
    id: number;
    userId: number;
    dinerMissionId: number;
    status: string;
    startedAt: Date;
    regionId: number;
    name: string;
    foodCategoryId: number;
    address: string | null;
    phoneNumber: string | null;
    rating: number | null;
    dinerId: number;
    region: string;
    category: string;
    missionId: number;
    title: string;
    description: string | null;
    pointReward: number;
}
export interface MissionClearLogFromDB {
    id: number;
    userId: number;
    pointHistoryId?: number | null;
    dinerMissionId: number;
    status: string;
    startedAt: Date;
    completedAt?: Date | null;
    dinerMission: {
        startDate: Date;
        dinerId: number;
        diner: {
            id: number;
            regionId: number;
            name: string;
            address: string | null;
            phoneNumber: string | null;
            rating: number | null;
            categoryId: number;
            region: {
                name: string;
            };
            category: {
                name: string;
            };
        };
        mission: {
            id: number;
            title: string;
            description: string | null;
            pointReward: number;
        };
    };
}
export interface ClearedLogFromDB {
    id: number;
    userId: number;
    pointHistoryId?: number | null;
    dinerMissionId: number;
    status: string;
    startedAt: Date;
    completedAt?: Date | null;
}
//# sourceMappingURL=user-mission.types.d.ts.map