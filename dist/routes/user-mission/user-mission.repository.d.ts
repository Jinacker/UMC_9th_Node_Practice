import { MissionClearLogFromDB } from "./user-mission.types.js";
export declare const checkOngoingMission: (userId: number, dinerMissionId: number) => Promise<boolean>;
export declare const addMissionClearLog: (userId: number, dinerMissionId: number) => Promise<number>;
export declare const getMissionClearLogById: (logId: number) => Promise<{
    id: number;
    userId: number;
    dinerMissionId: number;
    pointHistoryId: number | null;
    status: string;
    startedAt: Date;
    completedAt: Date | null;
} | null>;
export declare const getMyMissionListRepo: (userId: number, cursor: number) => Promise<MissionClearLogFromDB[]>;
export declare const checkUser: (userId: number, missionLogId: number) => Promise<boolean>;
export declare const checkMissionProgress: (missionLogId: number) => Promise<boolean>;
export declare const patchCompleteMission: (userId: number, missionLogId: number) => Promise<{
    id: number;
    userId: number;
    dinerMissionId: number;
    pointHistoryId: number | null;
    status: string;
    startedAt: Date;
    completedAt: Date | null;
}>;
//# sourceMappingURL=user-mission.repository.d.ts.map