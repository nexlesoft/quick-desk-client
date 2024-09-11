import { HttpClient } from "./axios";
import { BaseListResponse, BaseParams, BaseResponse } from "./types/common";
import { TicketStatus } from "./types/ticket";

const ADMIN_TICKET_SETTING_PATH = "/administration-setting-item";

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
  async getStatusId(id: string): Promise<BaseResponse<TicketStatus>> {
    return this.get<BaseResponse<TicketStatus>>({
      url: `${ADMIN_TICKET_SETTING_PATH}/${id}`,
    });
  }

  // Method to create a new status
  async createStatus(
    data: Partial<TicketStatus>
  ): Promise<BaseResponse<TicketStatus>> {
    return this.post<BaseResponse<TicketStatus>>({
      url: ADMIN_TICKET_SETTING_PATH,
      data,
    });
  }

  async updateStatus({
    id,
    ...data
  }: Partial<TicketStatus>): Promise<BaseResponse<TicketStatus>> {
    return this.put<BaseResponse<TicketStatus>>({
      url: `${ADMIN_TICKET_SETTING_PATH}/${id}`,
      data,
    });
  }

  async deleteStatus(
    id: Partial<TicketStatus>
  ): Promise<BaseResponse<TicketStatus>> {
    return this.delete<BaseResponse<TicketStatus>>({
      url: `${ADMIN_TICKET_SETTING_PATH}/${id}`,
    });
  }
}
