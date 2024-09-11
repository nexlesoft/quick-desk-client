import { Staff, User } from "./auth";
import { BaseParams, BaseType, COMMON_STATE } from "./common";
import { Media } from "./media";

export enum TicketType {
  REQUEST = "REQUEST",
  TODO = "TODO",
}

export enum TicketPriority {
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
}

export interface TicketStatus extends BaseType {
  code?: string;
  color: string;
  name: string;
  context: string;
}

export interface TicketGroup extends BaseType {
  name: string;
}

export interface TicketLogData {
  name: string;
  description?: string;
  priority: TicketPriority;
  state: COMMON_STATE;
  status: TicketStatus;
  application?: string;
  Requester?: string;
  Assignees?: string;
  media?: string;
  merchant?: string;
  type: string;
}

export interface Ticket extends BaseType {
  code: string;
  name: string;
  description?: string;
  priority: TicketPriority;
  state: COMMON_STATE;
  status: TicketStatus;
  application?: { id: number; name: string };
  requestStaff: Staff;
  trackStaffs: Staff[];
  ticketType: TicketGroup;
  user: User;
  media: Media[];
  type: TicketType;
  merchant_email?: string;
  origin_data?: TicketLogData;
  updated_data?: TicketLogData;
}

export interface TicketGetListParams extends BaseParams {
  f_type: TicketType;
  f_staff_id?: string | number;
  f_priority?: string;
  f_setting_type_id?: string | number;
  f_setting_status_id?: string | number;
  f_application_id?: string | number;
  f_created_by?: string | number;
}
