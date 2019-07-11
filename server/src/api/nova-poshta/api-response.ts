export class ApiResponse<T> {
  data: T;
  errorCodes: string[];
  errors: any[];
  info: { totalCount: number };
  infoCodes: string[];
  messageCodes: string[];
  success: boolean;
  warningCodes: string[];
  warnings: any[];
}
