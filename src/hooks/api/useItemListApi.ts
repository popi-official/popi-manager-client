import { deleteItem, getItemList } from "@/apis/ItemListApi";
import { PopUpIdRequest } from "@/types/api/ApiRequestType";
import { QUERY_KEYS } from "@/hooks/api/queryKey";
import { ErrorMessage } from "@/utils/ErrorMessage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useItemListApi = ({ popupId }: PopUpIdRequest) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: QUERY_KEYS.ITEM.INDEX,
    queryFn: async () => {
      const response = await getItemList({ popupId });
      return response.data;
    },
  });

  return { data, isLoading, isError, error, refetch };
};

export const useItemDeleteApi = ({ popupId }: PopUpIdRequest) => {
  const queryClient = useQueryClient();
  const deleteItemMutation = useMutation({
    mutationFn: async (itemId: string) => {
      await deleteItem({ itemId, popupId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ITEM.INDEX });
    },
    throwOnError: true,
    onError: error => {
      throw new Error(`상품 삭제 에러 : ${ErrorMessage(error)}`);
    },
  });

  return { deleteItemMutation };
};
