import {
  ApiResponse,
  GetStockNotificationListResponse,
} from "@/types/api/ApiResponseType";
import { api } from "./config/Axios";
import { PopUpIdRequest } from "@/types/api/ApiRequestType";

export const getStockNotificationList = async ({
  popupId,
}: PopUpIdRequest): ApiResponse<GetStockNotificationListResponse> => {
  const response = await api.get(`/popups/${popupId}/notifications/stock`);
  return response.data;
};
