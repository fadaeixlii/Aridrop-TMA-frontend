import { useTaskStore } from "../../Store/TaskStore";
import { useUserInfo } from "../../Store/TelegramStore";
import BounceLoading from "../Loading/BounceLoading";
import AnimatedCounter from "../common/AnimatedNumber";
import Back from "../common/Back";
import TaskItem from "../common/TaskItem";
import CoinIcon from "../../assets/CoinIcon.svg";

interface Props {
  back: () => void;
}

const MissionsPage: React.FC<Props> = ({ back }) => {
  const { tasks, loading: loadingTask } = useTaskStore();
  const { userInfo } = useUserInfo();

  return (
    <div className="flex flex-col gap-3 w-full mt-10">
      <Back back={back} />

      <div className="flex items-center gap-4 justify-center w-full text-white mb-5">
        <img src={CoinIcon} className="size-24" alt="Coin Icon" />
        <div className="flex flex-col gap-2 items-start">
          <div className="flex items-center gap-2 text-xl">Your Balance :</div>
          <div className="flex items-center gap-2">
            <div className="font-bold text-xl">
              <AnimatedCounter
                from={userInfo?.storedScore ? userInfo.storedScore / 5 : 0}
                to={userInfo?.storedScore ?? 0}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="text-white text-lg flex justify-between items-center w-full">
        <span>Missions Page</span>
      </div>
      {tasks ? (
        !loadingTask ? (
          tasks.map((task, index) => <TaskItem task={task} key={index} />)
        ) : (
          <BounceLoading />
        )
      ) : (
        <span className="text-white text-center">
          Not have any active Task!
        </span>
      )}
    </div>
  );
};

export default MissionsPage;
