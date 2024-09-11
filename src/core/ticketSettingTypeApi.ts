import { HttpClient } from "./axios";
import { BaseListResponse, BaseParams, BaseResponse } from "./types/common";
import { TicketGroup } from "./types/ticket";

const TICKET_SETTING_REQUEST_GROUP_PATH = "/ticket-setting-request-group";

export class TicketSettingTypeApi extends HttpClient {
  constructor() {
    super();
  }

  // Method to fetch all statuses
  async getList(params: BaseParams): Promise<BaseListResponse<TicketGroup>> {
    return this.get<BaseListResponse<TicketGroup>>({
      url: TICKET_SETTING_REQUEST_GROUP_PATH,
      config: { params },
    });
  }

  // Method to fetch a single status by its ID
  async getById(id: string): Promise<BaseResponse<TicketGroup>> {
    return this.get<BaseResponse<TicketGroup>>({
      url: `${TICKET_SETTING_REQUEST_GROUP_PATH}/${id}`,
    });
  }

  // Method to create a new status
  async createType(
    data: Partial<TicketGroup>
  ): Promise<BaseResponse<TicketGroup>> {
    return this.post<BaseResponse<TicketGroup>>({
      url: TICKET_SETTING_REQUEST_GROUP_PATH,
      data,
    });
  }

  async updateType({
    id,
    ...data
  }: Partial<TicketGroup>): Promise<BaseResponse<TicketGroup>> {
    return this.put<BaseResponse<TicketGroup>>({
      url: `${TICKET_SETTING_REQUEST_GROUP_PATH}/${id}`,
      data,
    });
  }

  async deleteType(
    id: Partial<TicketGroup>
  ): Promise<BaseResponse<TicketGroup>> {
    return this.delete<BaseResponse<TicketGroup>>({
      url: `${TICKET_SETTING_REQUEST_GROUP_PATH}/${id}`,
    });
  }
}
