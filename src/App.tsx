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

import FullScreenLoading from "./components/Loading/FullScreenLoading";
import { Toaster } from "react-hot-toast";
import { config } from "./config/config";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "components/Page/HomePage";
import MissionsPage from "components/Page/MissionsPage";
import RoadMapPage from "components/Page/RoadMapPage";
import ReferralPage from "components/Page/ReferralPage";
import InvestingPage from "components/Page/InvestingPage";

const queryClient = new QueryClient();

function App() {
  const [activeTab, setActiveTab] = useState<string>("Home");
  const [activeTabPre, setActiveTabPre] = useState<string>("Home");
  const { setTelegramUserInfo } = useTelegramStore();
  const { userId, fetchData: fetchUserId } = useUserId();
  const { userInfo, fetchData: fetchUserInfo } = useUserInfo();
  const { fetchData: fetchTasks } = useTaskStore();

  const handleActiveTab = (tab: string) => {
    setActiveTabPre(activeTab);
    setActiveTab(tab);
  };

  const handleBack = () => {
    setActiveTab(activeTabPre);
  };

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
      const tg = WebApp as any; // Replace with proper typing if available
      tg.ready();
      tg.expand();
      if (tg.MainButton) {
        tg.MainButton.hide();
      }

      tg.BackButton.onClick(() => handleBack());
      tg.themeParams.bg_color = "#1D1D1E";
      tg.themeParams.header_bg_color = "#1D1D1E";
      tg.themeParams.section_bg_color = "#1D1D1E";

      const user = tg.initDataUnsafe?.user ?? Data;
      setTelegramUserInfo(user);
      if (user) {
        fetchUserId(user.id, user.username, user.first_name, user.last_name);
      }
    } else {
      console.error("Telegram Web App SDK not found");
    }
  };

  const renderPage: { [key: string]: JSX.Element } = {
    Home: <HomePage setActiveTab={handleActiveTab} />,
    Missions: <MissionsPage back={handleBack} />,
    "Road Map": <RoadMapPage back={handleBack} />,
    Boost: <BoostPage back={handleBack} />,
    Referral: <ReferralPage back={handleBack} />,
    Investing: <InvestingPage back={handleBack} />,
  };

  if (!userInfo) {
    return (
      <>
        <Toaster />
        <FullScreenLoading />;
      </>
    );
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div className="w-full p-0 bg-[#1D1D1E] flex items-center justify-center overflow-scroll overflow-x-hidden relative">
          <Toaster />
          <div className="max-w-[450px] relative h-[100vh] p-3 w-full">
            {renderPage[activeTab]}
            <div className="h-44"></div>
            <BottomBar activeTab={activeTab} setActiveTab={handleActiveTab} />
          </div>
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;