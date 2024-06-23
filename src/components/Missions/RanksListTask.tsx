import { useUserId, useUserInfo } from "Store/TelegramStore";
import { useRankStore } from "Store/ranksStore";
import * as React from "react";
import { LeaguesReferralTaskItem } from "./LeaguesReferralTaskItem";
import OPA from "assets/OPA.svg";
import { notifyError, notifySuccess } from "utils/constant";
import api from "utils/axiosConfig";

export interface IRanksListTaskProps {}

export function RanksListTask(props: IRanksListTaskProps) {
  const { fetchData, ranks } = useRankStore();
  const { userId } = useUserId();
  const { userInfo } = useUserInfo();

  React.useEffect(() => {
    if (userId) fetchData(userId?.userId);
  }, [userId]);

  const handleVerifyTask = async (userId: string, rankId: string) => {
    try {
      const response = await api.post("/claim-rank", {
        userId,
        rankId,
      });
      console.log(response);
      notifySuccess("Claimed successfully");
    } catch (error) {
      console.log(error);
      notifyError("Something bad happen!");
    }
  };

  if (!userId || !userInfo || !ranks) return null;

  return (
    <div className="w-full flex flex-col items-center gap-2">
      {ranks.map((rank) => (
        <LeaguesReferralTaskItem
          key={rank.name}
          icon={OPA}
          onClaim={async () => {
            await handleVerifyTask(userId.userId, rank.id);
          }}
          progress={Math.round((userInfo?.storedScore / rank.maxScore) * 100)}
          reward={rank.reward}
          title={rank.name}
        />
      ))}
    </div>
  );
}
