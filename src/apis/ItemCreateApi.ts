import {
  ItemCreateRequest,
  PatchItemRequest,
  PopUpIdRequest,
} from "@/types/api/ApiRequestType";
import {
  ApiResponse,
  NoResponse,
  PatchItemResponse,
} from "@/types/api/ApiResponseType";
import { api } from "./config/Axios";

export const postItemCreate = async (
  data: ItemCreateRequest,
): ApiResponse<NoResponse> => {
  const response = await api.post(`/popups/${data.popupId}/items`, data);
  return response.data;
};

export const patchItem = async ({
  itemId,
  minStock,
  popupId,
}: PatchItemRequest & PopUpIdRequest): ApiResponse<PatchItemResponse> => {
  const response = await api.patch(`/popups/${popupId}/items/${itemId}`, {
    minStock,
  });
  return response.data;
};
