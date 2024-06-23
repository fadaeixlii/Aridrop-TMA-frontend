import { copyHelper } from "../../utils/CopyUtils";
import { useUserId, useUserInfo } from "../../Store/TelegramStore";
import ReferralItem from "../common/ReferralItem";
import { useMemo } from "react";
import { getUserRankInfo } from "../../utils/constant";
import TelegramProfileImage from "../common/TelegramProfile";
import Button from "components/common/Button";
import { CopyIcon } from "lucide-react";

interface Props {
  back: () => void;
}

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
          copyHelper(
            `t.me/DemoAirDropMegaWallet1_bot?start=${
              userInfo?.referralCode ?? ""
            }`
          );
        }}
        className="w-full bg-[#1D1D1E] "
      >
        <CopyIcon /> Copy invite link
      </Button>
    </div>
  );
};

export default ReferralPage;
