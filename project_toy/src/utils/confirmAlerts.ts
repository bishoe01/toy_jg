import Swal from "sweetalert2";

export const confirm_alert = (
    btn_title : string,
    btn_text: string,
    btn_color: string,
    onConfirm: () => void) => {
  Swal.fire({
    title: btn_title,
    showCancelButton: true,
    confirmButtonColor:btn_color,
    confirmButtonText: btn_text,
  }).then((result) => {
    if (result.isConfirmed) onConfirm();
  });
};


  export const showSwal = (title: string, text: string, icon: "success" | "error") => {
    Swal.fire({
      title,
      text,
      icon,
      background: "#383838",
      color: "#FBFBFB",
    });
  };
