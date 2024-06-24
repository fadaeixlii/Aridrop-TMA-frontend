import * as React from "react";
import CoinIcon from "../assets/CoinIcon.svg";
import { useUserId, useUserInfo } from "Store/TelegramStore";
import AnimatedCounter from "./common/AnimatedNumber";
import useClaimHandler from "utils/useClaimHandler";
import OPA from "assets/OPA.svg";
import { formatNumber } from "utils/number";
import { getInfoStorage } from "utils/constant";
import { useMaxScoreBoostStore } from "Store/MaxScoreBoost";

export interface IInfoBoxProps {}

export function InfoBox(props: IInfoBoxProps) {
  const { userInfo } = useUserInfo();
  const { userId } = useUserId();

  const { claimed } = useClaimHandler();
  const { maxScore, fetchData } = useMaxScoreBoostStore();

  React.useEffect(() => {
    if (userId) fetchData(userId?.userId);
  }, []);

  if (!userInfo || !maxScore) return null;

  return (
    <div className="card-shine-effect px-3 py-3 flex items-start w-full justify-between text-white rounded-lg bg-[#2E2E2E]/60 border border-[#2E2E2E] backdrop-blur-sm">
      <div className="flex flex-col -gap-1">
        <span className="text-base font-light leading-7">Storage</span>
        <div className="font-extrabold text-3xl leading-7">
          <span className=" ">{claimed}</span>
        </div>
        <div className="flex items-center gap-2 text-lg font-bold leading-7">
          <span>Total </span>
          <span>{formatNumber(userInfo.storedScore, 3)}</span>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <span className="  ">{userInfo.maxScore}</span>
          <span className="flex items-center gap-2">
            <span>OPA Per Claim</span>
          </span>
        </div>
      </div>
      <img
        src={getInfoStorage(maxScore?.order ?? 1).icon}
        alt=""
        className="size-10 "
      />
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
