import { toast } from "react-toastify";

const useSuccessToast = () => {
  const successToast = (message: string) => {
    toast.success(message, {
      position: "bottom-center",
    });
  };

  return successToast;
};

export default useSuccessToast;
