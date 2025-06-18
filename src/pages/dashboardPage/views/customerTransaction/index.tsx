import { useAvgPurchaseApi } from "@/hooks/api/useDashboardApi";
import CountCard from "@/pages/dashboardPage/views/@common/CountCard";
import Title from "@/pages/dashboardPage/views/@common/Title";
import NoDataComp from "@/pages/dashboardPage/views/@common/NoDataComp";
import Skeleton from "@/components/ui/Skeleton";
import QueryComponent from "@/components/common/QueryComponent";
import { usePopUpReadStore } from "@/stores/usePopUpReadStore";

const CustomerTransaction = () => {
  const popupId = usePopUpReadStore(state => state.popupId);
  const { data, isLoading, isError } = useAvgPurchaseApi({ popupId });

  const cardInfo = [
    {
      key: "total",
      title: "팝업 기간 내",
      data: data?.totalAverageAmount,
      bgCSS: "bg-mint02",
      valueCSS: "text-mint08 text-[56px]",
      unitCSS: "text-mint08 text-[40px]",
    },
    {
      key: "today",
      title: "TODAY",
      data: data?.todayAverageAmount,
      bgCSS: "bg-blue02",
      valueCSS: "text-blue07 text-[56px]",
      unitCSS: "text-blue07 text-[40px]",
    },
  ];

  return (
    <div className="w-[414px] flex-col" data-testid="dashboard-transaction">
      <Title title="1인 평균 구매액" />
      <div className="flex h-[394px] flex-col justify-between">
        {cardInfo.map(card => (
          <QueryComponent
            key={card.key}
            data={card.data}
            isLoading={isLoading}
            isError={isError}
            loadingFallback={<Skeleton height="h-[180px]" />}
            emptyFallback={<NoDataComp height="h-[180px]" />}
          >
            {data => (
              <CountCard
                title={card.title}
                bgCSS={card.bgCSS}
                value={data}
                valueCSS={card.valueCSS}
                unit="원"
                unitCSS={card.unitCSS}
              />
            )}
          </QueryComponent>
        ))}
      </div>
    </div>
  );
};

export default CustomerTransaction;
