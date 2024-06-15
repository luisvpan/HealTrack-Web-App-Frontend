import { Socket, io } from "socket.io-client";
import useErrorToast from "../../components/ErrorToast";
import useSuccessToast from "../../components/SuccessToast";
import sendImage from "../../services/messages/upload-chat-image.service";
import { useRef } from "react";

const useSubmitImage = (
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
  } | null,
  socket: Socket
) => {
  const errorToast = useErrorToast();
  const successToast = useSuccessToast();

  const onSubmitImage = async (file: any, otherId: number) => {
    try {
      await sendImage(file, otherId);
      socket.emit("send_message", {
        user,
        message: { message: "", attachment: file },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return onSubmitImage;
};

export default useSubmitImage;
