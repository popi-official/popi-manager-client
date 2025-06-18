import NoDataComp from "@/pages/dashboardPage/views/@common/NoDataComp";
import { useConversionApi } from "@/hooks/api/useDashboardApi";
import { ConversionRateChart } from "@/pages/dashboardPage/views/ConversionRateChart";
import Title from "@/pages/dashboardPage/views/@common/Title";
import Skeleton from "@/components/ui/Skeleton";
import QueryComponent from "@/components/common/QueryComponent";
import { usePopUpReadStore } from "@/stores/usePopUpReadStore";

export default function DashBoardConversionRate() {
  const popupId = usePopUpReadStore(state => state.popupId);
  const { data, isLoading, isError } = useConversionApi({ popupId });

  return (
    <div className="flex flex-col" data-testid="dashboard-conversionRate">
      <Title title="구매전환율" />
      <div className="flex justify-between">
        {/* 하위 상품 TOP 6 */}
        <div className="relative w-[660px] h-[510px] bg-gray02 rounded-[50px] px-6 flex justify-center">
          <div className="mt-7 flex text-gray09 font-medium text-[28px]">
            하위 상품 TOP 6
          </div>
          <QueryComponent
            data={data?.low}
            isLoading={isLoading}
            isError={isError}
            loadingFallback={
              <div className="absolute bottom-6 w-[612px] h-[394px] rounded-[40px] overflow-hidden">
                <Skeleton />
              </div>
            }
            emptyFallback={
              <div className="absolute bottom-6 w-[612px] h-[394px]">
                <NoDataComp />
              </div>
            }
          >
            {lowData => (
              <div className="absolute bottom-6 w-[612px] h-[394px] bg-gray01 rounded-[40px] flex justify-center">
                <ConversionRateChart
                  data={lowData}
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
              </div>
            )}
          </QueryComponent>
        </div>

        {/* 상위 상품 TOP 6 */}
        <div className="relative w-[660px] h-[510px] bg-gray02 rounded-[50px] px-6 flex justify-center">
          <div className="mt-7 flex text-gray09 font-medium text-[28px]">
            상위 상품 TOP 6
          </div>
          <QueryComponent
            data={data?.high}
            isLoading={isLoading}
            isError={isError}
            loadingFallback={
              <div className="absolute bottom-6 w-[612px] h-[394px] rounded-[40px] overflow-hidden">
                <Skeleton />
              </div>
            }
            emptyFallback={
              <div className="absolute bottom-6 w-[612px] h-[394px]">
                <NoDataComp />
              </div>
            }
          >
            {highData => (
              <div className="absolute bottom-6 w-[612px] h-[394px] bg-gray01 rounded-[40px] flex justify-center">
                <ConversionRateChart
                  data={highData}
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
            )}
          </QueryComponent>
        </div>
      </div>
    </div>
  );
}
