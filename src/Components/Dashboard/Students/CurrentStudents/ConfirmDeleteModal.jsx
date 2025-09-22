import React from "react";

export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm, studentName }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">تأكيد الحذف</h2>
        <p className="mb-6">هل أنت متأكد أنك تريد حذف الطالب <span className="font-semibold">{studentName}</span>؟</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            إلغاء
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
}
