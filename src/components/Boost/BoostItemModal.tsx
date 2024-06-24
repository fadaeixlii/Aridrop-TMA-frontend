import { getInfoSpeed, getInfoStorage } from "utils/constant";
export interface IBoostItemModalProps {
  type: "timeLimit" | "maxScore";
  level: number;
  boostEffect: number;
}

export function BoostItemModal(props: IBoostItemModalProps) {
  const { type, level, boostEffect } = props;

  return (
    <div className="flex items-center gap-4 newBox px-4 py-2 text-white w-full">
      <img
        src={
          type === "maxScore"
            ? getInfoStorage(level).icon
            : getInfoSpeed(level).icon
        }
        alt=""
        className="size-8 shrink-0"
      />
      <div className="flex flex-col grow w-full gap-1 ">
        <div className="flex items-center w-full justify-between">
          <div className="flex flex-col ">
            <span className="text-xs">
              {type === "maxScore" ? "Opal Stone" : "Lighting Speed"}
            </span>
            <span className="font-medium text-[10px] text-[#9C9C9C]">{`Level ${level}`}</span>
            <p className="font-bold text-[14px] ">
              {type === "timeLimit"
                ? `Claim every ${Math.floor(boostEffect / 60)}`
                : `Every claim ${boostEffect}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
