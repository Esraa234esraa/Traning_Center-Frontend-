import React from "react";

export default function ConfirmDeletePopup({ isOpen, onClose, onConfirm, studentName }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 relative text-center">
        <h2 className="text-lg font-cairo mb-4 text-text_color">
          حذف الطالب
        </h2>
        <p className="mb-6">هل أنت متأكد من حذف الطالب <strong>{studentName}</strong>؟</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            حذف
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}
