import React from "react";

export default function ConfirmDeletePopup({ isOpen, studentName, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 relative">
        <h2 className="text-lg font-cairo mb-4 text-text_color">تأكيد الحذف</h2>
        <p className="mb-6">هل أنت متأكد من حذف الطالب <strong>{studentName}</strong>؟</p>
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg">
            إلغاء
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded-lg">
            حذف
          </button>
        </div>
      </div>
    </div>
  );
}
