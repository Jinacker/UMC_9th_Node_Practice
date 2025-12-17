/* eslint-disable prettier/prettier */
import { prisma } from "../../config/db.config.js";
// 가게 존재 여부 확인 
// - 리뷰 작성 전 해당 가게가 존재하는지 검증
export const checkDinerExists = async (dinerId) => {
    try {
        const checkDiner = await prisma.diner.findUnique({
            where: { id: dinerId }
        });
        return checkDiner !== null; // 존재안하면 null
    }
    catch (error) {
        throw (error);
    }
};
// 리뷰 등록
// - review 테이블에 리뷰 데이터 삽입
export const addReviewToDB = async (dinerId, data) => {
    try {
        const addedReview = await prisma.review.create({
            data: {
                dinerId: dinerId,
                userId: data.userId,
                rating: data.rating,
                content: data.content
            }
        });
        return addedReview;
    }
    catch (error) {
        throw (error);
    }
};
// 리뷰 단건 조회
// - reviewId 기준으로 해당 리뷰 정보 반환
export const getReviewById = async (reviewId) => {
    try {
        const getReview = await prisma.review.findUnique({
            where: { id: reviewId }
        });
        return getReview;
    }
    catch (error) {
        throw (error);
    }
};
// ==== 해당 가게의 모든 리뷰 Get하는 API ====
export const getAllDinerReviews = async (dinerId, cursor) => {
    const reviews = await prisma.review.findMany({
        select: {
            id: true,
            content: true,
            dinerId: true,
            userId: true,
            diner: true,
            user: true,
            rating: true,
            createdAt: true,
            updatedAt: true,
        },
        where: { dinerId: dinerId, id: { gt: cursor } },
        orderBy: { id: "asc" },
        take: 5,
    });
    return reviews;
};
// ====== 6주차 1번 과제 =======
// 내 작성 리뷰 목록 GET => Repository
export const getAllMyReviews = async (userId, cursor) => {
    const myReviews = await prisma.review.findMany({
        select: {
            id: true,
            content: true,
            dinerId: true,
            userId: true,
            diner: true,
            user: true,
            rating: true,
            createdAt: true,
            updatedAt: true,
        },
        where: { userId: userId, id: { gt: cursor } }, // userId와 같은 리뷰들 커서보다 큰 값 가져옴
        orderBy: { id: "asc" },
        take: 5,
    });
    return myReviews;
};
//# sourceMappingURL=review.repository.js.map