import { AddDinerRequest } from "./diner.types.js";
export declare const addDinerToDB: (regionId: number, data: AddDinerRequest) => Promise<{
    name: string;
    address: string | null;
    phoneNumber: string | null;
    id: number;
    regionId: number;
    categoryId: number;
    rating: number | null;
}>;
/**
 * 식당 단건 조회
 * - dinerId 기준으로 해당 식당 정보 반환
 */
export declare const getDinerById: (dinerId: number) => Promise<{
    name: string;
    address: string | null;
    phoneNumber: string | null;
    id: number;
    regionId: number;
    categoryId: number;
    rating: number | null;
} | null>;
//# sourceMappingURL=diner.repository.d.ts.map