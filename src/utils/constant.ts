import Rank1 from "assets/Rank/Rank1.png";
import Rank2 from "assets/Rank/Rank2.png";
import Rank3 from "assets/Rank/Rank3.png";
import Rank4 from "assets/Rank/Rank4.png";
import Rank5 from "assets/Rank/Rank5.png";
import Rank6 from "assets/Rank/Rank6.png";
import Rank7 from "assets/Rank/Rank7.png";
import Rank8 from "assets/Rank/Rank8.png";
import Rank9 from "assets/Rank/Rank9.png";
import Rank10 from "assets/Rank/Rank10.png";
import toast from "react-hot-toast";

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
    key: "Rank 1",
    icon: Rank1,
    score: 100,
  },
  {
    key: "Rank 2",
    icon: Rank2,
    score: 500,
  },
  {
    key: "Rank 3",
    icon: Rank3,
    score: 1000,
  },
  {
    key: "Rank 4",
    icon: Rank4,
    score: 2000,
  },
  {
    key: "Rank 5",
    icon: Rank5,
    score: 5000,
  },
  {
    key: "Rank 6",
    icon: Rank6,
    score: 10000,
  },
  {
    key: "Rank 7",
    icon: Rank7,
    score: 15000,
  },
  {
    key: "Rank 8",
    icon: Rank8,
    score: 30000,
  },
  {
    key: "Rank 9",
    icon: Rank9,
    score: 70000,
  },
  {
    key: "Rank 10",
    icon: Rank10,
    score: 100000,
  },
];

export const getUserRankInfo = (userScore: number): UserRankInfo => {
  const Index = ranksInfo.findIndex((rank) => rank.score >= userScore);
  if (Index < 0)
    return {
      key: "Rank 10",
      icon: Rank10,
      score: 100000,
      nextRank: Infinity,
    };
  return {
    ...ranksInfo[Index],
    nextRank:
      Index + 1 < ranksInfo.length ? ranksInfo[Index + 1].score : Infinity,
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
