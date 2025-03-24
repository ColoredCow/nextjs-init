"use client";

import { Toaster, toast } from "react-hot-toast";

export const showToast = (message, type = "success") => {
  if (type === "success") {
    toast.success(message);
  } else if (type === "error") {
    toast.error(message);
  } else {
    toast(message);
  }
};

const ToastProvider = () => {
  return <Toaster position="top-right" reverseOrder={false} />;
};

export default ToastProvider;
