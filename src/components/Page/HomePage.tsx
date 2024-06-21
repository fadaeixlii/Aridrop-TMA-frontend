import ClaimBox from "../ClaimBox";
import ReferralAndClub from "../ReferralAndClub";
import { useTaskStore, Task } from "../../Store/TaskStore"; // Ensure Task type is imported or defined correctly
import TaskItem from "../common/TaskItem";
import BounceLoading from "../Loading/BounceLoading";

interface Props {
  setActiveTab: (tab: string) => void;
}

const HomePage: React.FC<Props> = ({ setActiveTab }) => {
  const { tasks } = useTaskStore();

  return (
    <div className="flex flex-col gap-5 w-full h-screen max-h-screen o">
      <ClaimBox setActiveTab={setActiveTab} />
      {/* <ReferralAndClub setActiveTab={setActiveTab} /> */}
      {/* <div className="text-white text-lg flex justify-between items-center">
        <span>Start Missions Now!</span>
        <span
          onClick={() => {
            setActiveTab("Missions");
          }}
          className="cursor-pointer"
        >
          See All
        </span>
      </div>
      {activeTasks.length ? (
        !loadingTask ? (
          activeTasks.map((task: Task, index: number) => (
            <TaskItem task={task} key={index} />
          ))
        ) : (
          <BounceLoading />
        )
      ) : (
        <span className="text-white text-center">
          No active tasks available!
        </span>
      )} */}
    </div>
  );
};

export default HomePage;
