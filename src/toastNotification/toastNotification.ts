import { ToastPosition, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ToastOptionsTypes = {
  position: ToastPosition;
  autoClose: number;
};

const toastOptions: ToastOptionsTypes = {
  position: "top-center",
  autoClose: 3000,
};

export const toastSuccess = (message: string) =>
  toast.success(message, toastOptions);

export const toastError = (message: string) =>
  toast.error(message, toastOptions);
