export interface BaseType {
  id: number;
  created_by: string;
  created_date: string;
  created_data_ts?: number;
  modified_by: string;
  modified_date: string;
  modified_date_ts?: number;
}

export interface ListResponse<T> {
  items: T[];
  limit: number;
  page: number;
  totalRows: number;
}

export interface BaseResponse<T> {
  code: number;
  data: T;
  message: string;
  success: boolean;
  version: string;
}

export interface BaseListResponse<T> {
  code: number;
  data: ListResponse<T>;
  message: string;
  success: boolean;
  version: string;
}

export enum COMMON_STATE {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface BaseParams {
  q?: string;
  page?: number;
  limit?: number;
  order?: string;
  f_state?: COMMON_STATE;
  f_id?: string | number;
  f_name?: string;
}

export interface MultiSelectOption<T> {
  value: T;
  label: string;
  key?: string;
  disabled?: boolean;
}

export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}
