import Button from "../common/Button";
import { twMerge } from "tailwind-merge";
import Back from "../common/Back";

interface Props {
  back: () => void;
}

const InvestingPage: React.FC<Props> = ({ back }) => {
  return (
    <div className="flex flex-col gap-3 w-full text-white py-8">
      <Back back={back} />

      <div className="flex items-center justify-between w-full">
        <p className="">InvestingPage</p>
        <div
          className={twMerge(
            "p-[2px] rounded-full bg-[length:400%_400%] bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 animate-border"
          )}
        >
          <Button
            onClick={() => {
              // Logic for Connect Wallet button click
            }}
            className={twMerge(
              "flex items-center gap-2 px-4 py-2 !w-full bg-transparent justify-center rounded-full mb-0"
            )}
          >
            Connect Wallet
          </Button>
        </div>
      </div>
      <p className="textPrimary text-xl">Cryptocurrency</p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim fugiat
        porro facilis. Perspiciatis blanditiis nemo explicabo fugit, facere
        quasi repellat similique fuga, sint veniam rem assumenda incidunt
        deserunt vitae dolores?
      </p>
    </div>
  );
};

export default InvestingPage;
