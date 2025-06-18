import { PopUpWithChoicesRequest } from "@/types/api/ApiRequestType";
import { api } from "./config/Axios";
import {
  ApiResponse,
  PostPopUpCreateResponse,
} from "@/types/api/ApiResponseType";

export const postPopUpCreate = async (
  request: PopUpWithChoicesRequest,
): ApiResponse<PostPopUpCreateResponse> => {
  const response = await api.post("/popups", request);
  return response.data;
};
