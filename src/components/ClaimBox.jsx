import { PiCoinsLight, PiSpeedometerLight } from "react-icons/pi";

import CoinIcon from "../assets/CoinIcon.svg";
import Button from "./common/Button";
import AnimatedCounter from "./common/AnimatedNumber";
import { useUserInfo } from "../Store/TelegramStore";
import TimerButton from "./TimerBtn";
import { useEffect, useMemo, useState } from "react";
import { getUserRankInfo } from "../utils/constant";

export default function ClaimBox({ setActiveTab }) {
  const { userInfo, incrementStoredScore } = useUserInfo();

  const [preScore, setPreScore] = useState(
    userInfo?.storedScore ? userInfo?.storedScore / 5 : 0
  );

  useEffect(() => {
    if (userInfo?.profitPerHour > 0) {
      const interval = setInterval(() => {
        setPreScore(userInfo?.storedScore);
        incrementStoredScore();
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [userInfo?.profitPerHour, incrementStoredScore, userInfo?.storedScore]);

  const userRank = useMemo(
    () => getUserRankInfo(userInfo?.storedScore),
    [userInfo?.storedScore]
  );

  return (
    <div className="w-full flex flex-col items-start justify-between gap-10 rounded-2xl p-3 animated-background bg-gradient-to-r from-[#e0f559] via-[#d7ee3d] to-[#91ee5e] z-[1]">
      <div className="flex items-center gap-1 flex-wrap">
        {/* <span className="bg-[#789E2A]/20 flex justify-center items-center p-1 rounded-lg">
          <PiHandWithdrawLight className="text-[#49610D] size-6" />
        </span> */}
        <img src={userRank.icon} alt="" className="size-16" />
        <div className="font-bold">{`${userInfo?.firstName ?? ""} ${
          userInfo?.lastName ?? ""
        }`}</div>

        {userInfo?.profitPerHour > 0 ? (
          <div className="mr-auto flex items-center ">
            {userInfo.profitPerHour}/Hour OPL{" "}
          </div>
        ) : null}
      </div>

      {/* /////////////// */}
      <div className="flex items-center gap-4 justify-center w-full">
        <img src={CoinIcon} className="size-28" />
        <div className="flex flex-col gap-2 items-start">
          <div className="flex items-center gap-2">
            <span className="bg-[#789E2A]/20 flex justify-center items-center p-1 rounded-lg">
              <PiCoinsLight className="text-[#49610D] size-6" />
            </span>
            Total
            <div className="font-bold">
              <AnimatedCounter from={preScore} to={userInfo.storedScore} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="font-bold">
              <AnimatedCounter
                from={userInfo.maxScore / 5}
                to={userInfo.maxScore}
              />
            </div>

            <span className="font-semibold">OPL per claim</span>
          </div>
        </div>
      </div>
      {/* ////////////// */}

      <div className="flex items-center gap-3 w-full">
        <Button
          onClick={() => {
            setActiveTab("Boost");
          }}
          className="flex items-center gap-2 mb-0 !w-1/2 justify-center py-4 !bg-[#1D1D1E] rounded-2xl"
        >
          <PiSpeedometerLight className="size-5 " />
          Boost
        </Button>
        <TimerButton />
      </div>
    </div>
  );
}
