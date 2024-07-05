import { IUser } from "Store/TelegramStore";
import TelegramProfileImage from "./TelegramProfile";
import OPA from "assets/OPA.svg";
import TON from "assets/TON.svg";
import { useMemo } from "react";
import { RankInfo, getUserRankInfo } from "utils/constant";
import { formatNumber } from "utils/number";

interface UserRankItemProps {
  user: {
    collectedTon: number;
    telegramId: number;
    firstName: string;
    lastName: string;
    storedScore: number;
  };
}

const UserRankItem: React.FC<UserRankItemProps> = ({ user }) => {
  return (
    <div className="newBox px-5 py-3 flex items-center gap-3 justify-between w-full">
      <TelegramProfileImage telegramId={user.telegramId.toString()} />
      <div className="flex flex-col mr-auto">
        <span className="text-white text-base max-w-[70%] font-medium truncate">
          {`${user.firstName ?? ""} ${user.lastName ?? ""}`}
        </span>
        <div className="flex items-center gap-2">
          <span className="font-medium text-[14px]">
            {formatNumber(user.storedScore)} OPA
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-col">
        <span className="text-[14px]   flex items-center gap-1">
          {user.collectedTon}
          <img src={TON} alt="" className="size-4" />
        </span>
      </div>
    </div>
  );
};

export default UserRankItem;
