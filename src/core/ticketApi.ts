import { HttpClient } from "./axios";
import { BaseListResponse, BaseParams, BaseResponse } from "./types/common";
import { Ticket } from "./types/ticket";

const basePath = "/ticket";
const UPDATE_TICKET_STATUS_PATH = "/ticket-change-status";

export class TicketApi extends HttpClient {
  constructor() {
    super();
  }

  // Method to fetch all tickets
  async getList(params: BaseParams): Promise<BaseListResponse<Ticket>> {
    return this.get<BaseListResponse<Ticket>>({
      url: basePath,
      config: { params },
    });
  }

  // Method to fetch a single ticket by its ID
  async getById(ticketId: string): Promise<BaseResponse<Ticket>> {
    return this.get<BaseResponse<Ticket>>({
      url: `${basePath}/${ticketId}`,
    });
  }

  // Method to create a new ticket
  async createTicket(
    ticketData: Partial<Ticket>
  ): Promise<BaseResponse<Ticket>> {
    return this.post<BaseResponse<Ticket>>({
      url: basePath,
      data: ticketData,
    });
  }

  async updateTicket({
    id,
    ...ticketData
  }: Partial<Ticket>): Promise<BaseResponse<Ticket>> {
    return this.put<BaseResponse<Ticket>>({
      url: `${basePath}/${id}`,
      data: ticketData,
    });
  }

  async deleteTicket(ticketId: Partial<Ticket>): Promise<BaseResponse<Ticket>> {
    return this.delete<BaseResponse<Ticket>>({
      url: `${basePath}/${ticketId}`,
    });
  }

  async updateStatus({
    id,
    statusId,
  }: {
    id: string | number;
    statusId: string | number;
  }): Promise<BaseResponse<Ticket>> {
    return this.post<BaseResponse<Ticket>>({
      url: `${UPDATE_TICKET_STATUS_PATH}/${id}/${statusId}`,
      data: null,
    });
  }
}
