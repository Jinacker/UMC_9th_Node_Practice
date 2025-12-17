import { ChallengeMissionRequest, ChallengeMissionResponseDTO } from "./user-mission.types.js";
export declare const challengeMission: (dinerMissionId: number, userId: number, data: ChallengeMissionRequest) => Promise<{
    id: any;
    userId: any;
    dinerMissionId: any;
    status: any;
    startedAt: any;
}>;
export declare const myMissionListService: (userId: number, cursor: number) => Promise<import("./user-mission.types.js").myMissionResponseDTO[]>;
export declare const completeMissionService: (userId: number, missionLogId: number) => Promise<ChallengeMissionResponseDTO>;
//# sourceMappingURL=user-mission.service.d.ts.map