import OPA from "assets/OPA.svg";
import Stone from "assets/Stone.svg";
import Lighting from "assets/Lighting.svg";
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
        src={type === "maxScore" ? Stone : Lighting}
        alt=""
        className="size-14 shrink-0"
      />
      <div className="flex flex-col grow w-full gap-1 ">
        <div className="flex items-center w-full justify-between">
          <div className="flex flex-col ">
            <span>{type === "maxScore" ? "Opal Stone" : "Lighting Speed"}</span>
            <span className="font-extralight text-xs">{`Level ${level}`}</span>
            <p className="font-bold">
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
