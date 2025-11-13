import "express-serve-static-core";

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
