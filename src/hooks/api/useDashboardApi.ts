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

export const useCongestionApi = ({ popupId }: PopUpIdRequest) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["congestion", "dashboard"],
    queryFn: async () => {
      const res = await getCongestion({ popupId });
      return res.data;
    },
  });

  return { data, isError, isLoading };
};

export const useAvgPurchaseApi = ({ popupId }: PopUpIdRequest) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["avgPurchase", "dashboard"],
    queryFn: async () => {
      const res = await getAvgPurchase({ popupId });
      return res.data;
    },
  });

  return { data, isError, isLoading };
};

export const useTodayEntrantsApi = ({ popupId }: PopUpIdRequest) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["todayEntrants", "dashboard"],
    queryFn: async () => {
      const res = await getTodayEntrants({ popupId });
      return res.data;
    },
  });

  return { data, isError, isLoading };
};

export const useTodayReservationsApi = ({ popupId }: PopUpIdRequest) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["todayReservation", "dashboard"],
    queryFn: async () => {
      const res = await getTodayReservations({ popupId });
      return res.data;
    },
  });

  return { data, isError, isLoading };
};

export const useBestItemsApi = ({ popupId }: PopUpIdRequest) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["top3", "dashboard"],
    queryFn: async () => {
      const res = await getBestItems({ popupId });
      return res.data;
    },
  });

  return { data, isError, isLoading };
};

export const useQuestionnaireApi = ({ popupId }: PopUpIdRequest) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["questionnaire", "dashboard"],
    queryFn: async () => {
      const response = await getQuestionnaire({ popupId });
      return response.data;
    },
  });

  return {
    surveys: data?.surveys,
    totalCount: data?.totalCount,
    isLoading,
    isError,
  };
};

export const useConversionApi = ({ popupId }: PopUpIdRequest) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["conversion", "dashboard"],
    queryFn: async () => {
      const res = await getConversion({ popupId });
      return res.data;
    },
  });

  return { data, isError, isLoading };
};

export const useVisitorApi = ({ popupId }: PopUpIdRequest) => {
  const { data, isLoading, isError } = useQuery<VisitorResponse>({
    queryKey: ["visitor", "dashboard"],
    queryFn: async () => {
      const res = await getVisitor({ popupId });
      return res.data;
    },
  });
  return { data, isLoading, isError };
};
