import {
  ApiResponse,
  GetOrderListResponse,
  NoResponse,
} from "@/types/api/ApiResponseType";
import { api } from "./config/Axios";
import {
  GetOrderListRequest,
  PatchChangeOrderItemRequest,
} from "@/types/api/ApiRequestType";

export const getOrderList = async ({
  lastOrderItemId,
  popupId,
  size,
  popupId,
}: GetOrderListRequest): ApiResponse<GetOrderListResponse> => {
  const response = await api.get(`/order-items/${popupId}`, {
    params: {
      ...(lastOrderItemId && { lastOrderItemId }),
      size: size || 10,
    },
  });
  return response.data;
};

export const patchChangeOrderItemStatus = async ({
  orderItemId,
  qty,
  status,
}: PatchChangeOrderItemRequest): ApiResponse<NoResponse> => {
  const response = await api.patch(`/order-items/status/${orderItemId}`, {
    qty,
    status,
  });
  return response.data;
};
