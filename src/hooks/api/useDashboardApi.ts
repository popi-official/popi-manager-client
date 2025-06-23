import { useQuery } from "@tanstack/react-query";
import {
  getAvgPurchase,
  getBestItems,
  getTodayEntrants,
  getTodayReservations,
  getCongestion,
  getQuestionnaire,
  getConversion,
  getVisitor,
} from "@/apis/DashBoardApi";
import { VisitorResponse } from "@/types/api/ApiResponseType";
import { PopUpIdRequest } from "@/types/api/ApiRequestType";
import { QUERY_KEYS } from "@/hooks/api/queryKey";

export const useCongestionApi = ({ popupId }: PopUpIdRequest) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: QUERY_KEYS.DASHBOARD.CONGESTION(String(popupId)),
    queryFn: async () => {
      const response = await getCongestion({ popupId });
      return response.data;
    },
  });

  return { data, isError, isLoading };
};

export const useAvgPurchaseApi = ({ popupId }: PopUpIdRequest) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: QUERY_KEYS.DASHBOARD.AVG_PURCHASE(String(popupId)),
    queryFn: async () => {
      const response = await getAvgPurchase({ popupId });
      return response.data;
    },
  });

  return { data, isError, isLoading };
};

export const useTodayEntrantsApi = ({ popupId }: PopUpIdRequest) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: QUERY_KEYS.DASHBOARD.TODAY_ENTRANT(String(popupId)),
    queryFn: async () => {
      const response = await getTodayEntrants({ popupId });
      return response.data;
    },
  });

  return { data, isError, isLoading };
};

export const useTodayReservationsApi = ({ popupId }: PopUpIdRequest) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: QUERY_KEYS.DASHBOARD.TODAY_RESERVATION(String(popupId)),
    queryFn: async () => {
      const response = await getTodayReservations({ popupId });
      return response.data;
    },
  });

  return { data, isError, isLoading };
};

export const useBestItemsApi = ({ popupId }: PopUpIdRequest) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: QUERY_KEYS.DASHBOARD.BESTITEM(String(popupId)),
    queryFn: async () => {
      const response = await getBestItems({ popupId });
      return response.data;
    },
  });

  return { data, isError, isLoading };
};

export const useQuestionnaireApi = ({ popupId }: PopUpIdRequest) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: QUERY_KEYS.DASHBOARD.QUESTIONNAIRE(String(popupId)),
    queryFn: async () => {
      const responseponse = await getQuestionnaire({ popupId });
      return responseponse.data;
    },
  });

  return { data, isLoading, isError };
};

export const useConversionApi = ({ popupId }: PopUpIdRequest) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: QUERY_KEYS.DASHBOARD.CONVERSION(String(popupId)),
    queryFn: async () => {
      const response = await getConversion({ popupId });
      return response.data;
    },
  });

  return { data, isLoading, isError };
};

export const useVisitorApi = ({ popupId }: PopUpIdRequest) => {
  const { data, isLoading, isError } = useQuery<VisitorResponse>({
    queryKey: QUERY_KEYS.DASHBOARD.VISITOR(String(popupId)),
    queryFn: async () => {
      const response = await getVisitor({ popupId });
      return response.data;
    },
  });
  return { data, isLoading, isError };
};
