import { useUserInfo } from "Store/TelegramStore";
import Button from "./common/Button";
import { PiClockAfternoonLight, PiPipeWrenchLight } from "react-icons/pi";
import { twMerge } from "tailwind-merge";
import useClaimHandler from "utils/useClaimHandler";
import clsx from "clsx";

const TimerButton: React.FC = () => {
  const { isButtonDisabled, loading, countdown, claimed, fetchDate } =
    useClaimHandler();

  const { userInfo } = useUserInfo();
  if (!userInfo) return null;

  const percent = Math.round((+claimed / userInfo?.maxScore) * 100);

  return (
    <Button
      loading={loading}
      disabled={isButtonDisabled || loading}
      onClick={fetchDate}
      className={twMerge(
        "flex items-center gap-2 w-full justify-center py-4 rounded-lg mb-0 relative ",
        isButtonDisabled || loading
          ? "bg-[#1D1D1E]/50 text-[#90ff46]"
          : "!bg-white "
      )}
    >
      {isButtonDisabled ? (
        <span className="font-mono flex items-center gap-2 text-xs">
          <div
            className={clsx(
              "absolute left-0 top-0 h-full bg-[#5a761e7e] z-[-1] rounded-l-lg "
            )}
            style={{
              width: `${percent}%`,
            }}
          ></div>
          <PiClockAfternoonLight className="size-5" />
          {"Claim in :"}
          {` ${Math.floor(countdown! / 3600)
            .toString()
            .padStart(2, "0")}:${Math.floor((countdown! % 3600) / 60)
            .toString()
            .padStart(2, "0")}:${(countdown! % 60)
            .toString()
            .padStart(2, "0")} fill / ${claimed} OPA`}
        </span>
      ) : (
        <div className="flex items-center text-black gap-2 text-xs">
          <PiPipeWrenchLight className="size-5" />{" "}
          {`Claim ${userInfo?.maxScore} OPA / Start mining`}
        </div>
      )}
    </Button>
  );
};

export default TimerButton;
