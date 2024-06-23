import { IUser } from "Store/TelegramStore";
import TelegramProfileImage from "./TelegramProfile";
import OPA from "assets/OPA.svg";

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
      <span className="text-md font-mono flex items-center gap-1">
        +{Math.round(user.rewardFromRank + 200)}
        <img src={OPA} alt="" className="size-3" />
      </span>
    </div>
  );
};

export default ReferralItem;
