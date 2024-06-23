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

export interface IBoostModalProps {
  type: "timeLimit" | "maxScore";
  close: () => void;
}

export function BoostModal(props: IBoostModalProps) {
  const { type, close } = props;
  const { userInfo } = useUserInfo();
  const { userId } = useUserId();

  const [loading, setLoading] = React.useState(false);

  const { maxScore } = useMaxScoreBoostStore();
  const { timeLimit } = useTimeLimitBoostStore();

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await api.post("/purchase-boost", {
        userId: userId?.userId,
        boostType: type,
        boostId: type === "maxScore" ? maxScore?.id : timeLimit?.id,
      });
      console.log(response);

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
    <div className="flex items-center flex-col text-white gap-4 justify-between w-full">
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
          level={type === "maxScore" ? maxScore?.order : timeLimit?.order}
        />
        <PiArrowCircleUpFill className="text-white size-8" />
        <BoostItemModal
          type={type}
          boostEffect={
            type === "maxScore" ? userInfo?.maxScore : userInfo?.timeLimit
          }
          level={
            type === "maxScore" ? maxScore?.order - 1 : timeLimit?.order - 1
          }
        />
      </div>
      <Button
        onClick={handleClick}
        className="!bg-[#00B964FC] w-full mt-4 flex items-center justify-center"
        loading={loading}
        disabled={loading}
      >
        {`Upgrade for ${
          type === "maxScore" ? maxScore.price : timeLimit.price
        } `}
        <img src={OPA} alt="opa" />
      </Button>
    </div>
  );
}
