import xWhite from "@/assets/webps/popUpList/x-white.webp";
import { usePopUpReadStore } from "@/stores/usePopUpReadStore";
import { GetPopUpReadResponse } from "@/types/api/ApiResponseType";
import { useNavigate } from "react-router-dom";

type Props = GetPopUpReadResponse & {
  onDeleteClick: () => void;
};

export default function PopUpCard({
  popupId,
  name,
  imageUrl,
  onDeleteClick,
}: Props) {
  const setPopUp = usePopUpReadStore(state => state.setPopUp);
  const navigate = useNavigate();
  const isNameContainPopUp = name.includes("팝업스토어");

  let firstLine = "";
  let secondLine = "";

  if (isNameContainPopUp) {
    const parts = name.split("팝업스토어");
    firstLine = parts[0];
    secondLine = "팝업스토어" + (parts[1] || "");
  }

  const handleSelect = () => {
    setPopUp({ popupId, name, imageUrl });
    navigate("/dashboard");
  };

  return (
    <>
      <div
        className="w-[286px] flex justify-center"
        data-testid="popup-list-card"
      >
        <div className="relative group cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.4)] bg-gradient-to-br from-black via-gray08 to-black h-[240px] w-[240px] rounded-[62px] flex items-center justify-center">
          {/* 이미지 */}
          <div className="w-[200px] h-[200px] rounded-full overflow-hidden">
            <img
              src={imageUrl}
              alt="poster"
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          {/* 오버레이 (hover 시) */}
          <div className="cursor-auto absolute top-0 left-0 w-full h-full bg-gray10/70 rounded-[62px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
            {/* x button */}
            <div
              onClick={onDeleteClick}
              className="cursor-pointer w-[74px] h-[74px] bg-main07 rounded-full flex items-center justify-center"
              data-testid="popup-delete-btn"
            >
              <img src={xWhite} width={32} height={32} alt="x button" />
            </div>
          </div>
        </div>
      </div>
      <span
        onClick={handleSelect}
        lang="en"
        data-testid={`popup-card-${popupId}`}
        className="cursor-pointer w-[286px] break-words block text-center justify-center text-[34px] mt-[22px]"
      >
        {isNameContainPopUp ? (
          <>
            <span lang="en" className="block text-[34px]">
              {firstLine}
            </span>
            <span lang="en" className="block text-[34px]">
              {secondLine}
            </span>
          </>
        ) : (
          <span lang="en" className="block text-[34px]">
            {name}
          </span>
        )}
      </span>
    </>
  );
}
