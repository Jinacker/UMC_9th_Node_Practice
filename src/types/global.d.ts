import "express-serve-static-core";

// 글로벌 타입 선언
// 성공 응답 타입 선언
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
