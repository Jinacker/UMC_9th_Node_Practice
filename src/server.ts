// 서버 시작용
import dotenv from "dotenv";
import app from "./app.js";
import "./config/db.config.js"; // DB 연결 초기화

// 환경 변수 로드
dotenv.config();

// 포트 설정 (환경 변수에서 가져오거나 기본값 3000 사용)
const PORT = process.env.PORT || 3000;

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
