import { toast } from "react-toastify";

const useSuccessToast = () => {
  const successToast = (message: string) => {
    toast.success(message, {
      position: "top-center",
    });
  };

  return successToast;
};

export default useSuccessToast;
