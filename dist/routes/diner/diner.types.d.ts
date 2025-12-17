export interface AddDinerRequest {
    name: string;
    foodCategoryId: number;
    address?: string;
    phoneNumber?: string;
    rating?: number;
}
export interface DinerFromDB {
    id: number;
    region_id: number;
    food_category_id: number;
    name: string;
    address: string;
    phone_number: string;
    rating: number;
}
export interface DinerResponseDTO {
    id: number;
    regionId: number;
    name: string;
    foodCategoryId: number;
    address: string;
    phoneNumber: string;
    rating: number;
}
//# sourceMappingURL=diner.types.d.ts.map