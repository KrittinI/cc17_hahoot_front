import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function ModalSecond({ width, title, children, openModal, onClose }) {
  useEffect(() => {
    const handleEscPress = (e) => {
      if (e.keyCode === 27) {
        onClose?.();
      }
    };
    document.addEventListener("keydown", handleEscPress);
    return () => document.removeEventListener("keydown", handleEscPress);
  }, [onClose]);

  return (
    <>
      {openModal
        ? createPortal(
            <>
              <div className="fixed inset-0 bg-white opacity-40 z-30"></div>
              <div className="fixed inset-0 z-40" onMouseDown={onClose}>
                <div className="flex justify-center items-center min-h-screen">
                  <div
                    className="bg-white rounded-lg shadow-lg"
                    style={{ width: `${width}rem` }}
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    <div className="flex justify-between items-center px-4 py-3">
                      <button className="invisible">&#10005;</button>
                      <h5 className="text-2xl font-semibold">{title}</h5>
                      <button className="text-red ab" onClick={onClose}>
                        &#10005;
                      </button>
                    </div>
                    <div className="p-2">{children}</div>
                  </div>
                </div>
              </div>
            </>,
            document.getElementById("modalSecond")
          )
        : null}
    </>
  );

}