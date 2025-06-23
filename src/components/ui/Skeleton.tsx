/**
 * @Description
 * 로딩 중임을 나타내는 스켈레톤 컴포넌트입니다.
 * - `framer-motion`을 활용하여 좌우로 흐르는 반짝이는 효과를 제공합니다.
 * - 부모 요소의 `width`, `height`를 상속받아 전체 영역에 적용됩니다.
 * - API 응답 대기 중, 콘텐츠의 자리를 미리 확보하거나 시각적 피드백을 줄 때 사용합니다.
 *
 * @Example
 * <div className="w-[300px] h-[100px]">
 *   <Skeleton />
 * </div>
 */

import { motion } from "framer-motion";

type Props = {
  width?: string;
  height?: string;
  rounded?: string;
  className?: string;
};

const Skeleton = ({
  width = "w-full",
  height = "h-full",
  rounded = "rounded-[40px]",
  className = "",
}: Props) => {
  return (
    <motion.div
      className={`overflow-hidden bg-gray-200 ${width} ${height} ${rounded} ${className}`}
      initial={{ opacity: 0.6 }}
    >
      <motion.div
        className="absolute top-0 bottom-0 left-[-100%] w-[50%]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
        }}
        animate={{ left: ["-50%", "150%"] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </motion.div>
  );
};

export default Skeleton;
