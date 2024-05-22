import { useState } from "react";
import BottomBar from "./components/BottomBar";
import ClaimBox from "./components/ClaimBox";
import ReferralAndClub from "./components/ReferralAndClub";
import TaskItem from "./components/TaskItem";
import RoadMapItem from "./components/RoadMapItem";

function App() {
  const [activeTab, setActiveTab] = useState("Home");
  const [userId, setUserId] = useState(null);
  const [userIdd, setUserIdd] = useState(null);
  const [tgg, setTgg] = useState(null);

  useEffect(() => {
    // Check if the Telegram WebApp SDK is loaded
    if (window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();

      // Get user information
      const initDataUnsafe = tg.initDataUnsafe;
      if (tg) setTgg(JSON.stringify(tg));
      const user = initDataUnsafe.user;

      if (initDataUnsafe) {
        setUserId(JSON.stringify(initDataUnsafe));
      }
      if (user) {
        setUserIdd(JSON.stringify(user));
      }
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
        {userId ? <p>Your Telegram User ID: {userId}</p> : <p>Loading...</p>}
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
      <div className="max-w-[450px] relative h-[100dvh] p-3  w-full ">
        {renderPage[activeTab]}
        <div className="h-44"></div>
        <BottomBar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}

export default App;
