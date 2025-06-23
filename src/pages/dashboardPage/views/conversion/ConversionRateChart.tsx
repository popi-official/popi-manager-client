import CustomCursor from "@/pages/dashboardPage/views/@common/CustomCursor";
import { GetConversionItemResponse } from "@/types/api/ApiResponseType";
import { useCallback } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  Tooltip,
  Legend,
  YAxis,
  TooltipProps,
} from "recharts";
import CustomBlurDot from "@/pages/dashboardPage/views/@common/CustomBlurDot";

type Props = {
  data: GetConversionItemResponse[];
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

export const ConversionRateChart = ({
  data,
  barColor,
  lineColor,
  tooltipColorClass,
  legendColors,
}: Props) => {
  // ConversionRateChart 전용 CustomTooltip
  const CustomTooltip = useCallback(
    ({ active, payload, label }: TooltipProps<number, string>) => {
      if (!active || !payload || payload.length < 2) return null;

      const interested =
        payload.find(p => p.dataKey === "interested")?.value ?? 0;
      const purchased =
        payload.find(p => p.dataKey === "purchased")?.value ?? 0;
      const conversionRatio = payload[0]?.payload?.conversionRatio ?? 0;

      return (
        <div className="bg-white border border-gray02 rounded-md p-3 shadow-sm">
          <p className="text-[18px] text-gray09 font-semibold mb-2">{label}</p>
          <p className={`text-[17px] text-gray07 font-semibold`}>
            관심자 수:
            <span className={`${tooltipColorClass.interested}`}>
              {" "}
              {interested}
            </span>
            명
          </p>
          <p className={`text-[17px] text-gray07 font-semibold`}>
            구매자 수:
            <span className={`${tooltipColorClass.purchased}`}>
              {" "}
              {purchased}
            </span>
            명
          </p>
          <p className={`text-[17px] text-gray07 font-semibold`}>
            구매전환율:
            <span className={`${tooltipColorClass.rate}`}>
              {" "}
              {conversionRatio}
            </span>
            %
          </p>
        </div>
      );
    },
    [tooltipColorClass],
  );

  // ConversionRateChart 전용 CustomLegend
  const CustomLegend = useCallback(
    () => (
      <div className="flex justify-end gap-4 pb-5 pr-4">
        <div className="flex items-center gap-2">
          <span
            className={`w-[12px] h-[12px] rounded-full`}
            style={{ backgroundColor: legendColors.interested }}
          />
          <span className="text-[16px] text-gray08 font-medium">관심자 수</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`w-[12px] h-[12px] rounded-full`}
            style={{ backgroundColor: legendColors.purchased }}
          />
          <span className="text-[16px] text-gray08 font-medium">구매자 수</span>
        </div>
      </div>
    ),
    [legendColors],
  );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        data={data}
        barSize={32}
        margin={{ top: 20, right: 36, left: 36, bottom: 26 }}
      >
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          interval={0}
          tick={props => {
            const { x, y, payload } = props;
            const value = payload.value;
            const displayValue =
              value.length > 7 ? `${value.substring(0, 7)}...` : value;

            return (
              <g transform={`translate(${x},${y})`}>
                <text
                  x={0}
                  y={0}
                  dy={16}
                  textAnchor="middle"
                  fill="#59595A"
                  fontSize={16}
                  fontWeight={600}
                >
                  {displayValue}
                </text>
              </g>
            );
          }}
        />
        <YAxis hide padding={{ bottom: 10 }} />
        <Tooltip cursor={<CustomCursor y1={60} />} content={CustomTooltip} />
        <Legend content={CustomLegend} verticalAlign="top" align="right" />{" "}
        <Bar dataKey="purchased" fill={barColor} radius={10} name="구매자 수" />
        <Line
          dataKey="interested"
          stroke={lineColor}
          strokeWidth={1}
          dot={<CustomBlurDot fillColor={lineColor} />}
          activeDot={false}
          name="관심자 수"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};
