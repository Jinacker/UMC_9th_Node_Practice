/* eslint-disable prettier/prettier */
import { pool } from "../../config/db.config.js";
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
export const getReviewById = async (reviewId: number): Promise<ReviewFromDB | null> => {
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
