import Title from "@/pages/dashboardPage/views/@common/Title";
import checkCalendar from "@/assets/webps/dashboard/check-calendar.webp";
import ReservationByDayChart from "@/pages/dashboardPage/views/reservation/ReservationByDayChart";
import {
  useTodayEntrantsApi,
  useTodayReservationsApi,
} from "@/hooks/api/useDashboardApi";
import Skeleton from "@/components/ui/Skeleton";
import NoDataComp from "@/pages/dashboardPage/views/@common/NoDataComp";
import QueryComponent from "@/components/common/QueryComponent";
import CountCard from "@/pages/dashboardPage/views/@common/CountCard";
import { usePopUpReadStore } from "@/stores/usePopUpReadStore";

const Reservation = () => {
  const popupId = usePopUpReadStore(state => state.popupId);
  const entrants = useTodayEntrantsApi({ popupId });
  const reservations = useTodayReservationsApi({ popupId });

  const cardInfo = [
    {
      key: "reserved",
      title: "예약자 수",
      data: reservations.data?.reservedCount,
      isLoading: reservations.isLoading,
      isError: reservations.isError,
      bgCSS: "bg-main01",
      valueCSS: "text-main04 text-[64px]",
      unitCSS: "text-main04 text-[40px]",
    },
    {
      key: "entrant",
      title: "입장자 수",
      data: entrants.data?.entrantCount,
      isLoading: entrants.isLoading,
      isError: entrants.isError,
      bgCSS: "bg-purple02",
      valueCSS: "text-purple06 text-[64px]",
      unitCSS: "text-purple06 text-[40px]",
    },
  ];

  return (
    <div className="w-[906px] flex-col" data-testid="dashboard-reservation">
      <Title title="예약 분석" />
      <div className="w-[906px] h-[394px] flex justify-between">
        {/* CountCard 2개 */}
        <div className="w-[314px] flex flex-col justify-between">
          {/* 예약자 수 */}
          {cardInfo.map(card => (
            <QueryComponent
              key={card.key}
              data={card.data}
              isLoading={card.isLoading}
              isError={card.isError}
              loadingFallback={<Skeleton height="h-[180px]" />}
              emptyFallback={<NoDataComp height="h-[180px]" />}
            >
              {data => (
                <CountCard
                  title={card.title}
                  bgCSS={card.bgCSS}
                  value={data}
                  valueCSS={card.valueCSS}
                  unit="명"
                  unitCSS={card.unitCSS}
                />
              )}
            </QueryComponent>
          ))}
        </div>

        {/* 요일별 예약자 수 */}
        <div className="flex flex-col justify-between w-[552px] h-[394px] bg-gray02 rounded-[50px] px-[30px] pt-[22px] pb-[30px]">
          <div className="flex ml-[92px] gap-[10px] items-center">
            <img src={checkCalendar} alt="calendar" width={60} height={60} />
            <span className="font-[500] text-gray10 text-[30px]">
              요일별 예약자 수
            </span>
          </div>

          <QueryComponent
            data={reservations.data?.chart}
            isLoading={reservations.isLoading}
            isError={reservations.isError}
            loadingFallback={<Skeleton />}
            emptyFallback={<NoDataComp />}
          >
            {data => <ReservationByDayChart data={data} />}
          </QueryComponent>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
