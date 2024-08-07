import * as React from "react";
import OPA from "assets/OPA.svg";
import Button from "components/common/Button";
import { Progress } from "@/components/ui/progress";
import { formatNumber } from "utils/number";
import { twMerge } from "tailwind-merge";
export interface ILeaguesReferralTaskItemProps {
  icon: string;
  title: string;
  reward: number;
  progress: number;
  score: string;
  onClaim: () => Promise<void>;
  isCompleted: boolean;
}

export function LeaguesReferralTaskItem(props: ILeaguesReferralTaskItemProps) {
  const { icon, onClaim, progress, reward, title, score, isCompleted } = props;

  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  return (
    <div
      className={twMerge(
        "flex items-center gap-4 newBox px-4 py-2 text-white w-full",
        isCompleted ? "opacity-30 cursor-not-allowed" : ""
      )}
    >
      <img src={icon} alt="" className="size-8 shrink-0" />
      <div className="flex flex-col grow w-full gap-1 ">
        <div className="flex items-center w-full justify-between">
          <div className="flex flex-col ">
            <span>{title}</span>
            <div className="flex items-center gap-1">
              <img src={OPA} alt="" className="size-3" />
              <span>{formatNumber(reward)}</span>
            </div>
          </div>
          <Button
            className="px-3 py-1.5 mb-0 min-w-16 !text-sm !bg-[#1D1D1E]"
            loading={loading}
            disabled={loading || disabled || progress < 100 || isCompleted}
            onClick={async () => {
              if (!isCompleted) {
                setLoading(true);
                await onClaim();
                setLoading(false);
                setDisabled(true);
              }
            }}
          >
            {disabled ? "Claimed" : "Claim"}
          </Button>
        </div>
        <div className="w-full flex items-center gap-2">
          <span className="shrink-0">{score}</span>
          <Progress
            value={progress >= 100 ? 100 : progress}
            className="w-full h-3"
          />
        </div>
      </div>
    </div>
  );
}
