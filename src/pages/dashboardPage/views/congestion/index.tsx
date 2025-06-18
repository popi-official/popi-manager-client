import { useEffect, useState } from "react";
import { Days } from "@/constants/dashboard/Days";
import { useCongestionApi } from "@/hooks/api/useDashboardApi";
import { DayOfWeek } from "@/types/CongestionType";
import Title from "@/pages/dashboardPage/views/@common/Title";
import NoDataComp from "@/pages/dashboardPage/views/@common/NoDataComp";
import QueryComponent from "@/components/common/QueryComponent";
import Skeleton from "@/components/ui/Skeleton";
import CongestionChart from "@/pages/dashboardPage/views/congestion/CongestionChart";
import CongestionDaySelector from "@/pages/dashboardPage/views/congestion/CongestionDaySelector";
import { usePopUpReadStore } from "@/stores/usePopUpReadStore";

const Congestion = () => {
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>(Days[0]);
  const popupId = usePopUpReadStore(state => state.popupId);
  const { data, isLoading, isError } = useCongestionApi({ popupId });

  // 오늘 요일에 맞는 버튼 자동 선택
  useEffect(() => {
    if (data) {
      const today = new Date().getDay();
      setSelectedDay(Days[today === 0 ? 6 : today - 1]);
    }
  }, [data]);

  return (
    <div className="flex flex-col" data-testid="dashboard-congestion">
      <Title title="혼잡도 분석" />
      <div className="relative w-[660px] h-[510px] bg-gray02 rounded-[50px] px-6">
        {/* 요일 버튼 */}
        <CongestionDaySelector
          selectedDay={selectedDay}
          onChange={setSelectedDay}
        />
        {/* 그래프 영역 */}
        <QueryComponent
          data={data?.[selectedDay]}
          isLoading={isLoading}
          isError={isError}
          loadingFallback={<Skeleton height="h-[394px]" />}
          emptyFallback={<NoDataComp height="h-[394px]" />}
        >
          {data => (
            <div className="absolute bottom-6 w-[612px] h-[394px] bg-gray01 rounded-[40px] flex justify-center">
              {/* 혼잡도 분석 그래프 */}
              <CongestionChart dayData={data} />
            </div>
          )}
        </QueryComponent>
      </div>
    </div>
  );
};

export default Congestion;
