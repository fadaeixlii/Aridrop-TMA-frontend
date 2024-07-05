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
import useClaimHandler from "utils/useClaimHandler";
import { RanksPage } from "components/Page/RanksPage";

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
      const tg = WebApp;
      tg.expand();
      if (tg.MainButton) {
        tg.MainButton.hide();
      }

      tg.BackButton.onClick(() => handleBack());
      tg.themeParams.bg_color = "#1D1D1E";
      tg.themeParams.header_bg_color = "#1D1D1E";
      tg.themeParams.section_bg_color = "#1D1D1E";
      tg.enableClosingConfirmation();

      const user = tg.initDataUnsafe?.user ?? Data;
      if (user) {
        setTelegramUserInfo(user as any);
        fetchUserId(
          String(user.id),
          user?.username ?? "",
          user?.first_name ?? "",
          user?.last_name ?? ""
        );
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
    Ranks: <RanksPage />,
  };

  // const { startCountdown, calculateRemainingSeconds } = useClaimHandler();
  // useEffect(() => {
  //   if (userInfo && userInfo.lastClaimTimestamp) {
  //     const date = new Date(userInfo.lastClaimTimestamp);
  //     const remainingSeconds = calculateRemainingSeconds(date);
  //     if (remainingSeconds) startCountdown(remainingSeconds);
  //   }
  // }, [userInfo]);

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
        <div className="w-full p-0 bg-[#1D1D1E] h-[100vh] max-h-screen  z-10 flex items-center justify-center overflow-hidden  overflow-x-hidden relative">
          <Toaster />
          <div className="gradient"></div>
          <div className="max-w-[450px] relative h-[100vh] px-2 w-full">
            {renderPage[activeTab]}

            <BottomBar activeTab={activeTab} setActiveTab={handleActiveTab} />
          </div>
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
