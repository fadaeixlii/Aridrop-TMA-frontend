import { useState, useEffect, useCallback } from "react";
import Button from "./common/Button";
import { PiClockAfternoonLight, PiPipeWrenchLight } from "react-icons/pi";
import { useUserId, useUserInfo } from "../Store/TelegramStore";
import api from "../utils/axiosConfig";
import { twMerge } from "tailwind-merge";

const TimerButton: React.FC = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { userInfo, claim } = useUserInfo();
  const { userId } = useUserId();

  const calculateRemainingSeconds = useCallback(
    (lastClaimTime: Date) => {
      if (!userInfo) return 0;
      const nowDate = new Date();
      const nextClaimDate = new Date(
        lastClaimTime.getTime() + userInfo.timeLimit * 60 * 1000
      );
      const remainingTime = nextClaimDate.getTime() - nowDate.getTime();
      return Math.max(Math.floor(remainingTime / 1000), 0);
    },
    [userInfo]
  );

  const fetchDate = async () => {
    if (!userId) return;
    setLoading(true);

    try {
      const response = await api.post("/claim", {
        userId: userId.userId,
      });
      const { data } = response;
      const date = new Date(data.body.lastClaimTimestamp);
      const remainingSeconds = calculateRemainingSeconds(date);

      startCountdown(remainingSeconds);
      claim();
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.lastClaimTimestamp) {
      const date = new Date(userInfo.lastClaimTimestamp);
      const remainingSeconds = calculateRemainingSeconds(date);
      if (remainingSeconds) startCountdown(remainingSeconds);
    }
  }, [calculateRemainingSeconds, userInfo]);

  // Function to start the countdown
  const startCountdown = (seconds: number) => {
    setIsButtonDisabled(true);
    setCountdown(seconds);
  };

  // Use useEffect to handle the countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prevCountdown) => prevCountdown! - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsButtonDisabled(false);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown]);

  return (
    <div
      className={twMerge(
        "p-[2px] w-1/2 rounded-2xl bg-gradient-to-r",
        isButtonDisabled
          ? ""
          : " from-red-500 via-purple-500 to-blue-500 animate-border"
      )}
    >
      <Button
        loading={loading}
        disabled={isButtonDisabled || loading}
        onClick={fetchDate}
        className={twMerge(
          "flex items-center gap-2 w-full justify-center py-4 rounded-2xl mb-0",
          isButtonDisabled ? "bg-[#1D1D1E]/50 text-[#AFEF28]" : "bg-[#1D1D1E]"
        )}
      >
        {isButtonDisabled ? (
          <span className="font-mono flex items-center gap-2">
            <PiClockAfternoonLight className="w-5 h-5" />
            {` ${Math.floor(countdown! / 60)
              .toString()
              .padStart(2, "0")}:${(countdown! % 60)
              .toString()
              .padStart(2, "0")} fill`}
          </span>
        ) : (
          <>
            <PiPipeWrenchLight className="w-5 h-5" /> {"Claim"}
          </>
        )}
      </Button>
    </div>
  );
};

export default TimerButton;
