import { getStockNotificationList } from "@/apis/StockNotificationListApi";
import { QUERY_KEYS } from "@/hooks/api/queryKey";
import { PopUpIdRequest } from "@/types/api/ApiRequestType";
import { useQuery } from "@tanstack/react-query";

export const useStockNotificationListApi = ({ popupId }: PopUpIdRequest) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: QUERY_KEYS.STOCK_NOTIFICATION.LIST(),
    queryFn: async () => {
      const response = await getStockNotificationList({ popupId });
      return response.data;
    },
  });

  return { data, isLoading, isError };
};
