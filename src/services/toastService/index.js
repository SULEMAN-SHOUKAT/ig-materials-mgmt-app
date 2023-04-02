import toast from "react-hot-toast";

const successToast = (message) =>
  toast.success({ text: message, type: "success" });

const errorToast = (message) => toast.error({ text: message, type: "error" });

export { successToast, errorToast };
