export interface AddReviewRequest {
    rating: number;
    content?: string;
}
export interface ReviewFromDB {
    id: number;
    dinerId: number;
    userId: number;
    rating: number;
    content: string | null;
    createdAt: Date;
    updatedAt: Date;
}
export interface ReviewResponseDTO {
    id: number;
    dinerId: number;
    userId: number;
    rating: number;
    content: string | null;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=review.types.d.ts.map