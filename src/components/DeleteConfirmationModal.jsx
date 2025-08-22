// src/components/DeleteConfirmationModal.jsx
"use client";

import { useEffect, useRef } from "react";

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
}) {
  const modalRef = useRef(null);

  useEffect(() => {
    // This effect runs only when the modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";

      const handleOutsideClick = (event) => {
        // If the click is outside the modal content, close it
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          onClose();
        }
      };

      // Add the event listener to the document
      document.addEventListener("mousedown", handleOutsideClick);

      // Cleanup function to remove the event listener
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
        document.body.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-0 backdrop-blur-sm transition-all duration-300 ease-in-out"
      style={{ opacity: isOpen ? 1 : 0 }}
    >
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-lg shadow-xl w-96 opacity-0 scale-95 transform transition-all duration-300 ease-out"
        style={{
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "scale(1)" : "scale(0.95)",
        }}
      >
        <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete this product? This action cannot be
          undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-800 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-150"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition duration-150"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
