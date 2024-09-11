import { HttpClient } from "./axios";
import { BaseListResponse, BaseParams, BaseResponse } from "./types/common";
import { ActivityLog } from "./types/activity-log";

const ACTIVITY_LOG_PATH = "/activity-log";

export class ActivityLogApi extends HttpClient {
  constructor() {
    super();
  }

  // Method to fetch all logs
  async getList(params: BaseParams): Promise<BaseListResponse<ActivityLog>> {
    return this.get<BaseListResponse<ActivityLog>>({
      url: ACTIVITY_LOG_PATH,
      config: { params },
    });
  }

  // Method to fetch a single log by its ID
  async getById(id: string): Promise<BaseResponse<ActivityLog>> {
    return this.get<BaseResponse<ActivityLog>>({
      url: `${ACTIVITY_LOG_PATH}/${id}`,
    });
  }

  // Method to create a new log
  async createType(
    data: Partial<ActivityLog>
  ): Promise<BaseResponse<ActivityLog>> {
    return this.post<BaseResponse<ActivityLog>>({
      url: ACTIVITY_LOG_PATH,
      data,
    });
  }

  async updateType({
    id,
    ...data
  }: Partial<ActivityLog>): Promise<BaseResponse<ActivityLog>> {
    return this.put<BaseResponse<ActivityLog>>({
      url: `${ACTIVITY_LOG_PATH}/${id}`,
      data,
    });
  }

  async deleteType(
    id: Partial<ActivityLog>
  ): Promise<BaseResponse<ActivityLog>> {
    return this.delete<BaseResponse<ActivityLog>>({
      url: `${ACTIVITY_LOG_PATH}/${id}`,
    });
  }
}
