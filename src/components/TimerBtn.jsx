import { useState, useEffect, useCallback } from "react";
import Button from "./Button";
import { PiClockAfternoonLight, PiPipeWrenchLight } from "react-icons/pi";
import { useUserId, useUserInfo } from "../Store/TelegramStore";
import api from "../utils/axiosConfig";
import { twMerge } from "tailwind-merge";

const TimerButton = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [Loading, setLoading] = useState(false);

  const { userInfo, claim } = useUserInfo();
  const { userId } = useUserId();
  const calculateRemainingSeconds = useCallback(
    (lastClaimTime) => {
      const nowDate = new Date();
      const lastClaimDate = new Date(lastClaimTime);
      const nextClaimDate = new Date(
        lastClaimDate.getTime() + userInfo.timeLimit * 60 * 1000
      );
      const remainingTime = nextClaimDate - nowDate;
      return Math.max(Math.floor(remainingTime / 1000), 0);
    },
    [userInfo.timeLimit]
  );
  const fetchDate = async () => {
    setLoading(true);
    api
      .post("/claim", {
        userId: userId.userId,
      })
      .then((response) => {
        const { data } = response;
        console.log("data", data);
        const date = new Date(data.body.lastClaimTimestamp);
        const remainingSeconds = calculateRemainingSeconds(date);

        startCountdown(remainingSeconds);
        claim();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (userInfo) {
      if (userInfo.lastClaimTimestamp) {
        const date = new Date(userInfo.lastClaimTimestamp);
        const remainingSeconds = calculateRemainingSeconds(date);
        console.log("remainingSeconds", remainingSeconds);
        if (remainingSeconds) startCountdown(remainingSeconds);
      }
    }
  }, [calculateRemainingSeconds, userInfo]);

  // Function to start the countdown
  const startCountdown = (seconds) => {
    setIsButtonDisabled(true);
    setCountdown(seconds);
  };

  // Use useEffect to handle the countdown timer
  useEffect(() => {
    let timer = null;
    console.log("countdown", countdown);
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsButtonDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <Button
      loading={Loading}
      disabled={isButtonDisabled}
      onClick={fetchDate}
      className={twMerge(
        "flex items-center gap-2 !w-1/2 justify-center py-4  rounded-2xl",
        isButtonDisabled ? "!bg-[#1D1D1E]/30 !text-[#AFEF28]" : "!bg-[#1D1D1E]"
      )}
    >
      {isButtonDisabled ? (
        <span className="font-mono flex items-center gap-2">
          <PiClockAfternoonLight className="size-5" />
          {` ${Math.floor(countdown / 60)
            .toString()
            .padStart(2, "0")}:${(countdown % 60)
            .toString()
            .padStart(2, "0")} m to fill`}
        </span>
      ) : (
        <>
          <PiPipeWrenchLight className="size-5 " /> {"Claim"}
        </>
      )}
    </Button>
  );
};

export default TimerButton;
