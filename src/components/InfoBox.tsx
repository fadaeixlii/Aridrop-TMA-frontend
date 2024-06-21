import * as React from "react";
import CoinIcon from "../assets/CoinIcon.svg";
import { useUserInfo } from "Store/TelegramStore";
import { PiCoinsLight } from "react-icons/pi";
import AnimatedCounter from "./common/AnimatedNumber";

export interface IInfoBoxProps {}

export function InfoBox(props: IInfoBoxProps) {
  const { userInfo, incrementStoredScore } = useUserInfo();
  const [preScore, setPreScore] = React.useState<number | undefined>(
    userInfo?.storedScore ? userInfo?.storedScore / 5 : 0
  );
  if (!userInfo) return null;

  return (
    <div className="card-shine-effect px-8 py-4 flex items-start w-full justify-between text-white rounded-lg bg-[#2E2E2E]/60 border border-[#2E2E2E] backdrop-blur-sm">
      <div className="flex flex-col gap-0">
        <span className="text-lg font-light">Total Balance</span>
        <div className="font-bold text-3xl">
          <AnimatedCounter from={preScore || 0} to={userInfo.storedScore} />
        </div>
      </div>
      <img src={CoinIcon} alt="" className="size-10" />
    </div>
  );
}

{
  /* <div className="flex items-center gap-2">
            <div className="font-bold">
              <AnimatedCounter
                from={userInfo.maxScore / 5}
                to={userInfo.maxScore}
              />
            </div>
            <span className="font-semibold">OPL per claim</span>
          </div> */
}

// <div className="font-bold">
//     <AnimatedCounter from={preScore || 0} to={userInfo.storedScore} />
//   </div>
