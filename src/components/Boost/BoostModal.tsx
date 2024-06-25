import * as React from "react";
import { BoostItemModal } from "./BoostItemModal";
import { useUserId, useUserInfo } from "Store/TelegramStore";
import { useMaxScoreBoostStore } from "Store/MaxScoreBoost";
import { useTimeLimitBoostStore } from "Store/timeLimitBoost";
import { PiArrowCircleUpFill } from "react-icons/pi";
import Button from "components/common/Button";
import OPA from "assets/OPA.svg";
import { notifyError, notifySuccess } from "utils/constant";
import api from "utils/axiosConfig";
import { formatCurrency } from "utils/number";

export interface IBoostModalProps {
  type: "timeLimit" | "maxScore";
  close: () => void;
}

export function BoostModal(props: IBoostModalProps) {
  const { type, close } = props;
  const { userInfo, fetchData } = useUserInfo();
  const { userId } = useUserId();

  const [loading, setLoading] = React.useState(false);

  const { maxScore, fetchData: maxScoreFetch } = useMaxScoreBoostStore();
  const { timeLimit, fetchData: timeLimitFetch } = useTimeLimitBoostStore();

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await api.post("/purchase-boost", {
        userId: userId?.userId,
        boostType: type,
        boostId: type === "maxScore" ? maxScore?.id : timeLimit?.id,
      });
      console.log(response);
      if (userId) {
        fetchData(userId?.userId);
        maxScoreFetch(userId?.userId);
        timeLimitFetch(userId?.userId);
      }

      notifySuccess("Upgrade successfully");
    } catch (error) {
      console.log(error);
      notifyError("Upgrade fail!");
    } finally {
      setLoading(false);
      close();
    }
  };

  if (!maxScore || !timeLimit || !userInfo) return null;

  return (
    <div className="flex items-center flex-col text-white gap-4 justify-between w-full h-full">
      <h2 className="text-2xl">
        {type === "maxScore" ? "Opal Stone" : "Lighting Speed"}
      </h2>
      <p>
        {type === "maxScore"
          ? "Increase the fill volume"
          : "Decrease time to fill"}
      </p>

      <div className="flex flex-col items-center w-full gap-2">
        <BoostItemModal
          type={type}
          boostEffect={
            type === "maxScore"
              ? userInfo?.maxScore + maxScore?.effect
              : userInfo?.timeLimit - timeLimit?.effect
          }
          level={
            type === "maxScore" ? maxScore?.order + 1 : timeLimit?.order + 1
          }
        />
        <PiArrowCircleUpFill className="text-white size-8" />
        <BoostItemModal
          type={type}
          boostEffect={
            type === "maxScore" ? userInfo?.maxScore : userInfo?.timeLimit
          }
          level={type === "maxScore" ? maxScore?.order : timeLimit?.order}
        />
      </div>
      <div className="flex items-center gap-2 my-4 mt-6">
        <img src={OPA} alt="opa" className="size-9" />
        <span className="text-2xl">
          {type === "maxScore"
            ? formatCurrency(maxScore.price)
            : formatCurrency(timeLimit.price)}
        </span>
      </div>
      <Button
        onClick={handleClick}
        className="!bg-[#00B964FC] w-full  flex items-center justify-center"
        loading={loading}
        disabled={loading}
      >
        {`Upgrade`}
      </Button>
    </div>
  );
}
