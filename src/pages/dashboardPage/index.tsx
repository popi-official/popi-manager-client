import BestItem from "@/pages/dashboardPage/views/bestItem";
import Congestion from "@/pages/dashboardPage/views/congestion";
import Visitor from "@/pages/dashboardPage/views/visitor";
import CustomerTransaction from "@/pages/dashboardPage/views/customerTransaction";
import Reservation from "@/pages/dashboardPage/views/reservation";
import Conversion from "@/pages/dashboardPage/views/conversion";
import Questionnaire from "@/pages/dashboardPage/views/questionnaire";

const DashBoardPage = () => {
  return (
    <div className="w-[1360px] mx-auto flex flex-col gap-[70px] pt-[50px] pb-[86px]">
      <BestItem />
      <div className="flex w-[1360px] justify-between">
        <Congestion />
        <Visitor />
      </div>
      <div className="flex w-[1360px] justify-between">
        <Reservation />
        <CustomerTransaction />
      </div>
      <Questionnaire />
      <Conversion />
    </div>
  );
};

export default DashBoardPage;
