import { useUserInfo } from "Store/TelegramStore";
import Button from "./common/Button";
import { PiClockAfternoonLight, PiPipeWrenchLight } from "react-icons/pi";
import { twMerge } from "tailwind-merge";
import useClaimHandler from "utils/useClaimHandler";
import clsx from "clsx";
import OPA from "assets/OPA.svg";

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
        "flex items-center gap-2 w-full justify-center py-4 !rounded-lg mb-0 relative ",
        isButtonDisabled || loading
          ? "!bg-[#1D1D1E]/50 !text-[#90ff46]"
          : "!bg-[#fff] text-black"
      )}
    >
      {isButtonDisabled ? (
        <span className="  flex items-center gap-2 text-lg">
          <div
            className={clsx(
              "absolute left-0 top-0 h-full !bg-[#5a761e7e] z-[-1] !rounded-l-lg "
            )}
            style={{
              width: `${percent}%`,
            }}
          ></div>

          {"Claim in :"}
          {` ${Math.floor(countdown! / 3600)
            .toString()
            .padStart(2, "0")}:${Math.floor((countdown! % 3600) / 60)
            .toString()
            .padStart(2, "0")}:${(countdown! % 60)
            .toString()
            .padStart(2, "0")} `}
        </span>
      ) : (
        <div className="flex items-center  gap-2 text-lg">Start Mining</div>
      )}
    </Button>
  );
};

export default TimerButton;
