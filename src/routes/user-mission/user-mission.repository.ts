import { pool,prisma } from "../../config/db.config.js";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { MissionClearLogFromDB } from "./user-mission.types.js";

// 이미 도전 중인 미션인지 확인 => ORM으로 리팩토링

export const checkOngoingMission = async (userId:number, dinerMissionId: number) => { 
  try{ 
      const isInProgress = await prisma.missionClearLog.findFirst({
        where: {userId: userId, dinerMissionId: dinerMissionId, status: { in: ["진행중", "성공"]}},
      });

    return isInProgress !== null; // 없으면 null 있으면 해당 객체 반환
;
  } catch (error) {
      throw(error);;
    }
};


// 미션 도전 로그 추가 (진행중 상태로)
export const addMissionClearLog = async (userId: number, dinerMissionId: number) => {
  try {
    const addedMissionClearLog = await prisma.missionClearLog.create({
      data: {
        userId,
        dinerMissionId,
        status: '진행중',
        startedAt: new Date(), // 또는 Prisma에서 auto-set 되면 생략
      },
      select: {
        id: true, // 필요한 필드 선택 (예: id만 리턴)
      },
    });

    return addedMissionClearLog.id;
  } catch (error) {
    throw error;
  }
};


// 미션 도전 로그 단건 조회
export const getMissionClearLogById = async (logId:number) => {
  try {
    const missionClearLog = await prisma.missionClearLog.findUnique({
      where: {id:logId}
    });

    return missionClearLog;

  } catch (error) {
    throw(error);
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