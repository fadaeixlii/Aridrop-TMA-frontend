import { FaArrowCircleRight } from "react-icons/fa";
export default function BoostItem({
  img,
  title,
  level,
  text,
  current,
  onClick,
}) {
  return (
    <div
      className="border border-[#515151] bg-[#2E2E2E] rounded-xl w-full flex items-center justify-start gap-2 text-white px-6 py-3"
      onClick={onClick}
    >
      <img src={img} alt="" className="size-20" />
      <div className="flex flex-col gap-0 items-start justify-center ">
        <span className="text-lg">
          {title} LVL {level}
        </span>
        <span className="text-sm">{text}</span>
        <span className="text-xs">{current}</span>
      </div>
      <FaArrowCircleRight className="size-8 ml-auto" />
    </div>
  );
}
