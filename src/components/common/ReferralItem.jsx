import TelegramProfileImage from "./TelegramProfile";

export default function ReferralItem({ user }) {
  return (
    <div className="customBox px-5 py-3 flex items-center gap-2 justify-between w-full">
      <TelegramProfileImage telegramId={user.telegramId} />
      <span className="text-white mr-auto">
        {`${user.firstName ?? ""} ${user.lastName ?? ""}`}
      </span>
      <span className=" text-md number">
        {Math.round(user.rewardFromRank / 5 + 1000)} OPL
      </span>
    </div>
  );
}
