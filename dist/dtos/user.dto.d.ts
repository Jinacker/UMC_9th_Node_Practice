import { UserData, UserFromDB, PreferenceFromDB, UserResponseDTO, UserSignUpRequest } from "../types/user.types.js";
export declare const bodyToUser: (body: UserSignUpRequest) => UserData;
export declare const responseFromUser: ({ user, preferences, }: {
    user: UserFromDB;
    preferences: PreferenceFromDB[];
}) => UserResponseDTO;
//# sourceMappingURL=user.dto.d.ts.map