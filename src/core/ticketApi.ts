import { HttpClient, BaseHttpClientParams } from "./axios";
import { BaseListResponse, BaseParams, BaseResponse } from "./types/common";
import { Ticket } from "./types/ticket";

const basePath = "/ticket";

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

  async updateTicket(
    ticketData: Partial<Ticket>
  ): Promise<BaseResponse<Ticket>> {
    return this.put<BaseResponse<Ticket>>({
      url: basePath,
      data: ticketData,
    });
  }

  async deleteTicket(ticketId: Partial<Ticket>): Promise<BaseResponse<Ticket>> {
    return this.delete<BaseResponse<Ticket>>({
      url: `${basePath}/${ticketId}`,
    });
  }
}
