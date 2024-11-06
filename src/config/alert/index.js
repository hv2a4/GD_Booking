import React, { useEffect } from "react";
import Swal from "sweetalert2";

const Alert = ({ type, title }) => {
  useEffect(() => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }, 
    });

    Toast.fire({
      icon: type,
      title: title,
    });
  }, [type, title]);

  return null;
};

export default Alert;
