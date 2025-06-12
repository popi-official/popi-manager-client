import { getOrderList, patchChangeOrderItemStatus } from "@/apis/OrderListApi";
import { PatchChangeOrderItemRequest } from "@/types/api/ApiRequestType";
import { QUERY_KEYS } from "@/hooks/api/queryKey";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const useGetOrderListApi = ({
  size,
  popupId,
}: {
  size: number;
  popupId: number;
}) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.ORDER_ITEM.INDEX,
    queryFn: ({ pageParam }) =>
      getOrderList({ lastOrderItemId: pageParam, size, popupId }),
    getNextPageParam: response => {
      const lastPage = response.data;

      if (lastPage.isLast) {
        return undefined;
      }

      const lastItem = lastPage.content[lastPage.content.length - 1];
      return lastItem.orderItemId;
    },
    initialPageParam: undefined as number | undefined,
  });
};

export const usePatchChangeOrderItemStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ orderItemId, qty, status }: PatchChangeOrderItemRequest) =>
      patchChangeOrderItemStatus({ orderItemId, qty, status }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["orderItem"] }),
  });
};
