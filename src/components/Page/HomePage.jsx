import ClaimBox from "../ClaimBox";
import ReferralAndClub from "../ReferralAndClub";
import { useTaskStore } from "../../Store/TaskStore";
import TaskItem from "../common/TaskItem";
import BounceLoading from "../Loading/BounceLoading";

export default function HomePage({ setActiveTab }) {
  const { tasks, loading: loadingTask } = useTaskStore();
  const activeTasks = tasks.filter((task) => !task.isCompleted);
  return (
    <div className="flex flex-col gap-5 w-full">
      <ClaimBox setActiveTab={setActiveTab} />
      <ReferralAndClub setActiveTab={setActiveTab} />
      <div className="text-white text-lg flex justify-between items-center">
        <span>Start Missions Now!</span>
        <span
          onClick={() => {
            setActiveTab("Missions");
          }}
        >
          See All
        </span>
      </div>
      {activeTasks.length ? (
        !loadingTask ? (
          activeTasks.map((task, index) => <TaskItem task={task} key={index} />)
        ) : (
          <BounceLoading />
        )
      ) : (
        <span className="text-white text-center">
          Not have any active Task !
        </span>
      )}
    </div>
  );
}
