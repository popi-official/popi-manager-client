import Title from "@/pages/dashboardPage/views/@common/Title";
import { mapGenderData, mapAgeData } from "@/utils/VisitorColorMapper";
import VisitorPieChart from "@/pages/dashboardPage/views/visitor/VisitorPieChart";
import { useVisitorApi } from "@/hooks/api/useDashboardApi";
import NoDataComp from "@/pages/dashboardPage/views/@common/NoDataComp";
import QueryComponent from "@/components/common/QueryComponent";
import Skeleton from "@/components/ui/Skeleton";
import Label from "@/pages/dashboardPage/views/visitor/Label";
import { usePopUpReadStore } from "@/stores/usePopUpReadStore";

const Visitor = () => {
  const popupId = usePopUpReadStore(state => state.popupId);
  const { data, isLoading, isError } = useVisitorApi({ popupId });
  const gender = data?.gender;
  const age = data?.age;
  const isEmpty = !gender || gender.length === 0 || !age || age.length === 0;

  return (
    <div className="flex flex-col w-[660px]" data-testid="dashboard-visitor">
      <Title title="팝업스토어 방문자 분석" />

      <div className="relative bg-gray02 w-[660px] h-[510px] rounded-[50px] pt-[92px] pb-[24px] px-[24px]">
        {/* 레이블 */}
        <Label text="성별" position="left" />
        <Label text="나이" position="right" />

        {/* 그래프 영역 */}
        <QueryComponent
          data={isEmpty ? undefined : { gender, age }}
          isLoading={isLoading}
          isError={isError}
          loadingFallback={<Skeleton height="h-[394px]" />}
          emptyFallback={<NoDataComp height="h-[394px]" />}
        >
          {({ gender, age }) => {
            const genderData = mapGenderData(gender);
            const ageData = mapAgeData(age);

            return (
              <div className="absolute bg-gray01 gap-[100px] bottom-6 w-[612px] h-[394px] rounded-[40px] flex items-center justify-center overflow-hidden">
                {/* 성별 그래프 */}
                <VisitorPieChart
                  data={genderData}
                  gradIdPrefix="genderGrad"
                  innerRadius={40}
                />
                {/* 나이대 그래프 */}
                <VisitorPieChart data={ageData} gradIdPrefix="ageGrad" />
              </div>
            );
          }}
        </QueryComponent>
      </div>
    </div>
  );
};

export default Visitor;
