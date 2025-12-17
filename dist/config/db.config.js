import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client"; // 프리즈마 추가
dotenv.config();
export const prisma = new PrismaClient(); //프리즈마 인스턴트 추가
//# sourceMappingURL=db.config.js.map