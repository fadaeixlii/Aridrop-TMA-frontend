import { Progress } from "@/components/ui/progress";
import { useUserInfo } from "Store/TelegramStore";
import { IUsersRanks, useUsersRanksStore } from "Store/UsersRanks";
import Loading from "components/Loading/Loading";
import UserRankItem from "components/common/UserRankItem";
import * as React from "react";
import { PiArrowFatRightThin } from "react-icons/pi";
import { RankInfo, getUserRankInfo, ranksInfo } from "utils/constant";
import { formatNumber } from "utils/number";

export interface IRanksPageProps {}

export function RanksPage(props: IRanksPageProps) {
  const { fetchData, loading, usersRanks } = useUsersRanksStore();
  const { userInfo } = useUserInfo();

  React.useEffect(() => {
    fetchData();
  }, []);

  const userRank: RankInfo = React.useMemo(
    () => getUserRankInfo(userInfo?.storedScore || 0),
    [userInfo?.storedScore]
  );

  const [activeKey, setActiveKey] = React.useState(userRank.key);

  React.useEffect(() => {
    if (!activeKey) setActiveKey(userRank.key);
  }, [userRank.key]);

  const currentUsersRank: IUsersRanks | null = React.useMemo(
    () =>
      usersRanks.length
        ? usersRanks.find((rank) => rank.rank === activeKey) ?? null
        : null,
    [activeKey, usersRanks]
  );
  const currentRankInfo: RankInfo | null = React.useMemo(
    () => ranksInfo.find((rank) => rank.key === activeKey) ?? null,
    [activeKey, ranksInfo]
  );

  const handleClick = (type: "pre" | "next") => {
    const findIndex = usersRanks.findIndex((rank) => rank.rank === activeKey);
    if (findIndex >= 0) {
      if (type === "next") {
        if (findIndex + 1 < usersRanks.length) {
          setActiveKey(usersRanks[findIndex + 1].rank);
        }
      }
      if (type === "pre") {
        if (findIndex - 1 >= 0) {
          setActiveKey(usersRanks[findIndex - 1].rank);
        }
      }
    }
  };

  if (loading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loading />
      </div>
    );

  if (!currentRankInfo || !currentUsersRank) return null;
  console.log(userInfo?.storedScore ?? 0 / currentUsersRank.maxScore);
  console.log(userInfo?.storedScore);
  console.log(currentUsersRank.maxScore);
  console.log(userRank);

  return (
    <div className="w-full h-full flex flex-col items-center pt-10">
      <div className="flex w-full justify-center items-center flex-col gap-4   ">
        <img
          src={currentRankInfo.icon}
          alt=""
          className="aspect-square w-[40%] shrink "
        />

        <span className="flex items-center justify-between w-full gap-2 text-slate-400 text-lg px-5">
          <PiArrowFatRightThin
            className="size-8 rotate-180"
            onClick={() => {
              handleClick("pre");
            }}
          />
          <span>{currentRankInfo.key}</span>
          <PiArrowFatRightThin
            className="size-8 "
            onClick={() => {
              handleClick("next");
            }}
          />
        </span>
        <span className="flex items-center text-xs justify-center w-full gap-2 text-slate-400  px-5 py-4">
          {userRank.key === activeKey ? (
            userRank.nextScore ? (
              <span className="flex items-center w-full gap-2 ">
                <span className="text-xs">
                  {formatNumber(currentUsersRank.minScore)}
                </span>
                <Progress
                  value={Math.round(
                    ((userInfo?.storedScore ?? 0) / currentUsersRank.maxScore) *
                      100
                  )}
                  className="h-3 bg-slate-500 grow w-full"
                />
                <span className="text-xs">
                  {formatNumber(currentUsersRank.maxScore)}
                </span>
              </span>
            ) : (
              formatNumber(userInfo?.storedScore ?? 0)
            )
          ) : (
            `from ${formatNumber(currentUsersRank.minScore)}`
          )}
        </span>
      </div>
      <div className="grow w-full overflow-y-scroll overflow-x-hidden items-center flex flex-col gap-2">
        {currentUsersRank.users.length
          ? currentUsersRank.users.map((ref) => (
              <UserRankItem key={ref.telegramId} user={ref} />
            ))
          : ``}
      </div>
    </div>
  );
}
