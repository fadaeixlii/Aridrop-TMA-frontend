import Lottie from "lottie-react";

import ScreenLoading from "./../../assets/FullScreenLoading.json";

export default function FullScreenLoading() {
  return (
    <div className="h-[100vh] w-[101vw] overflow-hidden flex items-center justify-center bg-[#1D1D1E]">
      <Lottie animationData={ScreenLoading} className="w-4/5 h-full" />
    </div>
  );
}
