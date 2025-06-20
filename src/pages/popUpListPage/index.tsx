import "swiper/css";
import "swiper/css/pagination";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import PopUpCard from "@/pages/popUpListPage/views/PopUpCard";
import Modal from "@/components/common/Modal";
import plusWhite from "@/assets/webps/popUpList/plus-white.webp";
import leftArrowGray09 from "@/assets/webps/common/left-arrow-gray09.webp";
import rightArrowGray09 from "@/assets/webps/common/right-arrow-gray09.webp";
import bin from "@/assets/webps/common/bin.webp";
import check from "@/assets/webps/common/check.webp";
import { usePopUpListReadApi } from "@/hooks/api/usePopUpListReadApi";
import { usePopUpDeleteApi } from "@/hooks/api/usePopUpDeleteApi";
import Loading from "@/components/ui/Loading";

const PopUpListPage = () => {
  const { data, isLoading } = usePopUpListReadApi();
  const { deletePopUpMutation } = usePopUpDeleteApi();
  const navigate = useNavigate();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);
  const cards = data;

  const handleDelete = (id: number) => {
    setIsConfirmModalOpen(true);
    setSelectedCardId(id);
  };

  const confirmDelete = async () => {
    if (selectedCardId === null) return;

    setIsConfirmModalOpen(false); // Confirm 모달 닫기
    setIsAlertModalOpen(true); // Alert 모달 열기
    const response = await deletePopUpMutation.mutateAsync(
      String(selectedCardId),
    );

    if (response.status === 200) {
      setSelectedCardId(null);
    }
  };

  const alertDelete = () => {
    setIsAlertModalOpen(false);
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const handleSwiperInit = (swiper: SwiperType) => {
    swiperRef.current = swiper;
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div className="bg-gray03 min-h-screen pb-10 pt-10">
      {/* 나의 팝업 List */}
      <div className="mx-auto w-[1360px] min-h-[600px] bg-gray01 pb-14 rounded-[50px]">
        <div className="flex items-start justify-between">
          <div className="ml-11 mt-[52px] flex items-center">
            <span className="text-[36px] tracking-[-2%] text-gray10">
              나의 팝업
            </span>
            <span lang="en" className="ml-4 text-[36px] text-main07">
              List
            </span>
          </div>
          {/* plus button */}
          <div
            data-testid="popup-create-btn"
            className="cursor-pointer flex justify-center items-center w-[70px] h-[70px] rounded-full bg-main07 mt-[50px] mr-11"
            onClick={() => {
              navigate("/popup-create");
            }}
          >
            <img src={plusWhite} alt="plus button" width={36} height={36} />
          </div>
        </div>

        {/* swiper */}
        <div className="flex justify-center mt-12">
          <div className="relative mx-auto w-[1296px]">
            {isLoading ? (
              <div className="flex justify-center items-center h-[342px]">
                <Loading />
              </div>
            ) : (
              <>
                <Swiper
                  className="popup-swiper w-[1010px] mx-auto"
                  centeredSlides={false}
                  slidesPerView={3}
                  spaceBetween={72}
                  loop={false}
                  navigation={{
                    prevEl: ".custom-prev",
                    nextEl: ".custom-next",
                  }}
                  modules={[Pagination, Navigation]}
                  onSlideChange={handleSlideChange}
                  onSwiper={handleSwiperInit}
                >
                  {cards && cards.length > 0 ? (
                    cards.map(card => (
                      <SwiperSlide
                        key={card.popupId}
                        className="h-[342px] w-[286px] flex flex-col justify-center items-center"
                      >
                        <PopUpCard
                          popupId={card.popupId}
                          name={card.name}
                          imageUrl={card.imageUrl}
                          onDeleteClick={() => handleDelete(card.popupId)}
                        />
                      </SwiperSlide>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <p className="mt-18 text-[32px] text-gray10 font-medium">
                        등록된 팝업이 없습니다.
                      </p>
                      <p className="mt-4 text-[20px] text-gray10">
                        우측 상단 <span className="text-main06">+ 버튼</span>을
                        눌러 팝업을 등록해주세요!
                      </p>
                    </div>
                  )}
                </Swiper>
                {/* prev & next 버튼 */}
                {cards && cards.length > 0 && (
                  <>
                    <div
                      className={`custom-prev absolute top-[110px] -translate-y-1/2 left-0 z-10 cursor-pointer transition-opacity duration-200 ${
                        isBeginning
                          ? "opacity-30 cursor-not-allowed"
                          : "opacity-100"
                      }`}
                    >
                      <img
                        src={leftArrowGray09}
                        alt="prev"
                        className="w-[35px] h-[35px]"
                      />
                    </div>
                    <div
                      className={`custom-next absolute top-[110px] -translate-y-1/2 right-0 z-10 cursor-pointer transition-opacity duration-200 ${
                        isEnd ? "opacity-30 cursor-not-allowed" : "opacity-100"
                      }`}
                    >
                      <img
                        src={rightArrowGray09}
                        alt="next"
                        className="w-[35px] h-[35px]"
                      />
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {/* Confirm 모달 */}
      <Modal
        isOpen={isConfirmModalOpen}
        setIsOpen={setIsConfirmModalOpen}
        content="팝업을 삭제하시겠어요?"
        image={bin}
        confirmText="삭제"
        cancelText="취소"
        onConfirm={confirmDelete}
        onCancel={() => setIsConfirmModalOpen(false)}
      />
      {/* Alert 모달 */}
      <Modal
        isOpen={isAlertModalOpen}
        setIsOpen={setIsAlertModalOpen}
        content="팝업이 삭제되었어요"
        image={check}
        confirmText="확인"
        onConfirm={alertDelete}
      />
    </div>
  );
};

export default PopUpListPage;
