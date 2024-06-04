import toast from "react-hot-toast";

const notify = () =>
    toast.success("Copied Successfully", {
        style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
        },
    });
export const copyHelper = (value) => {
    navigator.clipboard.writeText(value);
    notify();
};