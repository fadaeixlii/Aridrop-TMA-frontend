import Rank1 from "assets/Rank/Rank1.svg";
import Rank2 from "assets/Rank/Rank2.svg";
import Rank3 from "assets/Rank/Rank3.svg";
import Rank4 from "assets/Rank/Rank4.svg";
import Rank5 from "assets/Rank/Rank5.svg";
import Rank6 from "assets/Rank/Rank6.svg";
import Rank7 from "assets/Rank/Rank7.svg";
import Rank8 from "assets/Rank/Rank8.svg";
import Rank9 from "assets/Rank/Rank9.svg";
import Rank10 from "assets/Rank/Rank10.svg";
import toast from "react-hot-toast";

import invite1 from "assets/Invite/Invite1.svg";
import invite3 from "assets/Invite/Invite2.svg";
import invite5 from "assets/Invite/Invite3.svg";
import invite10 from "assets/Invite/Invite4.svg";
import invite20 from "assets/Invite/Invite5.svg";
import invite30 from "assets/Invite/Invite6.svg";
import invite50 from "assets/Invite/Invite7.svg";
import invite100 from "assets/Invite/Invite8.svg";

import LL1 from "assets/Speed/LL1.svg";
import LL2 from "assets/Speed/LL2.svg";
import LL3 from "assets/Speed/LL3.svg";
import LL4 from "assets/Speed/LL4.svg";
import LL5 from "assets/Speed/LL5.svg";
import LL6 from "assets/Speed/LL6.svg";

import sl1 from "assets/Storage/sl1.svg";
import sl2 from "assets/Storage/sl2.svg";
import sl3 from "assets/Storage/sl3.svg";
import sl4 from "assets/Storage/sl4.svg";
import sl5 from "assets/Storage/sl5.svg";
import sl6 from "assets/Storage/sl6.svg";

const InviteInfo = [
  {
    inviteNeeded: 1,
    icon: invite1,
  },

  {
    inviteNeeded: 3,
    icon: invite3,
  },
  {
    inviteNeeded: 5,
    icon: invite5,
  },
  {
    inviteNeeded: 10,
    icon: invite10,
  },
  {
    inviteNeeded: 20,
    icon: invite20,
  },
  {
    inviteNeeded: 30,
    icon: invite30,
  },
  {
    inviteNeeded: 50,
    icon: invite50,
  },
  {
    inviteNeeded: 100,
    icon: invite100,
  },
];

const StorageInfo = [
  {
    order: 1,
    icon: sl1,
  },
  {
    order: 2,
    icon: sl2,
  },
  {
    order: 3,
    icon: sl3,
  },
  {
    order: 4,
    icon: sl4,
  },
  {
    order: 5,
    icon: sl5,
  },
  {
    order: 6,
    icon: sl6,
  },
];

const SpeedInfo = [
  {
    order: 1,
    icon: LL1,
  },
  {
    order: 2,
    icon: LL2,
  },
  {
    order: 3,
    icon: LL3,
  },
  {
    order: 4,
    icon: LL4,
  },
  {
    order: 5,
    icon: LL5,
  },
  {
    order: 6,
    icon: LL6,
  },
];

export interface RankInfo {
  key: string;
  icon: string;
  score: number;
}

interface UserRankInfo extends RankInfo {
  nextRank: number;
}

export const ranksInfo: RankInfo[] = [
  {
    key: "Boulder Opal",
    icon: Rank1,
    score: 1000,
  },
  {
    key: "Golden Opal",
    icon: Rank2,
    score: 10000,
  },
  {
    key: "Koroit Opal",
    icon: Rank3,
    score: 100000,
  },
  {
    key: "Honey Opal",
    icon: Rank4,
    score: 500000,
  },
  {
    key: "Matrix Opal",
    icon: Rank5,
    score: 2000000,
  },
  {
    key: "Golden Fire Opal",
    icon: Rank6,
    score: 5000000,
  },
  {
    key: "Girasol Opal",
    icon: Rank7,
    score: 10000000,
  },
  {
    key: "Crystal Opal",
    icon: Rank8,
    score: 20000000,
  },
  {
    key: "Fire Opal",
    icon: Rank9,
    score: 40000000,
  },
  {
    key: "Andamooka Opal",
    icon: Rank10,
    score: 100000000,
  },
  {
    key: "Infinity Opal",
    icon: Rank10,
    score: Infinity,
  },
];

const findLastIndex = (
  array: RankInfo[],
  predicate: (i: RankInfo) => boolean
) => {
  for (let i = array.length - 1; i >= 0; i--) {
    if (predicate(array[i])) {
      return i;
    }
  }
  return -1;
};

export const getUserRankInfo = (userScore: number): UserRankInfo => {
  const Index = findLastIndex(ranksInfo, (rank) => rank.score <= userScore);
  if (Index < 0)
    return {
      key: "Boulder Opal",
      icon: Rank1,
      score: 1000,
      nextRank: 1000,
    };
  return {
    ...ranksInfo[Index],
    nextRank:
      Index + 1 <= ranksInfo.length - 1 ? ranksInfo[Index].score : Infinity,
  };
};

export const notifySuccess = (text: string): void => {
  toast.success(text, {
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });
};

export const notifyError = (text: string): void => {
  toast.error(text, {
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });
};

export const getInfoInvite = (inviteNeeded: number) => {
  const inviteInfoFoundedIndex = InviteInfo.findIndex(
    (invite) => invite.inviteNeeded === inviteNeeded
  );
  if (inviteInfoFoundedIndex >= 0) return InviteInfo[inviteInfoFoundedIndex];
  return InviteInfo[InviteInfo.length - 1];
};
export const getInfoStorage = (order: number) => {
  const StorageInfoFoundedIndex = StorageInfo.findIndex(
    (storage) => storage.order === order
  );
  if (StorageInfoFoundedIndex >= 0) return StorageInfo[StorageInfoFoundedIndex];
  return StorageInfo[StorageInfo.length - 1];
};
export const getInfoSpeed = (order: number) => {
  const SpeedInfoFoundedIndex = SpeedInfo.findIndex(
    (speed) => speed.order === order
  );
  if (SpeedInfoFoundedIndex >= 0) return SpeedInfo[SpeedInfoFoundedIndex];
  return SpeedInfo[SpeedInfo.length - 1];
};
export const getInfoRank = (key: string) => {
  const RankInfoFoundedIndex = ranksInfo.findIndex((rank) => rank.key === key);
  if (RankInfoFoundedIndex >= 0) return ranksInfo[RankInfoFoundedIndex];
  return ranksInfo[ranksInfo.length - 1];
};
