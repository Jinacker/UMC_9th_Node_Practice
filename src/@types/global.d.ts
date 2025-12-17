import "express-serve-static-core";

// 글로벌 타입 선언
// 성공 응답 타입 선언
// .sucess로 쓰기 위해서 이렇게 express 내장으로 모듈을 추가해주는것!
declare module "express-serve-static-core" {
  interface Response {
    success: (data: any) => Response;
    error: (opts: {
      errorCode?: string;
      reason?: string | null;
      data?: any;
    }) => Response;
  }
}
