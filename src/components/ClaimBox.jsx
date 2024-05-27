import { useState } from "react";
import {
  PiCoinsLight,
  PiHandWithdrawLight,
  PiPipeWrenchLight,
  PiSpeedometerLight,
} from "react-icons/pi";

import CoinIcon from "../assets/CoinIcon.svg";
import Button from "./Button";
import AnimatedCounter from "./AnimatedNumber";

export default function ClaimBox() {
  const [perHour, setPerHour] = useState(15);
  const [storedScore, setStoredScore] = useState(10054620);
  const [currentScore, setCurrentScore] = useState(561234);
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
        <div className="font-bold">
          <AnimatedCounter from={perHour / 5} to={perHour} />
        </div>
        IPAL
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
              <AnimatedCounter from={storedScore / 5} to={storedScore} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="font-bold">
              <AnimatedCounter from={currentScore / 5} to={currentScore} />
            </div>

            <span className="font-semibold">OPAL</span>
          </div>
        </div>
      </div>
      {/* ////////////// */}

      <div className="flex items-center gap-3 w-full">
        <Button className="flex items-center gap-2 !w-1/2 justify-center py-4 !bg-[#1D1D1E] rounded-2xl">
          <PiSpeedometerLight className="size-5 " />
          Boost
        </Button>
        <Button className="flex items-center gap-2 !w-1/2 justify-center py-4 !bg-[#1D1D1E] rounded-2xl">
          <PiPipeWrenchLight className="size-5 " />
          Claim
        </Button>
      </div>
    </div>
  );
}
