import { PiCircuitryLight, PiGiftLight, PiHouseLight } from "react-icons/pi";
import { twMerge } from "tailwind-merge";
export default function BottomBar({ activeTab, setActiveTab }) {
  return (
    <div className="bg-[#222222] px-6 py-3 rounded-full flex items-center  w-[90%] m-auto fixed bottom-7 left-1/2 -translate-x-1/2 border border-[#3D3D3D] max-w-[380px] ">
      <div
        onClick={() => setActiveTab("Home")}
        className={twMerge(
          "text-[#474747] w-1/3 flex flex-col items-center gap-1 text-sm ",
          activeTab === "Home" && "text-[#AFEF28]"
        )}
      >
        <PiHouseLight className="size-6" />
        Home
      </div>
      <div
        onClick={() => setActiveTab("Investing")}
        className={twMerge(
          "text-[#474747] w-1/3 flex flex-col items-center gap-1 text-sm ",
          activeTab === "Missions" && "text-[#AFEF28]"
        )}
      >
        <PiGiftLight className="size-6" />
        Investing
      </div>
      <div
        onClick={() => setActiveTab("Road Map")}
        className={twMerge(
          "text-[#474747] w-1/3 flex flex-col items-center gap-1 text-sm ",
          activeTab === "Road Map" && "text-[#AFEF28]"
        )}
      >
        <PiCircuitryLight className="size-6" />
        Road Map
      </div>
    </div>
  );
}
