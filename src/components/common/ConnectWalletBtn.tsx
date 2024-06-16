import Button from "./Button";
import { twMerge } from "tailwind-merge";

export default function ConnectWalletBtn() {
  return (
    <Button
      onClick={() => {}}
      className={twMerge(
        "flex items-center gap-2  px-4 py-2 !w-full  bg-transparent justify-center  rounded-full mb-0  "
      )}
    >
      Connect Wallet
    </Button>
  );
}
