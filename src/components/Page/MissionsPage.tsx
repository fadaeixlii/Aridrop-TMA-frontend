import { useTaskStore } from "../../Store/TaskStore";
import { useUserInfo } from "../../Store/TelegramStore";
import BounceLoading from "../Loading/BounceLoading";
import AnimatedCounter from "../common/AnimatedNumber";
import Back from "../common/Back";
import TaskItem from "../common/TaskItem";
import CoinIcon from "../../assets/CoinIcon.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TelegramProfileImage from "components/common/TelegramProfile";
import { RanksListTask } from "components/Missions/RanksListTask";
import { ReferralRewardsListTask } from "components/Missions/ReferralRewardsListTask";
import OPA from "assets/OPA.svg";

interface Props {
  back: () => void;
}

const MissionsPage: React.FC<Props> = ({ back }) => {
  const { tasks, loading: loadingTask } = useTaskStore();
  const { userInfo } = useUserInfo();
  if (!userInfo) return null;

  return (
    <div className="h-full flex flex-col items-center justify-start mt-4 gap-4 text-white pb-28">
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
        <div className="text-center font-extralight text-4xl py-4 font-mono flex items-center gap-1 justify-center">
          <AnimatedCounter
            from={userInfo.storedScore || 0}
            to={userInfo.storedScore}
          />
          <img src={OPA} alt="" className="size-8" />
        </div>
      </div>
      <div className="grow w-full overflow-scroll flex flex-col gap-2">
        <Tabs defaultValue="special" className="">
          <TabsList className="grid w-full grid-cols-3 bg-transparent">
            <TabsTrigger value="special">Special</TabsTrigger>
            <TabsTrigger value="leagues">Leagues</TabsTrigger>
            <TabsTrigger value="ref">Ref Tasks</TabsTrigger>
          </TabsList>
          <TabsContent value="special" className="flex flex-col w-full gap-2">
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
          </TabsContent>
          <TabsContent value="leagues">
            <RanksListTask />
          </TabsContent>
          <TabsContent value="ref">
            <ReferralRewardsListTask />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MissionsPage;
