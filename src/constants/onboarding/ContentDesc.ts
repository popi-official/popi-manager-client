import OnBoarding1 from "@/assets/webps/onBoarding/onBoarding1.webp";
import OnBoarding2 from "@/assets/webps/onBoarding/onBoarding2.webp";
import OnBoarding3 from "@/assets/webps/onBoarding/onBoarding3.webp";
import OnBoarding4 from "@/assets/webps/onBoarding/onBoarding4.webp";

export type OnBoardingContentType = {
  id: number;
  title: string;
  imagePath: string;
  desc: string[];
};

export const ContentDesc: OnBoardingContentType[] = [
  {
    id: 1,
    title: "팝업 스토어 관리 서비스",
    imagePath: OnBoarding1,
    desc: [
      "K-pop 팝업 스토어, 이젠 직원 없이도 완벽하게!",
      "PoPI",
      "와 함께 스마트한 무인 매장 관리를 경험하세요!",
    ],
  },
  {
    id: 2,
    title: "대시보드 서비스",
    imagePath: OnBoarding2,
    desc: [
      "스토어의 데이터를 시각적으로 접근해보세요",
      "PoPI",
      "가 제공하는 데이터 분석을 활용해보세요!",
    ],
  },
  {
    id: 3,
    title: "설문지 분석 서비스",
    imagePath: OnBoarding3,
    desc: [
      "K-pop 팬들의 취향은 빠르게 변합니다.",
      "설문지를 작성하고 분석 리포트를 받아보세요!",
    ],
  },
  {
    id: 4,
    title: "발주 제안 서비스",
    imagePath: OnBoarding4,
    desc: [
      "지정된 발주 수량보다 재고 수량이 적다면",
      "알림으로 빠르게 발주 제안을 받아보세요!",
    ],
  },
];
