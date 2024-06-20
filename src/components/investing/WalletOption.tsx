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
import { useConnect } from "wagmi";
type Props = {};

function WalletOption({}: Props) {
  const { connectors, connect } = useConnect();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          onClick={() => {}}
          className={twMerge(
            "flex items-center gap-2  px-4 py-2 !w-full  bg-transparent justify-center  rounded-full mb-0 !z-10 "
          )}
        >
          Connect Wallet
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {connectors.map((connector) => (
          <DropdownMenuItem
            key={connector.uid}
            onClick={() => {
              connect({ connector });
              console.log(connector);
            }}
            className="flex items-center gap-2"
          >
            {connector?.icon ? (
              <img src={connector.icon} className="size-5" />
            ) : null}
            {connector.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default WalletOption;
