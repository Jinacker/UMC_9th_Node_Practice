// 에러를 생성하는 공통 부모 에러
export class AppError extends Error {
  status: number;
  errorCode: string;
  data: any;

  constructor(status: number, message: string, errorCode: string, data?: any) {
    super(message);
    this.status = status;
    this.errorCode = errorCode;
    this.data = data;
  }
}
