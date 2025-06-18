import { useState } from "react";
import { Cell, Pie, PieChart, Tooltip, TooltipProps } from "recharts";
import Title from "@/pages/dashboardPage/views/@common/Title";
import CustomTooltip from "@/pages/dashboardPage/views/@common/CustomTooltip";
import { useQuestionnaireApi } from "@/hooks/api/useDashboardApi";
import { QuestionnaireResponse } from "@/types/api/ApiResponseType";
import { Questions } from "@/constants/popUpCreate/Questions";
import NoDataComp from "@/pages/dashboardPage/views/@common/NoDataComp";
import Skeleton from "@/components/ui/Skeleton";
import QueryComponent from "@/components/common/QueryComponent";
import DropdownFilter from "@/pages/dashboardPage/views/@common/DropdownFilter";
import { usePopUpReadStore } from "@/stores/usePopUpReadStore";

const options = ["1번 문항", "2번 문항", "3번 문항", "4번 문항"];
const SIZE = 300;
const RADIUS = 150;
const colorSet = ["#ff7caf", "#cacafb", "#a2c9ff", "#c5efe8", "#ffd0a1"];

// "1번 문항"에서 숫자만 추출 (ex. "1번 문항" → 1)
const findQuestionNumber = (selected: string) => {
  const regex = /[0-9]+/;
  return Number(selected.match(regex));
};

// 응답자 수 총합 계산
const findQuestionTotal = (questionnaireData: QuestionnaireResponse) => {
  return questionnaireData.contents.reduce(
    (sum, content) => sum + content.selectedCount,
    0,
  );
};

// 선택된 문항 번호에 해당하는 설문 데이터 반환
const matchQA = (
  selected: string,
  surveys?: QuestionnaireResponse[],
): (QuestionnaireResponse & { total: number }) | null => {
  if (!surveys || surveys.length === 0) {
    return null;
  }

  const questionNumber = findQuestionNumber(selected);
  const found = surveys.find(q => q.surveyNumber === questionNumber);

  if (!found) {
    return null;
  }

  const total = findQuestionTotal(found);
  return { ...found, total };
};

const isZeroTotal = (questionnaireData: QuestionnaireResponse): boolean => {
  return questionnaireData.contents.every(
    content => content.selectedCount === 0,
  );
};

export default function DashBoardQuestionnaire() {
  const [selectedQuestion, setSelectedQuestion] = useState(options[0]);
  const popupId = usePopUpReadStore(state => state.popupId);
  const { surveys, isLoading, isError } = useQuestionnaireApi({ popupId });

  const handleQuestion = (selected: string) => {
    setSelectedQuestion(selected);
  };

  const matchQuestion = (selected: string): string => {
    const questionNumber = findQuestionNumber(selected);
    const target = Questions.find(q => q.questionNumber === questionNumber);
    return `Q${target?.questionNumber}. ${target?.title}`;
  };

  return (
    <div
      className="flex flex-col"
      data-testid="dashboard-questionnaire-data-exist"
    >
      <div className="relative flex gap-[20px]">
        <Title title="설문지 분석" />
        <div className="ml-2">
          <DropdownFilter
            value={selectedQuestion}
            options={options}
            onChange={handleQuestion}
          />
        </div>
      </div>

      <QueryComponent
        data={surveys}
        isLoading={isLoading}
        isError={isError}
        loadingFallback={
          <div className="w-[1360px] h-[662px] rounded-[50px] overflow-hidden">
            <Skeleton />
          </div>
        }
        emptyFallback={
          <div className="w-[1360px] h-[662px] bg-gray02 rounded-[50px]">
            <NoDataComp />
          </div>
        }
      >
        {data => {
          const matched = matchQA(selectedQuestion, data);
          if (!matched || matched.contents.length === 0) {
            return (
              <div className="w-[1360px] h-[662px] bg-gray02 rounded-[50px] flex items-center justify-center">
                <NoDataComp />
              </div>
            );
          }
          return (
            <div className="w-[1360px] h-[662px] bg-gray02 rounded-[50px] px-[60px] py-[45px]">
              <p className="font-semibold text-[36px]">
                {matchQuestion(selectedQuestion)}
              </p>
              <div className="flex">
                <div className="w-[1240px] h-[490px] bg-gray01 mt-[40px] rounded-[40px] px-[40px] py-[30px] flex justify-between">
                  {/* 왼쪽 - 답변 리스트 */}
                  <div className="flex flex-col gap-[20px] w-[458px]">
                    {matched.contents.map((content, idx) => (
                      <div key={idx}>
                        <div className="rounded-[20px] bg-gray02 text-[20px] flex items-center h-[72px] w-full">
                          <span className="mr-4 w-[64px] h-full flex items-center justify-center rounded-l-[20px] text-[32px] bg-blue02">
                            {idx + 1}
                          </span>
                          <p className="text-[20px] ml-[30px]">
                            {content.title}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* 오른쪽 - 파이 차트 */}
                  <div className="flex flex-col items-end h-full">
                    <p className="text-[20px] font-medium text-gray08">
                      전체 응시자 수: {matched.total}명
                    </p>
                    <div className="flex justify-center gap-[80px] items-center">
                      {isZeroTotal(matched) ? (
                        // 모든 항목의 값이 0인 경우 메시지 표시
                        <div className="flex items-center justify-center w-[300px] h-[300px]">
                          <p className="text-[20px] text-gray08 text-center">
                            아직 응답한 데이터가 없습니다.
                          </p>
                        </div>
                      ) : (
                        // 정상적인 파이 차트 표시
                        <PieChart width={SIZE} height={SIZE}>
                          <Tooltip
                            cursor={{ fill: "transparent" }}
                            content={(props: TooltipProps<number, string>) => {
                              if (
                                !props.active ||
                                !props.payload ||
                                props.payload.length === 0
                              )
                                return null;

                              const targetPayload = props.payload[0].payload;
                              return (
                                <CustomTooltip
                                  active={props.active}
                                  payload={[
                                    {
                                      value: targetPayload.selectedCount,
                                      name: targetPayload.title,
                                      dataKey: "selectedCount",
                                    },
                                  ]}
                                  label={targetPayload.title}
                                  unitSuffix="명"
                                  highlightColor={
                                    colorSet[
                                      props.payload[0].dataKey ===
                                      "selectedCount"
                                        ? matched.contents.findIndex(
                                            c =>
                                              c.title === targetPayload.title,
                                          ) % colorSet.length
                                        : 0
                                    ]
                                  }
                                />
                              );
                            }}
                          />

                          <Pie
                            data={matched.contents}
                            innerRadius={0}
                            outerRadius={RADIUS}
                            dataKey="selectedCount"
                            nameKey="title"
                            cx="50%"
                            cy="50%"
                            paddingAngle={0}
                          >
                            {matched.contents.map((_, idx) => (
                              <Cell
                                key={idx}
                                fill={colorSet[idx % colorSet.length]}
                              />
                            ))}
                          </Pie>
                        </PieChart>
                      )}
                      <div className="grid grid-cols-2 gap-x-6 gap-y-4 h-[100px]">
                        {matched.contents.map((content, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span
                              className="w-[38px] h-[18px] rounded-[8px]"
                              style={{
                                backgroundColor:
                                  colorSet[idx % colorSet.length],
                              }}
                            />
                            <span className="flex gap-2">
                              <span>{idx + 1}번</span>
                              {isZeroTotal(matched) && (
                                <span className="text-gray06">
                                  ({content.selectedCount}명)
                                </span>
                              )}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </QueryComponent>
    </div>
  );
}
