import { IUser } from "Store/TelegramStore";
import TelegramProfileImage from "./TelegramProfile";

interface ReferralItemProps {
  user: IUser;
}

const ReferralItem: React.FC<ReferralItemProps> = ({ user }) => {
  return (
    <div className="customBox px-5 py-3 flex items-center gap-2 justify-between w-full">
      <TelegramProfileImage telegramId={user.telegramId.toString()} />
      <span className="text-white mr-auto">
        {`${user.firstName ?? ""} ${user.lastName ?? ""}`}
      </span>
      <span className="text-md number">
        {Math.round(user.rewardFromRank / 5 + 1000)} OPL
      </span>
    </div>
  );
};

export default ReferralItem;
