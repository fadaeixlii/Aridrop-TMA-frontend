import {
  PiCoinsLight,
  PiHandWithdrawLight,
  PiSpeedometerLight,
} from "react-icons/pi";

import CoinIcon from "../assets/CoinIcon.svg";
import Button from "./Button";
import AnimatedCounter from "./AnimatedNumber";
import { useUserInfo } from "../Store/TelegramStore";
import TimerButton from "./TimerBtn";

export default function ClaimBox({ setActiveTab }) {
  const { userInfo } = useUserInfo();

  return (
    <div
      className="w-full flex flex-col items-start justify-between gap-10 rounded-2xl p-3"
      style={{
        background:
          "linear-gradient(38deg, rgba(228,247,102,1) 0%, rgba(119,205,72,1) 100%)",
      }}
    >
      <div className="flex items-center gap-2">
        <span className="bg-[#789E2A]/20 flex justify-center items-center p-1 rounded-lg">
          <PiHandWithdrawLight className="text-[#49610D] size-6" />
        </span>

        <div className="font-bold">{`${userInfo?.firstName ?? ""} ${
          userInfo?.lastName ?? ""
        }`}</div>
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
              <AnimatedCounter
                from={userInfo.storedScore / 5}
                to={userInfo.storedScore}
              />
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
          className="flex items-center gap-2 !w-1/2 justify-center py-4 !bg-[#1D1D1E] rounded-2xl"
        >
          <PiSpeedometerLight className="size-5 " />
          Boost
        </Button>
        <TimerButton />
      </div>
    </div>
  );
}
