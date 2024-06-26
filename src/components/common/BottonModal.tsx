import React from "react";

interface BottomModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  children: React.ReactNode;
}

const BottomModal: React.FC<BottomModalProps> = ({
  showModal,
  setShowModal,
  children,
}) => {
  return (
    <div
      className={`fixed inset-0 flex items-start justify-center left-1/2 -translate-x-1/2 bg-[#171717] rounded-t-xl p-5 w-[99%] transform transition-transform duration-300 ease-in-out z-50 pt-4 ${
        showModal ? "translate-y-1/3" : "translate-y-full"
      }`}
    >
      <button
        className="absolute top-3 right-3 text-gray-600 text-2xl"
        onClick={() => setShowModal(false)}
      >
        &times;
      </button>
      <div className="w-full h-2/3 pb-24">{children}</div>
    </div>
  );
};

export default BottomModal;
