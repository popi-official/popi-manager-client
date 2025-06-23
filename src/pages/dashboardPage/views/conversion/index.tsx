import { useConversionApi } from "@/hooks/api/useDashboardApi";
import { usePopUpReadStore } from "@/stores/usePopUpReadStore";
import Title from "@/pages/dashboardPage/views/@common/Title";
import ConversionRateCard from "@/pages/dashboardPage/views/conversion/ConversionRateCard";

export default function Conversion() {
  const popupId = usePopUpReadStore(state => state.popupId);
  const { data, isLoading, isError } = useConversionApi({ popupId });

  return (
    <div className="flex flex-col" data-testid="dashboard-conversionRate">
      <Title title="구매전환율" />
      <div className="flex justify-between">
        <ConversionRateCard
          title="하위 상품 TOP 6"
          data={data?.low}
          isLoading={isLoading}
          isError={isError}
          barColor="#FFDCEA"
          lineColor="#9F9FF8"
          tooltipColorClass={{
            interested: "text-purple07",
            purchased: "text-main03",
            rate: "text-blue07",
          }}
          legendColors={{
            interested: "#9F9FF8",
            purchased: "#FFB4D1",
          }}
        />
        <ConversionRateCard
          title="상위 상품 TOP 6"
          data={data?.high}
          isLoading={isLoading}
          isError={isError}
          barColor="#C5EFE8"
          lineColor="#78B0FF"
          tooltipColorClass={{
            interested: "text-blue07",
            purchased: "text-mint07",
            rate: "text-main04",
          }}
          legendColors={{
            interested: "#78B0FF",
            purchased: "#C5EFE8",
          }}
        />
      </div>
    </div>
  );
}
