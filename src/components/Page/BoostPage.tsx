import { useState } from "react";
import CoinIcon from "./../../assets/CoinIcon.svg";
import AnimatedCounter from "../common/AnimatedNumber";
import { useUserId, useUserInfo } from "../../Store/TelegramStore";
import Missile from "../../assets/Missile.png";
import bank from "../../assets/Bank.png";
import { FaArrowCircleRight } from "react-icons/fa";
import api from "../../utils/axiosConfig";
import Button from "../common/Button";
import { notifySuccess } from "../../utils/constant";
import Back from "../common/Back";
import BoostItem from "../BoostItem";
import BottomModal from "components/common/BottonModal";

interface BoostPageProps {
  back: () => void;
}

interface BoostConfig {
  level: number;
  title: string;
  img: string;
  currentValue: JSX.Element;
  nextValue: JSX.Element;
  cost: number;
  onClick: () => void;
}

const BoostPage: React.FC<BoostPageProps> = ({ back }) => {
  const { userInfo, fetchData } = useUserInfo();
  const { userId } = useUserId();
  const [showModal, setShowModal] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [boostConfig, setBoostConfig] = useState<BoostConfig>({
    level: 0,
    title: "",
    img: "",
    currentValue: <></>,
    nextValue: <></>,
    cost: 0,
    onClick: () => {},
  });

  const handleBoost = async (boostType: string) => {
    setLoadingBtn(true);
    try {
      const response = await api.post(`/purchase-boost/${userId?.userId}`, {
        boostType,
      });
      console.log(response);
      setShowModal(false);
      fetchData(userId?.userId ?? "");
      notifySuccess("Boost Purchased 👻");
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingBtn(false);
    }
  };

  if (userInfo === null) return null;

  return (
    <div className="h-full flex flex-col items-center justify-start mt-10 gap-4 py-8">
      <Back back={back} />
      <div className="flex items-center gap-4 justify-center w-full text-white mb-5">
        <img src={CoinIcon} className="size-24" alt="Coin Icon" />
        <div className="flex flex-col gap-2 items-start">
          <div className="flex items-center gap-2 text-xl">Your Balance :</div>
          <div className="flex items-center gap-2">
            <div className="font-bold text-xl">
              <AnimatedCounter
                from={userInfo?.storedScore ?? 0 / 5}
                to={userInfo?.storedScore ?? 0}
              />
            </div>
          </div>
        </div>
      </div>
      <BoostItem
        img={Missile}
        level={20 - userInfo?.timeLimitMaxBoostCount ?? 0}
        text="Decrease time to claim. "
        current={
          <div>
            <span>{userInfo.timeLimit} Minute </span>
            {" /"}
            <span className="number"> -6 minute</span>
            <p>
              {" "}
              Cost:{" "}
              <span className="number">{userInfo.userTimeLimitPrice} OPL</span>
            </p>
          </div>
        }
        title="Claim Time"
        onClick={() => {
          setBoostConfig({
            cost: userInfo.userTimeLimitPrice,
            img: Missile,
            level: 20 - userInfo.timeLimitMaxBoostCount,
            title: "Claim Time",
            currentValue: <span>{userInfo.timeLimit} Minute </span>,
            nextValue: <span>{userInfo.timeLimit - 6} Minute </span>,
            onClick: () => handleBoost("timeLimit"),
          });
          setShowModal(true);
        }}
      />
      <BoostItem
        img={bank}
        level={20 - userInfo.maxScoreMaxBoostCount}
        text="increase profit per claim. "
        current={
          <div>
            <span>{userInfo.maxScore} OPL </span>
            {" /"}
            <span className="number"> +10 OPL</span>
            <p>
              {" "}
              Cost:{" "}
              <span className="number">{userInfo.userMaxScorePrice} OPL</span>
            </p>
          </div>
        }
        title="Profit per claim"
        onClick={() => {
          setBoostConfig({
            cost: userInfo.userMaxScorePrice,
            img: bank,
            level: 20 - userInfo.maxScoreMaxBoostCount,
            title: "Profit per claim",
            currentValue: <span>{userInfo.maxScore} OPL </span>,
            nextValue: <span>{userInfo.maxScore + 10} OPL </span>,
            onClick: () => handleBoost("maxScore"),
          });
          setShowModal(true);
        }}
      />
      <BottomModal showModal={showModal} setShowModal={setShowModal}>
        <div className="text-white flex flex-col items-center gap-1">
          <img src={boostConfig.img} alt="" className="size-20" />
          <span className="text-lg flex items-center gap-2">
            {boostConfig.title} LVL {boostConfig.level}
            <FaArrowCircleRight className="size-4" /> LVL{" "}
            {boostConfig.level + 1}
          </span>
          <p>
            Cost:{" "}
            <span className="number">{userInfo.userMaxScorePrice} OPL</span>
          </p>
          <span className="text-lg flex items-center gap-2">
            {boostConfig.currentValue}
            <FaArrowCircleRight className="size-4" /> {boostConfig.nextValue}
          </span>
          <Button
            onClick={() => {
              boostConfig.onClick();
            }}
            loading={loadingBtn}
            className="flex items-center gap-2 !w-1/2 my-2 justify-center py-2 !bg-[#AFEF28] text-black rounded-lg"
          >
            Boost
          </Button>
        </div>
      </BottomModal>
    </div>
  );
};

export default BoostPage;