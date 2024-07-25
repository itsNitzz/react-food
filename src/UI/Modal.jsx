import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open, onClose, customClass = "" }) {
  const dialogRef = useRef();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open) {
      dialog.showModal();
    }

    return () => {
      dialog.close();
    };
  }, [open]);

  return createPortal(
    <dialog
      onClose={onClose}
      ref={dialogRef}
      className={`modal ${customClass}`}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
