import { useCountDownStore } from "Store/CountDownStore";
import { useUserId, useUserInfo } from "Store/TelegramStore";
import { useEffect, useCallback, useState } from "react";
import api from "./axiosConfig";
import { notifySuccess } from "./constant";

const useClaimHandler = () => {
  const {
    seconds: countdown,
    setSeconds: setCountdown,
    decrease,
    loading,
    setLoading,
  } = useCountDownStore();

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  console.log(countdown, isButtonDisabled);

  const { userInfo, claim } = useUserInfo();
  const { userId } = useUserId();

  const calculateRemainingSeconds = useCallback(
    (lastClaimTime: number) => {
      console.log("calculateRemainingSeconds");
      if (!userInfo) return 0;

      const nowDate = new Date();
      const nextClaimDate = new Date(
        lastClaimTime + userInfo.timeLimit * 60 * 1000
      );
      const remainingTime = nextClaimDate.getTime() - nowDate.getTime();
      console.log(remainingTime);
      return Math.max(Math.floor(remainingTime / 1000), 0);
    },
    [userInfo]
  );

  const fetchDate = async () => {
    if (!userId || loading) return;
    setLoading(true);

    try {
      const response = await api.post("/claim", {
        userId: userId.userId,
      });
      const { data } = response;
      const remainingSeconds = calculateRemainingSeconds(
        data.body.lastClaimTimestamp
      );

      startCountdown(remainingSeconds);
      claim();
      notifySuccess(`Claimed ${userInfo?.maxScore} 💎`);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(userInfo, countdown);
    if (userInfo && userInfo.lastClaimTimestamp) {
      const remainingSeconds = calculateRemainingSeconds(
        userInfo.lastClaimTimestamp
      );
      if (remainingSeconds) startCountdown(remainingSeconds);
      console.log(remainingSeconds);
    }
  }, [calculateRemainingSeconds, userInfo]);

  const startCountdown = (seconds: number) => {
    setIsButtonDisabled(true);
    setCountdown(seconds);
    console.log("startCountdown", seconds);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (countdown !== null && countdown > 0) {
      setIsButtonDisabled(true);
      timer = setTimeout(() => {
        decrease();
      }, 1000);
    } else if (countdown === 0) {
      setIsButtonDisabled(false);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown]);

  const claimed = userInfo?.timeLimit
    ? (
        (1 - countdown! / (userInfo?.timeLimit * 60)) *
        userInfo.maxScore
      ).toFixed(0)
    : 0;

  return {
    isButtonDisabled,
    loading,
    countdown,
    claimed,
    fetchDate,
    calculateRemainingSeconds,
    startCountdown,
  };
};

export default useClaimHandler;
