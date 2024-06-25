import { copyHelper } from "../../utils/CopyUtils";
import { useUserId, useUserInfo } from "../../Store/TelegramStore";
import ReferralItem from "../common/ReferralItem";
import { useMemo } from "react";
import { getUserRankInfo } from "../../utils/constant";
import TelegramProfileImage from "../common/TelegramProfile";
import Button from "components/common/Button";
import { initUtils } from "@tma.js/sdk";

interface Props {
  back: () => void;
}
const utils = initUtils();

const ReferralPage: React.FC<Props> = () => {
  const { userInfo } = useUserInfo();
  const { userId } = useUserId();

  const userRank = useMemo(
    () => userInfo && getUserRankInfo(userInfo?.storedScore),
    [userInfo?.storedScore]
  );

  if (!userRank) return null;

  return (
    <div className="h-full flex flex-col items-center justify-start mt-4 gap-4 text-white pb-28">
      <div className=" p-4">
        <TelegramProfileImage
          telegramId={userId?.telegramId.toString() ?? ""}
          className="size-28"
        />
        <div className="flex items-center gap-3 flex-wrap justify-center my-4">
          <div className="font-bold text-2xl">
            {userInfo?.referrals.length} Friend
          </div>
        </div>
        <div className="text-center font-extralight text-xl  ">
          Every time your friend claims OPA you get 20% cashback
        </div>
      </div>
      <div className="grow w-full overflow-scroll flex flex-col gap-2">
        {userInfo?.referrals.map((ref) => (
          <ReferralItem key={ref.telegramId} user={ref} />
        ))}
      </div>
      <Button
        onClick={() => {
          utils.shareURL(
            `t.me/DemoAirDropMegaWallet1_bot?start=${
              userInfo?.referralCode ?? ""
            }`,
            "Invite your friends and get bonuses for each invited friend!"
          );
          copyHelper(
            `t.me/DemoAirDropMegaWallet1_bot?start=${
              userInfo?.referralCode ?? ""
            }`
          );
        }}
        className="w-full !bg-[#00B964FC] text-white "
      >
        Invite, mine 20% more
      </Button>
    </div>
  );
};

export default ReferralPage;
