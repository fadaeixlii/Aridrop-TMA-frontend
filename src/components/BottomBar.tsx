import {
  PiCircuitryLight,
  PiGiftLight,
  PiHouseLight,
  PiSealCheck,
  PiUsersFour,
} from "react-icons/pi";
import { twMerge } from "tailwind-merge";

interface BottomBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const BottomBar: React.FC<BottomBarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="bg-[#222222] px-2 py-3 rounded-t-lg flex items-center w-screen m-auto fixed bottom-0 left-1/2 -translate-x-1/2 border border-[#3D3D3D] max-w-[380px] z-30">
      <div
        onClick={() => setActiveTab("Investing")}
        className={twMerge(
          "text-[#474747] w-1/5 flex flex-col items-center gap-1 text-sm",
          activeTab === "Investing" && "text-[#AFEF28]"
        )}
      >
        <PiGiftLight className="size-6" />
        Investing
      </div>
      <div
        onClick={() => setActiveTab("Road Map")}
        className={twMerge(
          "text-[#474747] w-1/5 flex flex-col items-center gap-1 text-sm",
          activeTab === "Road Map" && "text-[#AFEF28]"
        )}
      >
        <PiCircuitryLight className="size-6" />
        Road Map
      </div>
      <div
        onClick={() => setActiveTab("Home")}
        className={twMerge(
          "text-[#474747] w-1/5 flex flex-col items-center gap-1 text-sm",
          activeTab === "Home" && "text-[#AFEF28]"
        )}
      >
        <PiHouseLight className="size-6" />
        Home
      </div>
      <div
        onClick={() => setActiveTab("Missions")}
        className={twMerge(
          "text-[#474747] w-1/5 flex flex-col items-center gap-1 text-sm",
          activeTab === "Missions" && "text-[#AFEF28]"
        )}
      >
        <PiSealCheck className="size-6" />
        Missions
      </div>
      <div
        onClick={() => setActiveTab("Referral")}
        className={twMerge(
          "text-[#474747] w-1/5 flex flex-col items-center gap-1 text-sm",
          activeTab === "Referral" && "text-[#AFEF28]"
        )}
      >
        <PiUsersFour className="size-6" />
        Referral
      </div>
    </div>
  );
};

export default BottomBar;
