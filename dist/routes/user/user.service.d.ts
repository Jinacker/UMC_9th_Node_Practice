import { UserData, UserFromDB, UserResponseDTO } from "./user.types.js";
export declare const userSignUp: (data: UserData) => Promise<UserResponseDTO>;
export declare const userPatch: (userId: number, data: UserFromDB) => Promise<UserResponseDTO>;
//# sourceMappingURL=user.service.d.ts.map