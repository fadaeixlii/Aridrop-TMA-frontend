import OPA from "assets/OPA.svg";
import { formatNumber } from "utils/number";
export interface IBoostItemProps {
  icon: string;
  title: string;
  desc: string;
  nextPrice?: number;
  nextLevel?: number;
  onClick: () => void;
}

export function BoostItem(props: IBoostItemProps) {
  const { icon, onClick, title, nextLevel, nextPrice, desc } = props;

  return (
    <div
      className="flex items-center gap-4 newBox px-4 py-2 text-white w-full "
      onClick={onClick}
    >
      <img src={icon} alt="" className="size-8 shrink-0" />
      <div className="flex flex-col grow w-full gap-1 ">
        <div className="flex items-center w-full justify-between">
          <div className="flex flex-col ">
            <span className="text-xs">{title}</span>
            <span className="font-medium text-[10px] text-[#9C9C9C]">
              {desc}
            </span>
            {nextPrice ? (
              <div className="flex items-center gap-1 text-[14px]">
                <img src={OPA} alt="" className="size-3" />
                <span>{formatNumber(nextPrice)}</span>
                {nextLevel ? (
                  <span className=" mx-2 font-medium text-[10px] text-[#9C9C9C]">{`  Level ${nextLevel}`}</span>
                ) : null}
              </div>
            ) : (
              <span>Max</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
