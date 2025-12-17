import * as UserMissionTypes from "./user-mission.types.js";
export declare const bodyToChallengeMission: (body: UserMissionTypes.ChallengeMissionRequest) => {};
export declare const responseFromMissionClearLog: (log: any) => {
    id: any;
    userId: any;
    dinerMissionId: any;
    status: any;
    startedAt: any;
};
export declare const responseFromMyMissionList: (log: UserMissionTypes.MissionClearLogFromDB) => UserMissionTypes.myMissionResponseDTO;
export declare const responseForClearLog: (log: UserMissionTypes.ClearedLogFromDB) => UserMissionTypes.ChallengeMissionResponseDTO;
//# sourceMappingURL=user-mission.dto.d.ts.map