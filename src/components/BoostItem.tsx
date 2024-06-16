import { FaArrowCircleRight } from "react-icons/fa";

interface BoostItemProps {
  img: string;
  title: string;
  level: number;
  text: string;
  current: JSX.Element;
  onClick: () => void;
}

const BoostItem: React.FC<BoostItemProps> = ({
  img,
  title,
  level,
  text,
  current,
  onClick,
}) => {
  return (
    <div
      className="border border-[#515151] bg-[#2E2E2E] rounded-xl w-full flex items-center justify-start gap-2 text-white px-6 py-3 cursor-pointer"
      onClick={onClick}
    >
      <img src={img} alt="" className="w-10 h-10" />
      <div className="flex flex-col gap-1 items-start justify-center">
        <span className="text-lg">
          {title} LVL {level}
        </span>
        <span className="text-sm">{text}</span>
        <span className="text-xs">{current}</span>
      </div>
      <FaArrowCircleRight className="text-[#AFEF28] w-8 h-8 ml-auto" />
    </div>
  );
};

export default BoostItem;
