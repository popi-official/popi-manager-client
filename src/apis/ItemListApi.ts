import {
  ApiResponse,
  GetItemListResponse,
  NoResponse,
} from "@/types/api/ApiResponseType";
import {
  ItemAddExcelRequest,
  PopUpIdRequest,
} from "@/types/api/ApiRequestType";
import { AxiosProgressEvent } from "axios";
import { api } from "./config/Axios";

export const getItemList = async ({
  popupId,
}: PopUpIdRequest): ApiResponse<GetItemListResponse> => {
  const response = await api.get(`/popups/${popupId}/items`);
  return response.data;
};

export const deleteItem = async ({
  itemId,
  popupId,
}: { itemId: string } & PopUpIdRequest): ApiResponse<NoResponse> => {
  const response = await api.delete(`/popups/${popupId}/items/${itemId}`);
  return response.data;
};

export const postItemAddExcel = async ({
  excelFile,
  onProgress,
  popupId,
}: ItemAddExcelRequest & PopUpIdRequest): ApiResponse<NoResponse> => {
  const formData = new FormData();
  formData.append("itemFile", excelFile);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent: AxiosProgressEvent) => {
      if (onProgress && progressEvent.total) {
        const percentage = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        );
        onProgress(percentage);
      }
    },
  };

  const response = await api.post(
    `/popups/${popupId}/items/excel`,
    formData,
    config,
  );
  return response.data;
};
