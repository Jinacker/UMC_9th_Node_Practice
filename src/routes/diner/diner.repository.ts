/* eslint-disable prettier/prettier */
import { pool } from "../../config/db.config.js";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { DinerFromDB } from "./diner.types.js";

// 식당 등록
export const addDinerToDB = async (
  regionId: number,
  data: {
    name: string;
    foodCategoryId: number;
    address?: string;
    phoneNumber?: string;
    rating?: number;
  }
): Promise<number> => {
  const conn = await pool.getConnection();
  try {
    const [result] = await pool.query<ResultSetHeader>(
      `
      INSERT INTO diner (region_id, category_id, name, address, phone_number, rating)
      VALUES (?, ?, ?, ?, ?, ?);
      `,
      [
        regionId,
        data.foodCategoryId,
        data.name,
        data.address ?? "",
        data.phoneNumber ?? "",
        data.rating ?? 0,
      ]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(
      `식당 등록 중 오류가 발생했습니다. (${
        err instanceof Error ? err.message : String(err)
      })`
    );
  } finally {
    conn.release();
  }
};

/**
 * 식당 단건 조회
 * - dinerId 기준으로 해당 식당 정보 반환
 */
export const getDinerById = async (dinerId: number): Promise<DinerFromDB | null> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `
      SELECT d.*, f.name AS food_category_name
      FROM diner d
      JOIN food_category f ON d.category_id = f.id
      WHERE d.id = ?;
      `,
      [dinerId]
    );

    if (rows.length === 0) return null;
    return rows[0] as DinerFromDB;
  } catch (err) {
    throw new Error(
      `식당 조회 중 오류가 발생했습니다. (${
        err instanceof Error ? err.message : String(err)
      })`
    );
  } finally {
    conn.release();
  }
};
