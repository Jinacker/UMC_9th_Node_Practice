/* eslint-disable prettier/prettier */
import { pool,prisma } from "../../config/db.config.js";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { ReviewFromDB } from "./review.types.js";

// 가게 존재 여부 확인
// - 리뷰 작성 전 해당 가게가 존재하는지 검증
export const checkDinerExists = async (dinerId: number): Promise<boolean> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT id FROM diner WHERE id = ?;`,
      [dinerId]
    );
    return rows.length > 0;
  } catch (err) {
    throw new Error(
      `가게 존재 여부 확인 중 오류가 발생했습니다. (${
        err instanceof Error ? err.message : String(err)
      })`
    );
  } finally {
    conn.release();
  }
};

// 리뷰 등록
// - review 테이블에 리뷰 데이터 삽입
export const addReviewToDB = async (
  dinerId: number,
  data: {
    userId: number;
    rating: number;
    content?: string;
  }
): Promise<number> => {
  const conn = await pool.getConnection();
  try {
    const [result] = await pool.query<ResultSetHeader>(
      `
      INSERT INTO review (diner_id, user_id, rating, content)
      VALUES (?, ?, ?, ?);
      `,
      [
        dinerId,
        data.userId,
        data.rating,
        data.content ?? "",
      ]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(
      `리뷰 등록 중 오류가 발생했습니다. (${
        err instanceof Error ? err.message : String(err)
      })`
    );
  } finally {
    conn.release();
  }
};

// 리뷰 단건 조회
// - reviewId 기준으로 해당 리뷰 정보 반환
export const getReviewById = async (reviewId: number) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `
      SELECT * FROM review WHERE id = ?;
      `,
      [reviewId]
    );

    if (rows.length === 0) return null;
    return rows[0] as ReviewFromDB;
  } catch (err) {
    throw new Error(
      `리뷰 조회 중 오류가 발생했습니다. (${
        err instanceof Error ? err.message : String(err)
      })`
    );
  } finally {
    conn.release();
  }
};


// ====== 6주차 1번 과제 =======
// 내 작성 리뷰 목록 GET => Repository
export const getAllMyReviews = async (userId: number, cursor:number): Promise<ReviewFromDB[]> => {
  const myReviews = await prisma.review.findMany({ // review 테이블에서 findMany => 여러 row들 가져와라 => where 조건 없을시 전체 * 가져옴
    select: {
      id: true,
      content: true,
      dinerId: true,
      userId: true,
      diner: true,
      user: true,
      rating:true,
      createdAt:true,
      updatedAt:true,
    },
    where: {userId: userId, id: {gt: cursor}}, // userId와 같은 리뷰들 커서보다 큰 값 가져옴
    orderBy: {id: "asc"},
    take: 5,
  });

  return myReviews;
};