import { useBestItemsApi } from "@/hooks/api/useDashboardApi";
import Skeleton from "@/components/ui/Skeleton";
import QueryComponent from "@/components/common/QueryComponent";
import NoDataComp from "@/pages/dashboardPage/views/@common/NoDataComp";
import BestItemCard from "@/pages/dashboardPage/views/bestItem/BestItemCard";
import Title from "@/pages/dashboardPage/views/@common/Title";
import { usePopUpReadStore } from "@/stores/usePopUpReadStore";

const BestItem = () => {
  const popupId = usePopUpReadStore(state => state.popupId);
  const {
    data: bestItemData,
    isLoading,
    isError,
  } = useBestItemsApi({ popupId });

  return (
    <div data-testid="dashboard-bestItems">
      {/* Title */}
      <div className="flex items-start gap-6">
        <Title title="실시간 인기상품" />
      </div>

      {/* Top 3 카드 */}
      <QueryComponent
        data={bestItemData}
        isLoading={isLoading}
        isError={isError}
        loadingFallback={
          <div className="flex justify-center gap-[60px] h-[512px] mt-2">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} width="w-[400px]" rounded="rounded-[50px]" />
            ))}
          </div>
        }
        emptyFallback={
          <NoDataComp
            height="h-[512px]"
            rounded="rounded-[50px]"
            className="mt-2"
          />
        }
      >
        {data => (
          <div className="flex justify-center gap-[60px] mt-2">
            {data.map((item, index) => (
              <BestItemCard key={item.itemId} item={item} index={index} />
            ))}
          </div>
        )}
      </QueryComponent>
    </div>
  );
};

export default BestItem;
