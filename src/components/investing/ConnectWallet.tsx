import WalletOption from "./WalletOption";
import { useAccount } from "wagmi";
import { Account } from "./Account";

function ConnectWallet() {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return <WalletOption />;
}

export default ConnectWallet;
