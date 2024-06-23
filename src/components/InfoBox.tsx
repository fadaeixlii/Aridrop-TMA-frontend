import * as React from "react";
import CoinIcon from "../assets/CoinIcon.svg";
import { useUserInfo } from "Store/TelegramStore";
import AnimatedCounter from "./common/AnimatedNumber";
import useClaimHandler from "utils/useClaimHandler";
import OPA from "assets/OPA.svg";

export interface IInfoBoxProps {}

export function InfoBox(props: IInfoBoxProps) {
  const { userInfo, incrementStoredScore } = useUserInfo();
  const [preScore, setPreScore] = React.useState<number | undefined>(
    userInfo?.storedScore ? userInfo?.storedScore / 5 : 0
  );

  React.useEffect(() => {
    if (userInfo) {
      setPreScore(userInfo.maxScore);
    }
  }, [userInfo?.maxScore]);

  const { claimed } = useClaimHandler();

  if (!userInfo) return null;

  return (
    <div className="card-shine-effect px-6 py-2 flex items-start w-full justify-between text-white rounded-lg bg-[#2E2E2E]/60 border border-[#2E2E2E] backdrop-blur-sm">
      <div className="flex flex-col -gap-1">
        <span className="text-lg font-light leading-6">Storage</span>
        <div className="font-bold text-3xl leading-6">
          <span className="font-mono">{claimed}</span>
        </div>
        <div className="flex items-center gap-2 text-xl leading-6">
          <span>Total </span>
          <AnimatedCounter from={preScore || 0} to={userInfo.storedScore} />
        </div>
        <div className="flex items-center gap-2 mt-4">
          <span className="font-mono ">{userInfo.maxScore}</span>
          <span className="flex items-center gap-2">
            <img src={OPA} alt="" />
            <span>Per Claim</span>
          </span>
        </div>
      </div>
      <img src={CoinIcon} alt="" className="size-10 mt-2" />
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
