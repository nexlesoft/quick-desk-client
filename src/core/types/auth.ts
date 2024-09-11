import { ApplicationType } from "./application";
import { BaseType, COMMON_STATE } from "./common";

export interface Role {
  id: number;
  name: string;
}

export interface User {
  id: number;
  email: string;
  roles: Role[];
  state: COMMON_STATE;
  isRoot: boolean;
  username: string;
  permissions: Record<string, number>;
  dataPermissions: Record<string, number>;
  last_visit_date: string;
  last_visit_date_ts: string;
}

export interface Staff extends BaseType {
  avatar: string;
  state: COMMON_STATE;
  sex: string;
  code: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  is_email: number;
  applications: ApplicationType[];
  fullname: string;
  isRead: boolean;
  position?: { id: number; name: string };
}

export interface UserData {
  accessToken: string;
  refreshToken: string;
  user: User;
  staff: Staff;
}
