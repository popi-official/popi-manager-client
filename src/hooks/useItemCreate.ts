import { ErrorMessage } from "@/utils/ErrorMessage";
import {
  ItemCreateRequest,
  PatchItemRequest,
} from "@/types/api/ApiRequestType";
import { useItemCreateApi } from "@/hooks/api/useItemCreateApi";
import { ImageType } from "@/types/ImageType";
import { usePopUpReadStore } from "@/stores/usePopUpReadStore";

export const useItemCreate = () => {
  const popupId = usePopUpReadStore(state => state.popupId);
  const {
    getItemPresignedUrlMutation,
    uploadItemImgToS3Mutation,
    itemCreateMutation,
    patchItemMutation,
    onProgress,
    postItemAddExcelMutation,
  } = useItemCreateApi({ popupId });

  const uploadImage = async (imageFile: File): Promise<string> => {
    const imageFileExtension = imageFile.name
      .split(".")
      .pop()
      ?.toUpperCase() as ImageType;

    const response = await getItemPresignedUrlMutation.mutateAsync({
      imageFileExtension,
      imageDirectory: "ITEM",
    });

    const presignedUrl = response.data.presignedUrl;
    const imageUrl = presignedUrl.split("?")[0];

    await uploadItemImgToS3Mutation.mutateAsync({
      imageFile,
      presignedUrl,
    });

    return imageUrl;
  };

  const createItem = async ({
    imageFile,
    data,
  }: {
    imageFile: File;
    data: ItemCreateRequest;
  }) => {
    try {
      const imageUrl = await uploadImage(imageFile);
      const itemForm: ItemCreateRequest = {
        ...data,
        imageUrl,
      };

      const response = await itemCreateMutation.mutateAsync(itemForm);
      return response.status;
    } catch (error) {
      throw new Error(`상품 등록 오류 ${ErrorMessage(error)}`);
    }
  };

  const patchItem = async ({ itemId, minStock }: PatchItemRequest) => {
    try {
      const response = await patchItemMutation.mutateAsync({
        itemId,
        minStock,
        popupId,
      });

      return response.data;
    } catch (error) {
      throw new Error(`상품 패치 오류 ${ErrorMessage(error)}`);
    }
  };

  const createItemExcel = async (excelFile: File) => {
    try {
      const response = await postItemAddExcelMutation.mutateAsync(excelFile);
      return response.status;
    } catch (error) {
      throw new Error(`엑셀 등록 오류: ${ErrorMessage(error)}`);
    }
  };
  return { createItem, patchItem, createItemExcel, onProgress };
};
