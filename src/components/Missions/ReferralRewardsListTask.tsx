import { useUserId, useUserInfo } from "Store/TelegramStore";
import * as React from "react";
import { LeaguesReferralTaskItem } from "./LeaguesReferralTaskItem";
import OPA from "assets/OPA.svg";
import { notifyError, notifySuccess } from "utils/constant";
import api from "utils/axiosConfig";
import { useReferralRewardStore } from "Store/ReferralRewardsStore";

export interface IReferralRewardsListTaskProps {}

export function ReferralRewardsListTask(props: IReferralRewardsListTaskProps) {
  const { fetchData, referralRewards } = useReferralRewardStore();
  const { userId } = useUserId();
  const { userInfo } = useUserInfo();

  React.useEffect(() => {
    if (userId) fetchData(userId?.userId);
  }, [userId]);

  const handleVerifyTask = async (userId: string, rewardId: string) => {
    try {
      const response = await api.post("/claim-referral-reward", {
        userId,
        rewardId,
      });
      console.log(response);
      notifySuccess("Claimed successfully");
    } catch (error) {
      console.log(error);
      notifyError("Something bad happen!");
    }
  };

  if (!userId || !userInfo || !referralRewards) return null;

  return (
    <div className="w-full flex flex-col items-center gap-2">
      {referralRewards.map((referralReward) => (
        <LeaguesReferralTaskItem
          key={referralReward.title}
          icon={OPA}
          onClaim={async () => {
            await handleVerifyTask(userId.userId, referralReward.id);
          }}
          progress={Math.round(
            (userInfo?.referrals.length / referralReward.referralsNeeded) * 100
          )}
          reward={referralReward.rewardValue}
          title={referralReward.title}
        />
      ))}
    </div>
  );
}
