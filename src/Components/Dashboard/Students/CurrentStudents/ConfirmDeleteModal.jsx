import React from "react";

export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm, student }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-96">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          هل أنت متأكد من حذف الطالب{" "}
          <span className="text-red-600">{student?.name}</span>؟
        </h2>
        <div className="flex justify-between gap-4">
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded-lg w-1/2"
          >
            نعم، احذف
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg w-1/2"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}
