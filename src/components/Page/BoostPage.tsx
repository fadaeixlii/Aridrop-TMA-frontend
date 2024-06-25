import { useEffect, useState } from "react";
import { useUserId, useUserInfo } from "../../Store/TelegramStore";
import BottomModal from "components/common/BottonModal";
import Boost1 from "assets/boost1.svg";
import { BoostItem } from "components/Boost/BoostItem";
import { useMaxScoreBoostStore } from "Store/MaxScoreBoost";
import { useTimeLimitBoostStore } from "Store/timeLimitBoost";
import { BoostModal } from "components/Boost/BoostModal";
import { getInfoSpeed, getInfoStorage } from "utils/constant";
import { formatCurrency } from "utils/number";

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
    <div className="h-full flex flex-col items-center justify-between   pb-28">
      <div className=" p-4 flex flex-col items-center justify-center gap-2">
        <img src={Boost1} className="size-28" />
        <span className="text-4xl font-bold">
          <span>{formatCurrency(userInfo.storedScore)}</span>
        </span>
        <span className="text-[#9C9C9C] text-lg font-medium">
          {(userInfo.maxScore / (userInfo.timeLimit / 60)).toFixed(2)} OPA per
          hour
        </span>
      </div>
      <div className=" p-4 flex flex-col items-center justify-center gap-2">
        <span className="text-xl font-bold">Passive mining boosts</span>
        <span className="text-[#9C9C9C] text-xs font-medium">
          Upgrade storage and speed mine more
        </span>
      </div>
      <div className="w-full flex flex-col gap-4 px-4">
        <BoostItem
          desc="Increase the fill volume"
          icon={getInfoStorage(maxScore?.order ?? 1).icon}
          onClick={() => {
            setType("maxScore");
            if (maxScore) setShowModal(true);
          }}
          title="Opal Stone"
          nextLevel={maxScore?.order}
          nextPrice={maxScore?.price}
        />
        <BoostItem
          desc="Decrease time to fill"
          icon={getInfoSpeed(timeLimit?.order ?? 1).icon}
          onClick={() => {
            setType("timeLimit");
            if (timeLimit) setShowModal(true);
          }}
          title="Lightning speed"
          nextLevel={timeLimit?.order}
          nextPrice={timeLimit?.price}
        />
      </div>
      <div className=" p-4 flex flex-col items-center justify-center gap-2 px-4 w-full mt-5">
        <span className="text-xl font-bold">Robot mining boosts</span>
        <span className="text-[#9C9C9C] text-xs font-medium">
          Auto your mining
        </span>
        <div className="flex items-center gap-4 justify-center newBox p-5 text-white w-full ">
          <span>Coming Soon!</span>
        </div>
      </div>

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
