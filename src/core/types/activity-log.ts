import { Staff, User } from "./auth";
import { BaseType } from "./common";

export interface ActivityLog extends BaseType {
  context?: string;
  description?: string;
  message: string;
  method: string;
  origin_data?: any;
  updated_data?: any;
  state: string;
  user?: User;
  staff?: Staff;
  activity_context: string;
}
