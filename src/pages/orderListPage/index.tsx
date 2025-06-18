import {
  useGetOrderListApi,
  usePatchChangeOrderItemStatus,
} from "@/hooks/api/useOrderListApi";
import OrderListItem from "./views/OrderListItem";
import Modal from "@/components/common/Modal";
import check from "@/assets/webps/common/check.webp";
import bin from "@/assets/webps/common/bin.webp";
import { useState } from "react";
import { OrderItemStatus, OrderListItemType } from "@/types/OrderListPageType";
import { useNavigate } from "react-router-dom";
import { usePopUpReadStore } from "@/stores/usePopUpReadStore";

export type PendingActionType = {
  item: OrderListItemType;
  status: Omit<OrderItemStatus, "PENDING">;
};

const OrderListPage = () => {
  const popupId = usePopUpReadStore(state => state.popupId);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetOrderListApi({ size: 5, popupId });
  const orderList = data?.pages.flatMap(item => item.data.content);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [pendingAction, setPendingAction] = useState<PendingActionType | null>(
    null,
  );
  const navigate = useNavigate();

  const { mutate: postChangeOrderItemStatus } = usePatchChangeOrderItemStatus();

  const handleUpdate = () => {
    if (!pendingAction) {
      return;
    }
    postChangeOrderItemStatus({
      orderItemId: pendingAction?.item.orderItemId,
      qty: pendingAction?.item.realCount,
      status: pendingAction?.status,
    });
    setShowModal(false);
    setShowConfirmModal(true);
  };

  const changePendingAction = (request: PendingActionType) => {
    setPendingAction(request);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="bg-gray01 rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <h2 className="text-3xl font-semibold text-gray10">주문 목록</h2>
        </div>

        <div className="overflow-x-auto border border-gray04 rounded-lg">
          <table className="w-full">
            <colgroup className="hidden lg:table-column-group">
              <col width={100} />
              <col width="*" />
              <col width={200} />
              <col width={200} />
              <col width={300} />
              <col width={200} />
            </colgroup>
            <thead>
              <tr className="bg-gray02 border-b border-gray04">
                <th className="px-6 py-4 text-left text-xl font-medium text-gray10 uppercase">
                  번호
                </th>
                <th className="px-6 py-4 text-left text-xl font-medium text-gray10 uppercase">
                  상품명
                </th>
                <th className="px-6 py-4 text-center text-xl font-medium text-gray10 uppercase">
                  추천 개수
                </th>
                <th className="px-6 py-4 text-center text-xl font-medium text-gray10 uppercase">
                  실제 발주 개수
                </th>
                <th className="px-6 py-4 text-center text-xl font-medium text-gray10 uppercase">
                  최근 입고일시
                </th>
                <th className="px-6 py-4 text-center text-xl font-medium text-gray10 uppercase">
                  상태
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray01 divide-y divide-gray04">
              {orderList && orderList.length > 0 ? (
                orderList.map((item, idx) => (
                  <OrderListItem
                    item={item}
                    idx={idx}
                    key={idx}
                    changePendingAction={changePendingAction}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="text-gray08">
                      <p className="text-sm">주문 데이터가 없습니다.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center">
        {hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-6 py-3 bg-main07 text-gray01 text-xl rounded-full hover:bg-main05 disabled:opacity-50"
          >
            {isFetchingNextPage ? "로딩 중" : "더보기"}
          </button>
        )}
      </div>

      <Modal
        isOpen={showModal}
        setIsOpen={setShowModal}
        content={`${pendingAction?.status === "COMPLETED" ? "발주를 승인하시겠습니까?" : "발주를 취소하시겠습니까?"}`}
        image={bin}
        confirmText="확인"
        cancelText="취소"
        onConfirm={() => handleUpdate()}
        onCancel={() => setShowModal(false)}
      />
      <Modal
        isOpen={showConfirmModal}
        setIsOpen={setShowConfirmModal}
        content={`완료되었습니다`}
        image={check}
        confirmText="확인"
        onConfirm={() => {
          setShowConfirmModal(false);
          navigate("/order-list");
        }}
      />
    </div>
  );
};

export default OrderListPage;
