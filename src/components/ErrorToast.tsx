import { toast } from "react-toastify";

const useErrorToast = () => {
  const errorToast = (message: string) => {
    toast.error(message, {
      position: "bottom-center",
    });
  };

  return errorToast;
};

export default useErrorToast;
