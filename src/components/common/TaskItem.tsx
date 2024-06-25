import { useState, useRef, MouseEvent } from "react";
import Button from "./Button";
import { twMerge } from "tailwind-merge";
import { Task, useTaskStore } from "../../Store/TaskStore";
import { useUserId, useUserInfo } from "../../Store/TelegramStore";
import api from "utils/axiosConfig";
import { notifyError, notifySuccess } from "utils/constant";
import OPA from "assets/OPA.svg";
import { formatNumber } from "utils/number";
import { initUtils } from "@tma.js/sdk";

interface TaskItemProps {
  task: Task;
}

const utils = initUtils();

export default function TaskItem({ task }: TaskItemProps) {
  const { userId } = useUserId();
  const { fetchData: fetchTasks } = useTaskStore();
  const { fetchData } = useUserInfo();

  const contentRef = useRef<HTMLDivElement>(null);
  // const [contentHeight, setContentHeight] = useState("0px");
  const [loading, setLoading] = useState<boolean[]>(
    Array(task.miniTasks.length).fill(false)
  );
  const [completed, setCompleted] = useState<string[]>(
    Array(task.miniTasks.length).fill("false")
  );
  const [claimLoading, setClaimLoading] = useState(false);

  // useEffect(() => {
  //   if (contentRef.current) {
  //     setContentHeight(open ? `${contentRef.current.scrollHeight}px` : "0px");
  //   }
  // }, [open]);

  const handleMiniTaskClick = (index: number, link: string, type: string) => {
    setLoading((prevLoading) => {
      const newLoading = [...prevLoading];
      newLoading[index] = true;
      return newLoading;
    });

    if (link) {
      if (type === "telegram") utils.openTelegramLink(link);
      else utils.openLink(link);
    }

    setLoading((prevLoading) => {
      const newLoading = [...prevLoading];
      newLoading[index] = false;
      return newLoading;
    });

    setCompleted((prevCompleted) => {
      const newCompleted = [...prevCompleted];
      newCompleted[index] =
        task.miniTasks[index].type === "telegram" ? "check" : "true";
      return newCompleted;
    });
  };

  const handleCheck = async (index: number) => {
    setLoading((prevLoading) => {
      const newLoading = [...prevLoading];
      newLoading[index] = true;
      return newLoading;
    });

    try {
      const response = await api.post("/verify-task", {
        userId: userId?.userId,
        taskId: task.id,
        miniTaskIndex: index,
      });
      console.log(response);
      if (response.data.success) {
        setCompleted((prevCompleted) => {
          const newCompleted = [...prevCompleted];
          newCompleted[index] = "true";
          return newCompleted;
        });
        notifySuccess("Task completed 🎁");
      }
    } catch (error) {
      notifyError("Error (probably not joined yet)");
      console.log(error);
    } finally {
      setLoading((prevLoading) => {
        const newLoading = [...prevLoading];
        newLoading[index] = false;
        return newLoading;
      });
    }
  };

  const allCompleted = completed.every((status) => status === "true");

  const handleClickClaim = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setClaimLoading(true);
    try {
      const response = await api.post(
        `/tasks/complete/${userId?.userId}/${task.id}`
      );
      console.log(response);
      notifySuccess("Task completed 🎁");
    } catch (error) {
      console.log(error);
    } finally {
      setClaimLoading(false);
      fetchTasks(userId?.userId ?? "");
      fetchData(userId?.userId ?? "");
    }
  };

  return (
    <div
      className={twMerge(
        "w-full newBox border border-[#3D3D3D] p-3 text-white text-lg h-auto flex flex-col cursor-pointer",
        task.isCompleted ? "opacity-30 cursor-not-allowed" : ""
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className=" p-2 rounded-lg flex items-center justify-center">
            <img src={task.image} alt="" className="size-12" />
          </span>
          <span className="text-md">{task.title}</span>
        </div>
        <div className="flex items-center gap-1">
          <img src={OPA} alt="" className="size-3" />
          <span>{formatNumber(task.reward)}</span>
        </div>
      </div>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
      >
        <div className="pt-6 flex flex-col gap-4">
          {task.miniTasks.map((miniTask, index) => (
            <div
              className="flex items-center justify-between gap-2 w-full"
              key={index}
            >
              <span className="text-sm">{miniTask.title}</span>
              <Button
                className="px-3 py-1.5 mb-0 min-w-16 !text-sm !bg-[#1D1D1E]"
                onClick={(e) => {
                  e.stopPropagation();
                  if (completed[index] === "false")
                    handleMiniTaskClick(
                      index,
                      miniTask.link ?? "",
                      miniTask.type ?? ""
                    );
                  else if (completed[index] === "check") {
                    handleCheck(index);
                  }
                }}
                disabled={completed[index] === "true"}
                loading={loading[index]}
              >
                {completed[index] === "check"
                  ? "check"
                  : completed[index] === "true"
                  ? "Done"
                  : "Go"}
              </Button>
            </div>
          ))}
          <Button
            className="px-3 py-1.5 mt-4 !text-sm !bg-[#1D1D1E]"
            disabled={claimLoading || !allCompleted}
            onClick={handleClickClaim}
            loading={claimLoading}
          >
            Claim
          </Button>
        </div>
      </div>
    </div>
  );
}
