import {
  ApiResponse,
  GetAvgPurchaseResponse,
  EntrantsResponse,
  ReservationsResponse,
  GetBestItemsResponse,
  GetCongestionResponse,
  QuestionnaireListResponse,
  GetConversionResponse,
  VisitorResponse,
} from "@/types/api/ApiResponseType";
import { api } from "./config/Axios";
import { PopUpIdRequest } from "@/types/api/ApiRequestType";

export const getCongestion = async ({
  popupId,
}: PopUpIdRequest): ApiResponse<GetCongestionResponse> => {
  const response = await api.get(`/popups/${popupId}/dashboard/congestion`);
  return response.data;
};

export const getAvgPurchase = async ({
  popupId,
}: PopUpIdRequest): ApiResponse<GetAvgPurchaseResponse> => {
  const response = await api.get(
    `/popups/${popupId}/dashboard/average-purchase`,
  );
  return response.data;
};

export const getTodayEntrants = async ({
  popupId,
}: PopUpIdRequest): ApiResponse<EntrantsResponse> => {
  const response = await api.get(`/popups/${popupId}/dashboard/entrants`);
  return response.data;
};

export const getQuestionnaire = async ({
  popupId,
}: PopUpIdRequest): ApiResponse<QuestionnaireListResponse> => {
  const response = await api.get(`/popups/${popupId}/dashboard/surveys`);
  return response.data;
};

export const getTodayReservations = async ({
  popupId,
}: PopUpIdRequest): ApiResponse<ReservationsResponse> => {
  const res = await api.get(`/popups/${popupId}/dashboard/reservations`);
  return res.data;
};

export const getBestItems = async ({
  popupId,
}: PopUpIdRequest): ApiResponse<GetBestItemsResponse> => {
  const response = await api.get(`/popups/${popupId}/dashboard/trending`);
  return response.data;
};

export const getConversion = async ({
  popupId,
}: PopUpIdRequest): ApiResponse<GetConversionResponse> => {
  const response = await api.get(
    `/popups/${popupId}/dashboard/conversion-ratio`,
  );
  return response.data;
};

export const getVisitor = async ({
  popupId,
}: PopUpIdRequest): ApiResponse<VisitorResponse> => {
  const response = await api.get(`/popups/${popupId}/dashboard/visitors`);
  return response.data;
};
