import * as MissionTypes from "./mission.types.js";
import type { DinerMissionListResponseDTO } from "./mission.types.js";
export declare const bodyToAddDinerMission: (body: MissionTypes.AddDinerMissionRequest) => MissionTypes.AddDinerMissionRequest;
export declare const responseFromDinerMission: (dinerMission: MissionTypes.DinerMissionFromDB) => MissionTypes.DinerMissionResponseDTO;
export declare const responseFromDinerMissionList: (dinerMissionList: MissionTypes.DinerMissionListFromDB) => DinerMissionListResponseDTO;
//# sourceMappingURL=mission.dto.d.ts.map