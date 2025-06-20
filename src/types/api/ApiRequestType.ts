import { OrderItemStatus } from "../OrderListPageType";

export type LoginRequest = {
  username: string;
  password: string;
};

export type PopUpIdRequest = { popupId: number };

export type ItemCreateRequest = {
  popupId: number;
  name: string;
  imageUrl: string;
  price: number;
  stock: number;
  minStock: number;
  location: string;
};

export type GetPresignedUrlRequest = {
  imageFileExtension: string;
  imageDirectory: string;
};

export type UploadImageToS3Request = {
  presignedUrl: string;
  imageFile: File;
};

export type PopUpCreateRequest = {
  name: string;
  imageUrl: string;
  popupStartDate: string;
  popupEndDate: string;
  reservationOpenDateTime: string;
  reservationCloseDateTime: string;
  runOpenTime: string;
  runCloseTime: string;
  totalCapacity: number;
  timeCapacity: number;
  roadAddress: string;
  detailAddress: string;
  latitude: number;
  longitude: number;
};

export type ChoiceCreateRequest = {
  optionList: string[];
};

export type PopUpWithChoicesRequest = {
  popupCreateRequest: PopUpCreateRequest;
  choiceCreateRequestList: ChoiceCreateRequest[];
};

export type PatchItemRequest = {
  itemId: string;
  minStock: number;
};

export type ItemAddExcelRequest = {
  excelFile: File;
  onProgress?: (_percentage: number) => void;
};

export type GetOrderListRequest = {
  lastOrderItemId: number | undefined;
  popupId: number;
  size: number;
};

export type PatchChangeOrderItemRequest = {
  orderItemId: number;
  qty: number;
  status: Omit<OrderItemStatus, "PENDING">;
};
