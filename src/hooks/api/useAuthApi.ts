import {
  postLogin,
  postLogout,
  postRefreshAccessToken,
} from "@/apis/user/AuthApi";
import { useAuthStore } from "@/stores/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useAuthApi = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const invalidateAllQueries = () => {
    queryClient.clear();
  };

  const postLoginMutation = useMutation({
    mutationFn: postLogin,
    onSuccess: invalidateAllQueries,
  });

  const postLogoutMutation = useMutation({
    mutationFn: postLogout,
    onSuccess: invalidateAllQueries,
  });

  const postRefreshMutation = useMutation({
    mutationFn: postRefreshAccessToken,
    onSuccess: response => {
      invalidateAllQueries();
      useAuthStore.getState().setLogin(response.data.accessToken);
    },
    onError: () => {
      useAuthStore.getState().setLogout();
      invalidateAllQueries();
      navigate("/onBoarding", { replace: true });
    },
  });

  return { postLoginMutation, postLogoutMutation, postRefreshMutation };
};
