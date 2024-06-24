import {
  PiCircuitryLight,
  PiGiftLight,
  PiHouseLight,
  PiSealCheck,
  PiUsersFour,
} from "react-icons/pi";

import WalletIcon from "assets/wallet.svg";
import RefIcon from "assets/ref.svg";
import MissionsIcon from "assets/mission.svg";
import HomeIcon from "assets/home.svg";
import { twMerge } from "tailwind-merge";

interface BottomBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const BottomBar: React.FC<BottomBarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="bg-[#222222]  py-3 rounded-t-lg flex items-center justify-between w-screen m-auto fixed bottom-0 left-1/2 -translate-x-1/2 border border-[#3D3D3D] max-w-[380px] z-30 px-8">
      <div
        onClick={() => setActiveTab("Home")}
        className={twMerge(
          "text-[#474747] flex flex-col items-center gap-1 text-sm font-medium",
          activeTab === "Home" && "text-[#fff]"
        )}
      >
        <img src={HomeIcon} className="size-8" />
        Home
      </div>

      <div
        onClick={() => setActiveTab("Missions")}
        className={twMerge(
          "text-[#474747] flex flex-col items-center gap-1 text-sm font-medium",
          activeTab === "Missions" && "text-[#fff]"
        )}
      >
        <img src={MissionsIcon} className="size-8" />
        Missions
      </div>
      <div
        onClick={() => setActiveTab("Referral")}
        className={twMerge(
          "text-[#474747] flex flex-col items-center gap-1 text-sm font-medium",
          activeTab === "Referral" && "text-[#fff]"
        )}
      >
        <img src={RefIcon} className="size-8" />
        Referral
      </div>
      <div
        onClick={() => setActiveTab("Investing")}
        className={twMerge(
          "text-[#474747] flex flex-col items-center gap-1 text-sm font-medium",
          activeTab === "Investing" && "text-[#fff]"
        )}
      >
        <img src={WalletIcon} className="size-8" />
        Wallet
      </div>
    </div>
  );
};

export default BottomBar;
