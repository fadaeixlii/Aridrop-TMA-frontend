import { twMerge } from "tailwind-merge";

export default function BounceLoading({ className }) {
  return (
    <div
      className={twMerge(
        "flex space-x-2 justify-center items-center  py-1",
        className
      )}
    >
      <div className="size-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="size-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="size-2 bg-white rounded-full animate-bounce"></div>
    </div>
  );
}
