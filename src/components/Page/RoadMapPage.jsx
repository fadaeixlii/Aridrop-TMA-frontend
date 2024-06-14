import Back from "../common/Back";
import RoadMapItem from "../common/RoadMapItem";

export default function RoadMapPage({ back }) {
  return (
    <div className="flex flex-col gap-3 w-full py-8">
      <Back back={back} />

      <div className="text-white text-lg flex justify-between items-center">
        <span>Road Map Page</span>
      </div>
      <RoadMapItem />
    </div>
  );
}
