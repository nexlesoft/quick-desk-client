import { BaseListResponse, BaseResponse, BaseType, COMMON_STATE } from "./common";

export interface ApplicationType extends BaseType {
  users?: Array<{ value: number; label: string }>;
  code: string;
  name: string;
  description?: string;
  state: COMMON_STATE;
}
export interface ApplicationDto extends BaseResponse<ApplicationType> {}

export interface ApplicationListDto extends BaseListResponse<ApplicationType> {}
