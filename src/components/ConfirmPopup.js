import { useEffect } from "react";
import Button from "./Button";

const ConfirmPopup = ({ isOpen, message, onConfirm, onCancel }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <p className="mb-4 text-gray-700">{message}</p>
        <div className="flex justify-end space-x-4">
          <Button onClick={onCancel} className="bg-gray-300 hover:bg-gray-400">
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup;
