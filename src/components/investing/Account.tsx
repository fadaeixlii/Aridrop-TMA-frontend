import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";
import { maskWalletAddress } from "./../../utils/mask";
import Button from "components/common/Button";

export function Account() {
  const { address, connector } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  return (
    <div className="flex items-center gap-3">
      {connector?.icon ? <img src={connector.icon} className="size-5" /> : null}
      {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
      {address && (
        <div>
          {ensName
            ? `${ensName} (${maskWalletAddress(address)})`
            : maskWalletAddress(address)}
        </div>
      )}

      <Button color="red" onClick={() => disconnect()}>
        Disconnect
      </Button>
    </div>
  );
}
