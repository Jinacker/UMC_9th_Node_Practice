import { UpdateUserData } from "./user.types.js";
export declare const addUser: (data: any) => Promise<number | null>;
export declare const getUser: (userId: number) => Promise<{
    email: string;
    name: string;
    role: import("@prisma/client").$Enums.UserRole;
    gender: string;
    birth: Date;
    address: string;
    detailAddress: string | null;
    phoneNumber: string;
    id: number;
}>;
export declare const setPreference: (userId: number, foodCategoryId: number) => Promise<void>;
export declare const getUserPreferencesByUserId: (userId: number) => Promise<{
    id: number;
    foodCategory: {
        name: string;
        id: number;
    };
    userId: number;
    foodCategoryId: number;
}[]>;
export declare const updateUser: (userId: number, data: UpdateUserData) => Promise<{
    email: string;
    name: string;
    role: import("@prisma/client").$Enums.UserRole;
    gender: string;
    birth: Date;
    address: string;
    detailAddress: string | null;
    phoneNumber: string;
    id: number;
}>;
//# sourceMappingURL=user.repository.d.ts.map