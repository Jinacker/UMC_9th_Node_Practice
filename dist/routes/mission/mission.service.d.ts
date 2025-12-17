import { AddDinerMissionRequest, DinerMissionResponseDTO, DinerMissionListResponseDTO } from "./mission.types.js";
export declare const addDinerMission: (dinerId: number, data: AddDinerMissionRequest) => Promise<DinerMissionResponseDTO>;
export declare const listDinerMission: (dinerId: number, cursor: number) => Promise<DinerMissionListResponseDTO[]>;
//# sourceMappingURL=mission.service.d.ts.map