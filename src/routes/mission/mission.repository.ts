/* eslint-disable prettier/prettier */
import { pool } from "../../config/db.config.js";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { DinerMissionFromDB } from "./mission.types.js";

// 가게 존재 여부 확인
export const checkDinerExists = async (dinerId: number): Promise<boolean> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT id FROM diner WHERE id = ?",
      [dinerId]
    );
    return rows.length > 0;
  } catch (err) {
    throw new Error(
      "가게 존재 여부 확인 중 오류가 발생했습니다. (" +
        (err instanceof Error ? err.message : String(err)) +
        ")"
    );
  } finally {
    conn.release();
  }
};

// 미션 존재 여부 확인
export const checkMissionExists = async (missionId: number): Promise<boolean> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT id FROM mission WHERE id = ?",
      [missionId]
    );
    return rows.length > 0;
  } catch (err) {
    throw new Error(
      "미션 존재 여부 확인 중 오류가 발생했습니다. (" +
        (err instanceof Error ? err.message : String(err)) +
        ")"
    );
  } finally {
    conn.release();
  }
};

// ISO 8601 형식을 MySQL datetime 형식으로 변환
const convertToMySQLDatetime = (isoString: string): string => {
  return isoString.replace("T", " ").replace("Z", "");
};

// 가게 미션 등록
export const addDinerMissionToDB = async (
  dinerId: number,
  data: {
    missionId: number;
    startDate: string;
    endDate?: string;
  }
): Promise<number> => {
  const conn = await pool.getConnection();
  try {
    const startDate = convertToMySQLDatetime(data.startDate);
    const endDate = data.endDate ? convertToMySQLDatetime(data.endDate) : null;

    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO diner_mission (diner_id, mission_id, start_date, end_date) VALUES (?, ?, ?, ?)",
      [dinerId, data.missionId, startDate, endDate]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(
      "가게 미션 등록 중 오류가 발생했습니다. (" +
        (err instanceof Error ? err.message : String(err)) +
        ")"
    );
  } finally {
    conn.release();
  }
};

// 가게 미션 단건 조회
export const getDinerMissionById = async (dinerMissionId: number): Promise<DinerMissionFromDB | null> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM diner_mission WHERE id = ?",
      [dinerMissionId]
    );
    if (rows.length === 0) return null;
    return rows[0] as DinerMissionFromDB;
  } catch (err) {
    throw new Error(
      "가게 미션 조회 중 오류가 발생했습니다. (" +
        (err instanceof Error ? err.message : String(err)) +
        ")"
    );
  } finally {
    conn.release();
  }
};
