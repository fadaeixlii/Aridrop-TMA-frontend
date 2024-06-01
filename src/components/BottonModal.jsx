// BottomModal.js

const BottomModal = ({ showModal, setShowModal, children }) => {
  return (
    <>
      <div
        className={`fixed inset-0 flex items-start justify-center left-1/2 -translate-x-1/2 bg-[#2e2e2e] rounded-t-xl p-5 w-[99%] transform transition-transform duration-300 ease-in-out z-50 pt-16 ${
          showModal ? "translate-y-1/2" : "translate-y-full"
        }`}
      >
        <button
          className="absolute top-3 right-3 text-gray-600 text-2xl"
          onClick={() => setShowModal(false)}
        >
          &times;
        </button>
        {children}
      </div>
    </>
  );
};

export default BottomModal;
