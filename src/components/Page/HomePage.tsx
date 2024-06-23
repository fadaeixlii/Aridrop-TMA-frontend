import ClaimBox from "../ClaimBox";

interface Props {
  setActiveTab: (tab: string) => void;
}

const HomePage: React.FC<Props> = ({ setActiveTab }) => {
  return (
    <div className="flex flex-col gap-5 w-full h-screen max-h-screen o">
      <ClaimBox setActiveTab={setActiveTab} />
    </div>
  );
};

export default HomePage;
