import { deletePopUp } from "@/apis/PopUpListReadApi";
import { QUERY_KEYS } from "@/hooks/api/queryKey";
import { ErrorMessage } from "@/utils/ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePopUpDeleteApi = () => {
  const queryClient = useQueryClient();
  const deletePopUpMutation = useMutation({
    mutationFn: (popUpId: string) => deletePopUp(popUpId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.POPUP.INDEX });
    },
    throwOnError: true,
    onError: error => {
      throw new Error(`팝업 삭제 에러 : ${ErrorMessage(error)}`);
    },
  });

  return { deletePopUpMutation };
};
