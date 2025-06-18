import { useNavigate } from "react-router-dom";
import ItemDisplay from "./views/ItemDisplay";
import { useItemListApi } from "@/hooks/api/useItemListApi";
import ItemCreateExcelModal from "./views/ItemCreateExcelModal";
import { useState } from "react";
import ConditionalComponent from "@/components/common/ConditionalComponent";
import { usePopUpReadStore } from "@/stores/usePopUpReadStore";

const ItemListPage = () => {
  const popupId = usePopUpReadStore(state => state.popupId);
  const { data } = useItemListApi({ popupId });
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className="py-8 flex flex-col min-h-[calc(100vh-200px)]">
      <div className="flex justify-end gap-3 mb-10 px-10">
        <button
          className="cursor-pointer px-4 py-2 bg-gray01 border border-gray10 text-gray10 rounded-full text-[20px] font-semibold hover:bg-gray10 hover:text-gray01 transition-colors duration-300"
          onClick={() => setIsModalOpen(true)}
        >
          전체 상품 등록
        </button>
        <button
          id="item-create-button"
          onClick={() => navigate("/items/create")}
          className="cursor-pointer px-4 py-2 bg-gray01 border border-gray10 text-gray10 rounded-full text-[20px] font-semibold hover:bg-gray10 hover:text-gray01 transition-colors duration-300"
        >
          상품 등록
        </button>
      </div>

      {isModalOpen && (
        <ItemCreateExcelModal closeModal={() => setIsModalOpen(false)} />
      )}

      <ConditionalComponent
        when={data}
        fallback={
          <div className="flex flex-col items-center justify-center flex-grow">
            <p className="text-[32px] text-gray10 font-medium">
              등록된 상품이 아직 없습니다
            </p>
            <p className="mt-4 text-[20px] text-gray10">
              우측 상단 <span className="text-main06">상품 등록 버튼</span>을
              눌러 상품을 등록해주세요!
            </p>
          </div>
        }
      >
        {data =>
          Object.entries(data).map(([k, v]) => (
            <div key={k}>
              <ItemDisplay displayName={k.toUpperCase()} items={v} />
            </div>
          ))
        }
      </ConditionalComponent>
    </div>
  );
};

export default ItemListPage;
