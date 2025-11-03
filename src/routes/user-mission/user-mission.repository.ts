// repository => 실제 DB와 상호작용하는 파트

import { pool } from "../../config/db.config.js";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { MissionClearLogFromDB } from "./user-mission.types.js";

// 이미 도전 중인 미션인지 확인
export const checkOngoingMission = async (
  userId: number,
  dinerMissionId: number
): Promise<boolean> => {
  const conn = await pool.getConnection();

  try {
    const [rows] = await conn.query<RowDataPacket[]>(
      `SELECT id FROM mission_clear_log WHERE user_id = ? AND diner_mission_id = ? AND status = '진행중';`,
      [userId, dinerMissionId]
    );

    return rows.length > 0;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${
        err instanceof Error ? err.message : String(err)
      })`
    );
  } finally {
    conn.release();
  }
};

// 미션 도전 로그 추가
export const addMissionClearLog = async (
  userId: number,
  dinerMissionId: number
): Promise<number> => {
  const conn = await pool.getConnection();

  try {
    const [result] = await conn.query<ResultSetHeader>(
      `INSERT INTO mission_clear_log (user_id, diner_mission_id, status, started_at) VALUES (?, ?, '진행중', NOW());`,
      [userId, dinerMissionId]
    );

    return result.insertId;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${
        err instanceof Error ? err.message : String(err)
      })`
    );
  } finally {
    conn.release();
  }
};

// 미션 도전 로그 단건 조회
export const getMissionClearLogById = async (
  logId: number
): Promise<MissionClearLogFromDB | null> => {
  const conn = await pool.getConnection();

  try {
    const [rows] = await conn.query<RowDataPacket[]>(
      `SELECT * FROM mission_clear_log WHERE id = ?;`,
      [logId]
    );

    if (rows.length === 0) return null;

    return rows[0] as MissionClearLogFromDB;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${
        err instanceof Error ? err.message : String(err)
      })`
    );
  } finally {
    conn.release();
  }
};
