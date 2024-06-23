import { useEffect, useState } from "react";
import AnimatedCounter from "../common/AnimatedNumber";
import { useUserId, useUserInfo } from "../../Store/TelegramStore";
import BottomModal from "components/common/BottonModal";
import TelegramProfileImage from "components/common/TelegramProfile";
import OPA from "assets/OPA.svg";
import Stone from "assets/Stone.svg";
import Lighting from "assets/Lighting.svg";
import { BoostItem } from "components/Boost/BoostItem";
import { useMaxScoreBoostStore } from "Store/MaxScoreBoost";
import { useTimeLimitBoostStore } from "Store/timeLimitBoost";
import { BoostModal } from "components/Boost/BoostModal";

interface BoostPageProps {
  back: () => void;
}

const BoostPage: React.FC<BoostPageProps> = () => {
  const { userInfo } = useUserInfo();
  const { userId } = useUserId();

  const { fetchData: fetchDataMaxScore, maxScore } = useMaxScoreBoostStore();
  const { fetchData: fetchDataTimeLimit, timeLimit } = useTimeLimitBoostStore();

  useEffect(() => {
    if (userId) {
      fetchDataMaxScore(userId.userId);
      fetchDataTimeLimit(userId.userId);
    }
  }, []);

  const [showModal, setShowModal] = useState(false);

  const [type, setType] = useState<"timeLimit" | "maxScore" | null>(null);

  if (userInfo === null) return null;

  return (
    <div className="h-full flex flex-col items-center justify-start mt-10 gap-4 py-8">
      <div className=" p-4">
        <TelegramProfileImage
          telegramId={userInfo?.telegramId.toString() ?? ""}
          className="size-28"
        />
        <div className="flex items-center gap-3 flex-wrap justify-center my-2">
          <div className="font-bold">{`${userInfo?.firstName ?? ""} ${
            userInfo?.lastName ?? ""
          }`}</div>
        </div>
        <div className="text-center font-extralight text-4xl py-4 font-mono flex items-center gap-1">
          <AnimatedCounter
            from={userInfo.storedScore || 0}
            to={userInfo.storedScore}
          />
          <img src={OPA} alt="" className="size-8" />
        </div>
      </div>
      <BoostItem
        desc="Increase the fill volume"
        icon={Stone}
        onClick={() => {
          setType("maxScore");
          setShowModal(true);
        }}
        title="Opal Stone"
        nextLevel={maxScore?.order}
        nextPrice={maxScore?.price}
      />
      <BoostItem
        desc="Decrease time to fill"
        icon={Lighting}
        onClick={() => {
          setType("timeLimit");
          setShowModal(true);
        }}
        title="Lightning speed"
        nextLevel={timeLimit?.order}
        nextPrice={timeLimit?.price}
      />

      <BottomModal showModal={showModal} setShowModal={setShowModal}>
        {type ? (
          <BoostModal
            close={() => {
              setShowModal(false);
            }}
            type={type}
          />
        ) : (
          <>not available</>
        )}
      </BottomModal>
    </div>
  );
};

export default BoostPage;
