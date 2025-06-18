import { OrderListItemType } from "@/types/OrderListPageType";
import { PendingActionType } from "..";
import { useState } from "react";
import { FormatDateTimeToString } from "@/utils/FormatDay";

type Props = {
  item: OrderListItemType;
  idx: number;
  changePendingAction: (_request: PendingActionType) => void;
};

export default function OrderListItem({
  item,
  idx,
  changePendingAction,
}: Props) {
  const [realCount, setRealCount] = useState<string>("");

  const getStateText = (item: OrderListItemType) => {
    switch (item.status) {
      case "PENDING":
        return (
          <div className="flex w-full justify-center gap-2">
            <button
              className="cursor-pointer px-4 py-2 border rounded-full bg-gray10 text-gray01 hover:bg-gray08"
              onClick={() =>
                changePendingAction({
                  item: { ...item, realCount: Number(realCount) },
                  status: "COMPLETED",
                })
              }
            >
              승인
            </button>
            <button
              className="cursor-pointer px-4 py-2 border rounded-full hover:bg-gray03"
              onClick={() =>
                changePendingAction({
                  item: { ...item, realCount: Number(realCount) },
                  status: "CANCELED",
                })
              }
            >
              취소
            </button>
          </div>
        );
      case "COMPLETED":
        return <span>완료</span>;
      case "CANCELED":
        return <span>취소</span>;
      default:
        return status;
    }
  };

  return (
    <tr className="hover:bg-gray02 transition-colors duration-150">
      <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray10">
        {idx + 1}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-lg font-medium text-gray10">{item.itemName}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <div className="text-lg font-semibold text-gray10">
          {item.recommendCount}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        {item.status !== "PENDING" ? (
          <div>
            <span className="text-lg font-semibold text-gray10 w-20 px-2 py-1 ">
              {item.realCount === -1 ? "-" : item.realCount}
            </span>
          </div>
        ) : (
          <input
            className="text-lg font-medium text-gray10 w-20 px-2 py-1 border border-gray07 rounded bg-gray01 text-center placeholder:text-gray07"
            placeholder={String(item.recommendCount)}
            value={realCount}
            onChange={e => setRealCount(e.target.value)}
          />
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center text-lg text-gray09">
        {FormatDateTimeToString(new Date(item.lastRestockDateTime), 24).replace(
          "T",
          " ",
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        {getStateText(item)}
      </td>
    </tr>
  );
}
