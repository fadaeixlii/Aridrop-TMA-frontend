import { useState, useRef, useEffect } from "react";
import Button from "./Button";
import api from "../../utils/axiosConfig";
import { useUserId, useUserInfo } from "../../Store/TelegramStore";
import { twMerge } from "tailwind-merge";
import { useTaskStore } from "../../Store/TaskStore";
import { notifyError, notifySuccess } from "../../utils/constant";
import WebApp from "@twa-dev/sdk";

export default function TaskItem({ task }) {
  const { userId } = useUserId();
  const { fetchData: fetchTasks } = useTaskStore();
  const { fetchData } = useUserInfo();

  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState("0px");
  const [loading, setLoading] = useState(
    Array(task.miniTasks.length).fill(false)
  );
  const [completed, setCompleted] = useState(
    Array(task.miniTasks.length).fill("false")
  );
  const [claimLoading, setClaimLoading] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(open ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [open]);

  const handleMiniTaskClick = (index, link, type) => {
    setLoading((prevLoading) => {
      const newLoading = [...prevLoading];
      newLoading[index] = true;
      return newLoading;
    });

    setTimeout(() => {
      console.log(link);
      if (WebApp) {
        const tg = WebApp;
        tg.ready();

        tg.openTelegramLink(link);
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
    }, 5000);
  };

  const handleCheck = async (index) => {
    setLoading((prevLoading) => {
      const newLoading = [...prevLoading];
      newLoading[index] = true;
      return newLoading;
    });

    try {
      const response = await api.post("/verify-task", {
        userId: userId.userId,
        taskId: task.id,
        miniTaskIndex: index,
      });
      console.log(response);

      setCompleted((prevCompleted) => {
        const newCompleted = [...prevCompleted];
        newCompleted[index] = "true";
        return newCompleted;
      });
      notifySuccess("Task completed 🎁");
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

  const allCompleted = completed.every((status) => status);

  const handleClickClaim = async (e) => {
    e.stopPropagation();

    setClaimLoading(true);
    try {
      const response = await api.post(
        `/tasks/complete/${userId.userId}/${task.id}`
      );
      console.log(response);
      notifySuccess("Task completed 🎁");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      fetchTasks(userId.userId);
      fetchData(userId.userId);
    }
  };

  return (
    <div
      className={twMerge(
        "rounded-2xl w-full bg-[#333333] border border-[#3D3D3D] p-3 text-white text-lg h-auto flex flex-col cursor-pointer",
        task.isCompleted ? "opacity-30 cursor-not-allowed" : ""
      )}
      onClick={() => {
        if (!task.isCompleted) setOpen(!open);
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="bg-[#3D3D3D] p-2 rounded-lg flex items-center justify-center">
            <img src={task.image} alt="" className="size-12" />
          </span>
          <span className="text-md">{task.title}</span>
        </div>
        <span className="text-[#AFEF28] text-xs">+{task.reward} OPL</span>
      </div>
      <div
        ref={contentRef}
        style={{ height: contentHeight }}
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
                    handleMiniTaskClick(index, miniTask.link, miniTask.type);
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
