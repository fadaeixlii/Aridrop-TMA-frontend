import { PiArrowRight } from "react-icons/pi";
import Boost2 from "assets/boost2.svg";
import { useUserInfo } from "../Store/TelegramStore";
import { useEffect, useMemo, useState } from "react";
import { getUserRankInfo, RankInfo } from "../utils/constant";
import TimerButton from "./TimerBtn";
import TelegramProfileImage from "./common/TelegramProfile";
import { InfoBox } from "./InfoBox";

interface ClaimBoxProps {
  setActiveTab: (tab: string) => void;
}

const ClaimBox: React.FC<ClaimBoxProps> = ({ setActiveTab }) => {
  const { userInfo, incrementStoredScore } = useUserInfo();
  const [preScore, setPreScore] = useState<number | undefined>(
    userInfo?.storedScore ? userInfo?.storedScore / 5 : 0
  );

  useEffect(() => {
    if (userInfo)
      if (userInfo?.profitPerHour > 0) {
        const interval = setInterval(() => {
          setPreScore(userInfo?.storedScore);
          incrementStoredScore();
        }, 10000);

        return () => clearInterval(interval);
      }
  }, [userInfo?.profitPerHour, incrementStoredScore, userInfo?.storedScore]);

  const userRank: RankInfo = useMemo(
    () => getUserRankInfo(userInfo?.storedScore || 0),
    [userInfo?.storedScore]
  );

  if (!userInfo) return null;

  return (
    <div className="w-full flex flex-col h-full max-h-full items-start justify-between  p-3 pb-28 z-[1]">
      <div className="flex items-center gap-1 flex-wrap w-full justify-between">
        <div
          className="flex items-center gap-2"
          onClick={() => {
            setActiveTab("Referral");
          }}
        >
          <TelegramProfileImage telegramId={userInfo.telegramId} />
          <div className=" text-white mx-2 truncate grow">{`${
            userInfo?.firstName ?? ""
          } ${userInfo?.lastName ?? ""}`}</div>
        </div>
        <span
          className="newBox flex items-center justify-between gap-3 px-2 py-1 pr-3  rounded-lg "
          onClick={() => {
            setActiveTab("Boost");
          }}
        >
          <img src={Boost2} className="size-8 text-[#45E89D]" />
          <span className="text-white font-light text-xs ">Boost</span>
        </span>
      </div>

      <div className="flex w-full justify-center items-center flex-col gap-4   ">
        <img src={userRank.icon} alt="" className="aspect-square w-2/3 " />

        <span className="flex items-center gap-2 text-slate-400 text-xl">
          <span>{userRank.key}</span>
          <PiArrowRight
            onClick={() => {
              setActiveTab("Ranks");
            }}
          />
        </span>
      </div>

      {/* <div className="flex items-center gap-4 justify-center w-full">
        <img src={CoinIcon} className="" />
        <div className="flex flex-col gap-2 items-start">
          <div className="flex items-center gap-2">
            <span className="bg-[#789E2A]/20 flex justify-center items-center p-1 rounded-lg">
              <PiCoinsLight className="text-[#49610D] w-4 h-4" />
            </span>
            Total
            <div className="font-bold">
              <AnimatedCounter from={preScore || 0} to={userInfo.storedScore} />
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
      </div> */}

      <div className="flex items-center flex-col gap-3 w-full">
        <InfoBox />
        <TimerButton />
      </div>
    </div>
  );
};

export default ClaimBox;
