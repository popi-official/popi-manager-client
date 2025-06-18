import { postCreatePresignedUrl, putImageToS3 } from "@/apis/image/ImageApi";
import { patchItem, postItemCreate } from "@/apis/ItemCreateApi";
import { postItemAddExcel } from "@/apis/ItemListApi";
import { PopUpIdRequest } from "@/types/api/ApiRequestType";
import { ErrorMessage } from "@/utils/ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useItemCreateApi = ({ popupId }: PopUpIdRequest) => {
  const queryClient = useQueryClient();
  const [onProgress, setOnProgress] = useState<number>(0);

  const getItemPresignedUrlMutation = useMutation({
    mutationFn: postCreatePresignedUrl,
    throwOnError: true,
    onError: error => {
      throw new Error(`PresignedUrl 발급 에러 : ${ErrorMessage(error)}`);
    },
  });

  const uploadItemImgToS3Mutation = useMutation({
    mutationFn: putImageToS3,
    throwOnError: true,
    onError: error => {
      throw new Error(`이미지 S3 업로드 에러 : ${ErrorMessage(error)}`);
    },
  });

  const itemCreateMutation = useMutation({
    mutationFn: postItemCreate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["itemList"] });
    },
    throwOnError: true,
    onError: error => {
      throw new Error(`상품 생성 에러: ${ErrorMessage(error)}`);
    },
  });

  const patchItemMutation = useMutation({
    mutationFn: patchItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["itemList"] });
    },
    throwOnError: true,
    onError: error => {
      throw new Error(`아이템 패치 에러 : ${ErrorMessage(error)}`);
    },
  });

  const postItemAddExcelMutation = useMutation({
    mutationFn: (excelFile: File) =>
      postItemAddExcel({
        excelFile,
        onProgress: percentage => {
          setOnProgress(percentage);
        },
        popupId,
      }),
    onSuccess: () => {
      setOnProgress(100);
      queryClient.invalidateQueries({ queryKey: ["itemList"] });
    },
    throwOnError: true,
    onError: error => {
      setOnProgress(0);
      throw new Error(`엑셀 업로드 오류 : ${ErrorMessage(error)}`);
    },
  });

  return {
    getItemPresignedUrlMutation,
    uploadItemImgToS3Mutation,
    itemCreateMutation,
    patchItemMutation,
    postItemAddExcelMutation,
    resetProgressState: () => {
      setOnProgress(0);
      postItemAddExcelMutation.reset();
    },
    onProgress,
  };
};
