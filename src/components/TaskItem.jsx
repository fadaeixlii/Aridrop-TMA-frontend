import pencilImage from "../assets/Pencil.png";
export default function TaskItem() {
  return (
    <div className="rounded-2xl w-full bg-[#333333] border border-[#3D3D3D]  flex  items-center justify-between p-4 gap-2 text-white text-lg">
      <div className="flex items-center gap-2">
        <span className="bg-[#3D3D3D] p-2 rounded-lg flex items-center justify-center">
          <img src={pencilImage} alt="" className="size-14" />
        </span>
        TaskName
      </div>
      <span className="text-[#AFEF28]">560k OPAL</span>
    </div>
  );
}
