import Skeleton from "@/components/ui/Skeleton";
import NoDataComp from "@/pages/dashboardPage/views/@common/NoDataComp";
import QueryComponent from "@/components/common/QueryComponent";
import { ConversionRateChart } from "@/pages/dashboardPage/views/conversion/ConversionRateChart";
import { GetConversionItemResponse } from "@/types/api/ApiResponseType";

type Props = {
  title: string;
  data: GetConversionItemResponse[] | undefined;
  isLoading: boolean;
  isError: boolean;
  barColor: string;
  lineColor: string;
  tooltipColorClass: {
    interested: string;
    purchased: string;
    rate: string;
  };
  legendColors: {
    interested: string;
    purchased: string;
  };
};

const ConversionRateCard = ({
  title,
  data,
  isLoading,
  isError,
  barColor,
  lineColor,
  tooltipColorClass,
  legendColors,
}: Props) => {
  return (
    <div className="relative w-[660px] h-[510px] bg-gray02 rounded-[50px] px-6 flex justify-center">
      <div className="mt-7 flex text-gray09 font-medium text-[28px]">
        {title}
      </div>

      <QueryComponent
        data={data}
        isLoading={isLoading}
        isError={isError}
        loadingFallback={
          <Skeleton
            className="absolute bottom-6"
            width="w-[612px]"
            height="h-[394px]"
          />
        }
        errorFallback={
          <NoDataComp
            className="absolute bottom-6"
            width="w-[612px]"
            height="h-[394px]"
          />
        }
      >
        {data => (
          <div className="absolute bottom-6 w-[612px] h-[394px] bg-gray01 rounded-[40px] flex justify-center">
            <ConversionRateChart
              data={data}
              barColor={barColor}
              lineColor={lineColor}
              tooltipColorClass={tooltipColorClass}
              legendColors={legendColors}
            />
          </div>
        )}
      </QueryComponent>
    </div>
  );
};

export default ConversionRateCard;
