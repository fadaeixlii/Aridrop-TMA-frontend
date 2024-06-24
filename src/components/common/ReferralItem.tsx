import { IUser } from "Store/TelegramStore";
import TelegramProfileImage from "./TelegramProfile";
import OPA from "assets/OPA.svg";
import { useMemo } from "react";
import { RankInfo, getUserRankInfo } from "utils/constant";
import { formatNumber } from "utils/number";

interface ReferralItemProps {
  user: IUser;
}

const ReferralItem: React.FC<ReferralItemProps> = ({ user }) => {
  const userRank: RankInfo = useMemo(
    () => getUserRankInfo(user?.storedScore || 0),
    [user?.storedScore]
  );

  return (
    <div className="newBox px-5 py-3 flex items-center gap-3 justify-between w-full">
      <TelegramProfileImage telegramId={user.telegramId.toString()} />
      <div className="flex flex-col mr-auto">
        <span className="text-white text-xl font-medium">
          {`${user.firstName ?? ""} ${user.lastName ?? ""}`}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[#9D9D9D] font-medium text-xs">
            {userRank.key}
          </span>
          <span className="font-medium text-[14px]">
            {formatNumber(userRank.score)} OPA
          </span>
        </div>
      </div>
      <span className="text-md   flex items-center gap-1">
        +{formatNumber(Math.round(user.rewardFromRank + 200))}
        <img src={OPA} alt="" className="size-3" />
      </span>
    </div>
  );
};

export default ReferralItem;
