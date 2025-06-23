import CustomButton from "@/components/ui/CustomButton";
import React, { useEffect, useState } from "react";
import Modal from "@/components/common/Modal";
import bin from "@/assets/webps/common/bin.webp";
import check from "@/assets/webps/common/check.webp";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useItemCreate } from "@/hooks/useItemCreate";
import ItemCreateInputs from "@/pages/itemCreatePage/views/ItemCreateInputs";
import { usePopUpReadStore } from "@/stores/usePopUpReadStore";
import { useSelectedItemStore } from "@/stores/useSelectedItemStore";
import { ValidateAllField } from "@/utils/ValidateAllField";

const ItemCreatePage = () => {
  const popupId = usePopUpReadStore.getState().popupId;

  const [itemName, setItemName] = useState<string>("");
  const [itemPrice, setItemPrice] = useState<number>(0);
  const [itemStock, setItemStock] = useState<number>(0);
  const [itemMinStock, setItemMinStock] = useState<number>(0);
  const [itemLocation, setItemLocation] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [alertMessage, setAlertMessage] = useState<string>("");

  const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const location = useLocation();
  const { itemId } = useParams();
  const isPatchMode = !!itemId;

  const { createItem, patchItem } = useItemCreate();
  const { selectedItem, resetSelectedItem } = useSelectedItemStore();

  const handleCancel = () => {
    setIsAlertModalOpen(true);
  };

  const handleSave = async () => {
    if (!imageFile) return alert("이미지를 선택해주세요.");
    const data = {
      popupId,
      name: itemName,
      price: itemPrice,
      stock: itemStock,
      minStock: itemMinStock,
      location: itemLocation,
      imageUrl: URL.createObjectURL(imageFile),
    };

    if (!ValidateAllField(data)) {
      setAlertMessage("데이터를 모두 입력해주세요");
    }

    const response = await createItem({ imageFile, data });

    if (!response) {
      return null;
    }
    setIsSaveModalOpen(true);
  };

  const handlePatch = async () => {
    await patchItem({
      itemId: itemId!,
      minStock: selectedItem?.minStock as number,
    });
    setIsSaveModalOpen(true);
  };

  const handleConfirmBtn = () => {
    setIsAlertModalOpen(false);
    navigate("/items");
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemName(e.target.value);
  };

  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemPrice(Number(e.target.value));
  };

  const handleStock = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemStock(Number(e.target.value));
  };

  const handleMinStock = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemMinStock(Number(e.target.value));
  };

  const handleLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemLocation(e.target.value);
  };

  useEffect(() => {
    return () => {
      const currentPath = location.pathname;
      if (!currentPath.includes("/edit")) {
        resetSelectedItem();
      }
    };
  }, []);

  return (
    <div className="flex flex-col">
      <div>
        <div className="flex gap-[14px] mt-[46px] mr-[80px] justify-end">
          <CustomButton
            label="취소"
            cssOption="bg-gray01 border border-gray05 text-gray09 text-[20px] hover:bg-gray02 transition"
            onClick={handleCancel}
          />
          <CustomButton
            label={isPatchMode ? "수정" : "등록"}
            cssOption="bg-gray10 text-gray01 text-[20px] hover:opacity-50"
            onClick={isPatchMode ? handlePatch : handleSave}
          />
          {alertMessage}
        </div>
        <ItemCreateInputs
          name={itemName}
          price={itemPrice}
          stock={itemStock}
          minStock={itemMinStock}
          location={itemLocation}
          handleName={handleName}
          handlePrice={handlePrice}
          handleStock={handleStock}
          handleMinStock={handleMinStock}
          handleLocation={handleLocation}
          imageFile={imageFile}
          handleImageFile={setImageFile}
          isPatchMode={isPatchMode}
        />
      </div>
      <Modal
        isOpen={isAlertModalOpen}
        setIsOpen={setIsAlertModalOpen}
        content={
          isPatchMode
            ? "상품 수정을 취소하시겠어요?"
            : "상품 등록을 취소하시겠어요?"
        }
        image={bin}
        confirmText="취소하기"
        cancelText="돌아가기"
        onConfirm={() => navigate("/items")}
        onCancel={() => setIsAlertModalOpen(false)}
      />
      <Modal
        isOpen={isSaveModalOpen}
        setIsOpen={setIsSaveModalOpen}
        content={
          isPatchMode ? "상품이 수정되었습니다" : "상품이 등록되었습니다"
        }
        image={check}
        confirmText="확인"
        onConfirm={handleConfirmBtn}
      />
    </div>
  );
};

export default ItemCreatePage;
