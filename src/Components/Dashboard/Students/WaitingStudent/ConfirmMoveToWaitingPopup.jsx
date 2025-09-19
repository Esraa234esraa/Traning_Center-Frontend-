
// ConfirmMoveToWaitingPopup.jsx
import React from "react";

export default function ConfirmMoveToWaitingPopup({ isOpen, onClose, onConfirm, studentName = "" }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
        <h3 className="text-lg font-semibold mb-4">تأكيد النقل</h3>
        <p>هل تريد نقل {studentName || "هذا الطالب"} إلى قائمة الانتظار؟</p>
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg"
          >
            إلغاء
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            نقل
          </button>
        </div>
      </div>
    </div>
  );
}
