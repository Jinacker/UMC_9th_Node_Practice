import { ReviewFromDB } from "./review.types.js";
export declare const checkDinerExists: (dinerId: number) => Promise<boolean>;
export declare const addReviewToDB: (dinerId: number, data: any) => Promise<{
    id: number;
    userId: number;
    rating: number;
    content: string | null;
    createdAt: Date;
    updatedAt: Date;
    dinerId: number;
}>;
export declare const getReviewById: (reviewId: number) => Promise<{
    id: number;
    userId: number;
    rating: number;
    content: string | null;
    createdAt: Date;
    updatedAt: Date;
    dinerId: number;
} | null>;
export declare const getAllDinerReviews: (dinerId: number, cursor: number) => Promise<{
    user: {
        email: string;
        name: string;
        role: import("@prisma/client").$Enums.UserRole;
        gender: string;
        birth: Date;
        address: string;
        detailAddress: string | null;
        phoneNumber: string;
        id: number;
    };
    id: number;
    userId: number;
    rating: number;
    diner: {
        name: string;
        address: string | null;
        phoneNumber: string | null;
        id: number;
        regionId: number;
        categoryId: number;
        rating: number | null;
    };
    content: string | null;
    createdAt: Date;
    updatedAt: Date;
    dinerId: number;
}[]>;
export declare const getAllMyReviews: (userId: number, cursor: number) => Promise<ReviewFromDB[]>;
//# sourceMappingURL=review.repository.d.ts.map