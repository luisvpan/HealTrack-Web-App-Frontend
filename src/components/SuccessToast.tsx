import { toast } from "react-toastify";

const useSuccessToast = () => {
  const successToast = (message: string) => {
    console.log("entro");
    console.log(message);
    toast.success(message, {
      position: "bottom-center",
    });
  };

  return successToast;
};

export default useSuccessToast;
