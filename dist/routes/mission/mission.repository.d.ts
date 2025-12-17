import { DinerMissionListFromDB } from "./mission.types.js";
export declare const checkDinerExists: (dinerId: number) => Promise<boolean>;
export declare const checkMissionExists: (missionId: number) => Promise<boolean>;
export declare const addDinerMissionToDB: (dinerId: number, data: {
    missionId: number;
    startDate: string;
    endDate?: string;
}) => Promise<number>;
export declare const getDinerMissionById: (dinerMissionId: number) => Promise<{
    id: number;
    dinerId: number;
    startDate: Date;
    endDate: Date | null;
    missionId: number;
} | null>;
export declare const getAllDinerMissions: (dinerId: number, cursor: number) => Promise<DinerMissionListFromDB[]>;
//# sourceMappingURL=mission.repository.d.ts.map