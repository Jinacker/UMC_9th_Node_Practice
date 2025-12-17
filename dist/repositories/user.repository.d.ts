import { UserData, UserFromDB, PreferenceFromDB } from "../types/user.types.js";
export declare const addUser: (data: UserData) => Promise<number | null>;
export declare const getUser: (userId: number) => Promise<UserFromDB | null>;
export declare const setPreference: (userId: number, foodCategoryId: number) => Promise<void>;
export declare const getUserPreferencesByUserId: (userId: number) => Promise<PreferenceFromDB[]>;
//# sourceMappingURL=user.repository.d.ts.map