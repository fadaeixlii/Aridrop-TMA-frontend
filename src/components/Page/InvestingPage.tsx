import Button from "../common/Button";
import { twMerge } from "tailwind-merge";
import Back from "../common/Back";
import ConnectWallet from "components/investing/ConnectWallet";
import { useAccount } from "wagmi";

interface Props {
  back: () => void;
}

const InvestingPage: React.FC<Props> = ({ back }) => {
  const { isConnected } = useAccount();

  return (
    <div className="flex flex-col gap-3 w-full text-white py-8">
      <Back back={back} />

      <div className="flex items-center justify-between w-full">
        <p className="">InvestingPage</p>
        <ConnectWallet />
      </div>
      {isConnected ? (
        <>
          <p className="textPrimary text-xl">Cryptocurrency</p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim
            fugiat porro facilis. Perspiciatis blanditiis nemo explicabo fugit,
            facere quasi repellat similique fuga, sint veniam rem assumenda
            incidunt deserunt vitae dolores?
          </p>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default InvestingPage;
