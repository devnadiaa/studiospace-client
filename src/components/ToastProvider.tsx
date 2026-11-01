"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastProvider = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={3000}
      newestOnTop
      closeOnClick
      pauseOnHover
      theme="light"
    />
  );
};

export default ToastProvider;