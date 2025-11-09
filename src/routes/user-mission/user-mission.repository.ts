// repository => 실제 DB와 상호작용하는 파트

import { pool,prisma } from "../../config/db.config.js";
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

// ===== 6주차 미션 3 ======
// 내 진행중인 미션 목록 Repository

export const getMyMissionListRepo = async (userId:number, cursor:number): Promise<MissionClearLogFromDB[]> => { // DB 에러 헨들링용 Next도 받음
try{
  const myMissionList = await prisma.missionClearLog.findMany({
    where: {userId: userId, status: "진행중" ,id: {gt: cursor}}, // 진행중인 미션만 가져오게함
    orderBy: {id: "asc"},
    take: 5,
    
      select: {
        id: true,
        userId: true,
        dinerMissionId: true,
        status: true,
        startedAt: true,

        dinerMission: {
          select: {
            startDate: true,
            dinerId: true,

            diner: {
              select: {
                id: true,
                regionId: true,
                name: true,
                categoryId: true,
                address: true,
                phoneNumber: true,
                rating: true,
                region: {select: {name:true}},
                category: {select: {name:true}},
                
              },
            },

            mission: {
              select: {
                id: true,
                title: true,
                description: true,
                pointReward: true,
              },
            },
          },
        },
      },
    });


  return myMissionList;

} catch(error) { // DB단 에러 헨들링
  throw(error);
}
};


//// ===== 6주차 미션 4 ======

// 1. 해당 미션의 유저가 맞는지 체크

export const checkUser = async (userId: number,missionLogId: number): Promise<boolean> => {
  const checkUsers = await prisma.missionClearLog.findUnique({
    where: { 
      userId:userId,
      id: missionLogId
    }
  })
    return checkUsers !== null;
  };


// 2. 현재 진행중인 미션인지 체크
export const checkMissionProgress = async (missionLogId: number): Promise<boolean> => {
  const checkMissionProgress = await prisma.missionClearLog.findUnique({ // Unique와 First 각각 언제 써야할지? => First는 pk 안받을때 쓰는건가..?
    where: { 
      id: missionLogId,
      status: "진행중"
    }, // 미션 로그인지 
  });
  return checkMissionProgress !== null; // 객체가 존재 안하면 false / 있으면 true (null -> falsy / 객체 있음 -> truthy)
};

// 내가 진행중인 미션 성공으로 바꾸는 PATCH API

export const patchCompleteMission = async (userId:number, missionLogId: number) => {
  try{
      const completedMission = await prisma.missionClearLog.update({ 
        where: {id:missionLogId, userId: userId, status: "진행중"}, // 그냥 이렇게 할거면 앞에 체크하는게 의미 있는건가..? 앞의 로직은 에러 헨들링만을 위한건가
       data: {
              status: '성공',
              completedAt: new Date()
       }
      });
      return completedMission;
  }
  catch (error) { // DB단 에러 헨들링
    throw(error);
  }
};