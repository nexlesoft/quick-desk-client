import { HttpClient } from "./axios";
import { BaseListResponse, BaseParams, BaseResponse } from "./types/common";
import { TicketStatus } from "./types/ticket";

const ADMIN_TICKET_SETTING_PATH = "/administration-setting-item";
const TICKET_SETTING_REQUEST_ITEM_PATH = "/ticket-setting-request-item";
const TICKET_SETTING_REQUEST_GROUP_PATH = "/ticket-setting-request-group";

export class TicketSettingStatusApi extends HttpClient {
  constructor() {
    super();
  }

  // Method to fetch all statuses
  async getListStatuses(
    params: BaseParams
  ): Promise<BaseListResponse<TicketStatus>> {
    return this.get<BaseListResponse<TicketStatus>>({
      url: ADMIN_TICKET_SETTING_PATH,
      config: { params },
    });
  }

  // Method to fetch a single status by its ID
  async getStatusId(ticketId: string): Promise<BaseResponse<TicketStatus>> {
    return this.get<BaseResponse<TicketStatus>>({
      url: `${ADMIN_TICKET_SETTING_PATH}/${ticketId}`,
    });
  }

  // Method to create a new status
  async createStatus(
    ticketData: Partial<TicketStatus>
  ): Promise<BaseResponse<TicketStatus>> {
    return this.post<BaseResponse<TicketStatus>>({
      url: ADMIN_TICKET_SETTING_PATH,
      data: ticketData,
    });
  }

  async updateStatus({
    id,
    ...ticketData
  }: Partial<TicketStatus>): Promise<BaseResponse<TicketStatus>> {
    return this.put<BaseResponse<TicketStatus>>({
      url: `${ADMIN_TICKET_SETTING_PATH}/${id}`,
      data: ticketData,
    });
  }

  async deleteStatus(
    ticketId: Partial<TicketStatus>
  ): Promise<BaseResponse<TicketStatus>> {
    return this.delete<BaseResponse<TicketStatus>>({
      url: `${ADMIN_TICKET_SETTING_PATH}/${ticketId}`,
    });
  }
}
