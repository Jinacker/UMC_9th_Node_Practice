import { UserData, UserResponseDTO, UserSignUpRequest } from "./user.types.js";
export declare const bodyToUser: (body: UserSignUpRequest) => UserData;
export declare const bodyToUpdatedUser: (body: any) => any;
export declare const responseFromUser: ({ user, preferences, }: {
    user: any;
    preferences: any[];
}) => UserResponseDTO;
export declare const responseFromUpdatedUser: (user: any) => UserResponseDTO;
//# sourceMappingURL=user.dto.d.ts.map