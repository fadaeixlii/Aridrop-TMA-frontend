import { FaCopy } from "react-icons/fa";
import { copyHelper } from "../../utils/CopyUtils";
import { useUserId, useUserInfo } from "../../Store/TelegramStore";
import ReferralItem from "../common/ReferralItem";
import { useMemo } from "react";
import { getUserRankInfo } from "../../utils/constant";
import TelegramProfileImage from "../common/TelegramProfile";
import Back from "../common/Back";

interface Props {
  back: () => void;
}

const ReferralPage: React.FC<Props> = ({ back }) => {
  const { userInfo } = useUserInfo();
  const { userId } = useUserId();

  const userRank = useMemo(
    () => userInfo && getUserRankInfo(userInfo?.storedScore),
    [userInfo?.storedScore]
  );

  if (!userRank) return null;

  return (
    <div className="h-full flex flex-col items-center justify-start mt-4 gap-4 text-white py-8">
      <Back back={back} />

      <p className="text-ls text-left mr-auto">Referral Page</p>

      <div className="customBox p-4">
        <img src={userRank.icon} alt="" className="size-24 mx-auto my-2" />
        <p className="text-xl text-center text-white my-2">{userRank.key}</p>
        <p className="text-xl text-center text-white my-2">
          NextRank: <span className="number">{userRank.nextRank}</span> OPL
        </p>
        <div className="flex items-center gap-3 flex-wrap justify-center my-2">
          <TelegramProfileImage
            telegramId={userId?.telegramId.toString() ?? ""}
          />
          <div className="font-bold">{`${userInfo?.firstName ?? ""} ${
            userInfo?.lastName ?? ""
          }`}</div>
        </div>
        <div className="px-4 py-2 text-white rounded-md flex items-center w-full justify-between gap-4">
          <span className="text-md">
            {`t.me/DemoAirDropMegaWallet1_bot?start=${
              userInfo?.referralCode ?? ""
            }`}
          </span>
          <FaCopy
            className="cursor-pointer size-8"
            onClick={() => {
              copyHelper(
                `t.me/DemoAirDropMegaWallet1_bot?start=${
                  userInfo?.referralCode ?? ""
                }`
              );
            }}
          />
        </div>
      </div>
      {userInfo?.referrals.map((ref) => (
        <ReferralItem key={ref.telegramId} user={ref} />
      ))}
    </div>
  );
};

export default ReferralPage;
