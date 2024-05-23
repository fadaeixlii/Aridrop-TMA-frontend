import { useEffect, useState } from "react";
import BottomBar from "./components/BottomBar";
import ClaimBox from "./components/ClaimBox";
import ReferralAndClub from "./components/ReferralAndClub";
import TaskItem from "./components/TaskItem";
import RoadMapItem from "./components/RoadMapItem";
import WebApp from "@twa-dev/sdk";
import { useTelegramStore } from "./Store/TelegramStore";
import Loading from "./components/Loading/Loading";

function App() {
  const [activeTab, setActiveTab] = useState("Home");
  const { userInfo, setUserInfo } = useTelegramStore();
  useEffect(() => {
    // Check if the Telegram WebApp SDK is loaded
    if (WebApp) {
      const tg = WebApp;
      tg.ready();
      tg.expand();
      if (tg.MainButton) {
        tg.MainButton.hide();
      }

      if (tg.BackButton) {
        tg.BackButton.hide();
      }

      const user = tg.initDataUnsafe?.user;
      setUserInfo(user);
    } else {
      console.error("Telegram Web App SDK not found");
    }
  }, []);

  const renderPage = {
    Home: (
      <div className="flex flex-col gap-5 w-full">
        <ClaimBox />
        <ReferralAndClub setActiveTab={setActiveTab} />
        <div className="text-white text-lg flex justify-between items-center">
          <span>Start Missions Now!</span>
          <span
            onClick={() => {
              setActiveTab("Missions");
            }}
          >
            See All
          </span>
        </div>
        {[1, 2, 3, 4].map((number) => (
          <TaskItem key={number} />
        ))}
        {userInfo ? JSON.stringify(userInfo) : null}
      </div>
    ),
    Missions: (
      <div className="flex flex-col gap-3 w-full">
        <div className="text-white text-lg flex justify-between items-center w-full">
          <span>Missions Page</span>
        </div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
          <TaskItem key={number} />
        ))}
      </div>
    ),
    "Road Map": (
      <div className="flex flex-col gap-3 w-full">
        <div className="text-white text-lg flex justify-between items-center">
          <span>Road Map Page</span>
        </div>
        <RoadMapItem />
      </div>
    ),
  };

  return (
    <div className="w-full p-0  bg-[#1D1D1E] flex items-center justify-center overflow-scroll  overflow-x-hidden ">
      {userInfo ? (
        <div className="max-w-[450px] relative h-[100vh] p-3  w-full ">
          {renderPage[activeTab]}
          <div className="h-44"></div>
          <BottomBar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default App;
