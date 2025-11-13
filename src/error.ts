// 커스텀 에러

export class DuplicateUserEmailError extends Error { // 이메일 중복
  errorCode: string = "U001"; // 커스텀 에러 코드
  reason: string;
  data: any;


  constructor(reason: any, data: any) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}