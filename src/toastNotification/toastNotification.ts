import { ToastPosition, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { throttle } from "lodash";

type ToastOptionsTypes = {
  position: ToastPosition;
  autoClose: number;
};

const toastOptions: ToastOptionsTypes = {
  position: "top-center",
  autoClose: 3000,
};

const toastSuccessWithoutThrottle = (message: string) =>
  toast.success(message, toastOptions);

const toastErrorWithoutThrottle = (message: string) =>
  toast.error(message, toastOptions);
export const toastSuccess = throttle(toastSuccessWithoutThrottle, 500, {
  trailing: false,
});
export const toastError = throttle(toastErrorWithoutThrottle, 500, {
  trailing: false,
});
