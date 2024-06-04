import RoadMapItem from "../common/RoadMapItem";

export default function RoadMapPage() {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="text-white text-lg flex justify-between items-center">
        <span>Road Map Page</span>
      </div>
      <RoadMapItem />
    </div>
  );
}
