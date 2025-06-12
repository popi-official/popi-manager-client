import { getPopUpListRead } from "@/apis/PopUpListReadApi";
import { QUERY_KEYS } from "@/hooks/api/queryKey";
import { useQuery } from "@tanstack/react-query";

export const usePopUpListReadApi = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: QUERY_KEYS.POPUP.INDEX,
    queryFn: async () => {
      const response = await getPopUpListRead();
      return response.data;
    },
  });

  return { data, isLoading, isError };
};
