import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { twMerge } from "tailwind-merge";
import Button from "../common/Button.js";
type Props = {};

function WalletOption({}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div
          className={twMerge(
            "p-[2px]     rounded-full   bg-[length:400%_400%] bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 animate-border "
          )}
        >
          <Button
            onClick={() => {}}
            className={twMerge(
              "flex items-center gap-2  px-4 py-2 !w-full  bg-transparent justify-center  rounded-full mb-0  "
            )}
          >
            Connect Wallet
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default WalletOption;
