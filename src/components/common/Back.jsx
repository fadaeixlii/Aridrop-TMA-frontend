import { PiArrowLeftLight } from "react-icons/pi";

export default function Back({ back }) {
  return (
    <div onClick={back} className="fixed top-3 left-3 cursor-pointer">
      <PiArrowLeftLight className="size-6 text-white" />
    </div>
  );
}
