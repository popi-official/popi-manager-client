import { getStockNotificationList } from "@/apis/StockNotificationListApi";
import { PopUpIdRequest } from "@/types/api/ApiRequestType";
import { useQuery } from "@tanstack/react-query";

export const useStockNotificationListApi = ({ popupId }: PopUpIdRequest) => {
  const query = useQuery({
    queryKey: ["stockNotification"],
    queryFn: async () => {
      const response = await getStockNotificationList({ popupId });
      return response.data;
    },
    refetchInterval: 10 * 60 * 1000,
    refetchIntervalInBackground: true,
  });

  return {
    notifications: query.data,
    isLoading: query.isLoading,
    error: query.error,
  };
};
