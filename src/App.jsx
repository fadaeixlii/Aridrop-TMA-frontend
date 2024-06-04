import { useEffect, useState } from "react";
import BottomBar from "./components/BottomBar";
import WebApp from "@twa-dev/sdk";
import {
  useTelegramStore,
  useUserId,
  useUserInfo,
} from "./Store/TelegramStore";
import Data from "./mockData.json";
import BoostPage from "./components/Page/BoostPage";
import { useTaskStore } from "./Store/TaskStore";
import HomePage from "./components/Page/HomePage";
import MissionsPage from "./components/Page/MissionsPage";
import RoadMapPage from "./components/Page/RoadMapPage";
import ReferralPage from "./components/Page/ReferralPage";
import FullScreenLoading from "./components/Loading/FullScreenLoading";
import { Toaster } from "react-hot-toast";
function App() {
  const [activeTab, setActiveTab] = useState("Home");
  const { setTelegramUserInfo } = useTelegramStore();
  const { userId, fetchData: fetchUserId } = useUserId();
  const { userInfo, fetchData: fetchUserInfo } = useUserInfo();
  const { fetchData: fetchTasks } = useTaskStore();
  useEffect(() => {
    fetchInitData();
  }, []);
  useEffect(() => {
    if (userId) {
      fetchUserInfo(userId.userId);
      fetchTasks(userId.userId);
    }
  }, [userId]);

  const fetchInitData = async () => {
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

      const user = tg.initDataUnsafe?.user ?? Data;
      setTelegramUserInfo(user);
      if (user) {
        fetchUserId(user.id);
      }
    } else {
      console.error("Telegram Web App SDK not found");
    }
  };

  const renderPage = {
    Home: <HomePage setActiveTab={setActiveTab} />,
    Missions: <MissionsPage />,
    "Road Map": <RoadMapPage />,
    Boost: <BoostPage />,
    Referral: <ReferralPage />,
  };

  if (!userInfo)
    return (
      <>
        <Toaster />
        <FullScreenLoading />;
      </>
    );

  return (
    <div className="w-full p-0  bg-[#1D1D1E] flex items-center justify-center overflow-scroll  overflow-x-hidden ">
      <Toaster />
      <div className="max-w-[450px] relative h-[100vh] p-3  w-full ">
        {renderPage[activeTab]}
        <div className="h-44"></div>
        <BottomBar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}

export default App;
