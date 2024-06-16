import earthImage from "../assets/Earth.png";
import hornImage from "../assets/Horn.png";

interface ReferralAndClubProps {
  setActiveTab: (tab: string) => void;
}

const ReferralAndClub: React.FC<ReferralAndClubProps> = ({ setActiveTab }) => {
  return (
    <div className="flex items-center gap-4">
      <div
        className="rounded-2xl bg-[#2E2E2E] border border-[#3D3D3D] w-1/2 aspect-square flex flex-col items-center justify-between p-4 gap-2 text-white text-lg cursor-pointer"
        onClick={() => {
          setActiveTab("Referral");
        }}
      >
        <span className="bg-[#363636] p-2 rounded-full flex items-center justify-center">
          <img src={hornImage} alt="" className="w-20 h-20" />
        </span>
        Referral
      </div>
      <div
        className="rounded-2xl grayscale cursor-not-allowed bg-[#2E2E2E]/50 border border-[#3D3D3D]/50 w-1/2 aspect-square flex flex-col items-center justify-between p-4 gap-2 text-white text-lg"
        onClick={() => {
          // setActiveTab("Club");
        }}
      >
        <span className="bg-[#363636] p-2 rounded-full flex items-center justify-center">
          <img src={earthImage} alt="" className="w-20 h-20" />
        </span>
        Club
      </div>
    </div>
  );
};

export default ReferralAndClub;
