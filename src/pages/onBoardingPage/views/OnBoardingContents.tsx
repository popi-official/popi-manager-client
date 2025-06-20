import React from "react";
import ConditionalComponent from "@/components/common/ConditionalComponent";
import { OnBoardingContentType } from "@/constants/onboarding/ContentDesc";

type Props = {
  info: OnBoardingContentType;
};

export default function OnBoardingContents({ info }: Props) {
  return (
    <div className="flex gap-[74px] items-center">
      <div>
        <img
          src={info.imagePath}
          loading={info.id === 1 ? "eager" : "lazy"}
          className="rounded-[30px] max-w-[526px] h-auto"
        />
      </div>
      <div>
        <p className="font-bold text-[40px]  text-main06">0{info.id}</p>
        <p className="font-bold text-[44px]">{info.title}</p>
        <div className="text-[26px] font-medium">
          {info.desc.map((item, idx, arr) => (
            <React.Fragment key={idx}>
              <ConditionalComponent when={item.startsWith("PoPI")}>
                <span
                  lang="en"
                  className="text-[28px] md:text-[22px] text-main04"
                >
                  {item}
                </span>
              </ConditionalComponent>

              <ConditionalComponent
                when={
                  !item.startsWith("PoPI") &&
                  idx > 0 &&
                  arr[idx - 1].startsWith("PoPI")
                }
              >
                <span className="md:text-[22px]">{item}</span>
              </ConditionalComponent>

              <ConditionalComponent
                when={
                  !item.startsWith("PoPI") &&
                  !(idx > 0 && arr[idx - 1].startsWith("PoPI"))
                }
              >
                <p className="text-[26px] md:text-[22px] font-medium">{item}</p>
              </ConditionalComponent>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
