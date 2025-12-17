export interface AddDinerMissionRequest {
    missionId: number;
    startDate: string;
    endDate?: string;
}
export interface DinerMissionFromDB {
    id: number;
    dinerId: number;
    missionId: number;
    startDate: Date;
    endDate: Date | null;
}
export interface DinerMissionResponseDTO {
    id: number;
    dinerId: number;
    missionId: number;
    startDate: Date;
    endDate: Date | null;
}
export interface DinerMissionListFromDB {
    id: number;
    dinerId: number;
    missionId: number;
    startDate: Date;
    endDate: Date | null;
    diner: {
        name: string;
        rating: number | null;
        region: {
            id: number;
            name: string;
        };
        category: {
            id: number;
            name: string;
        };
    };
    mission: {
        id: number;
        title: string;
        description: string | null;
        pointReward: number;
    };
}
export interface DinerMissionListResponseDTO {
    dinerMissionId: number;
    dinerId: number;
    region: string;
    category: string;
    name: string;
    rating: number;
    missionId: number;
    title: string;
    description: string;
    pointReward: number;
    startDate: Date;
    endDate: Date | null;
}
//# sourceMappingURL=mission.types.d.ts.map