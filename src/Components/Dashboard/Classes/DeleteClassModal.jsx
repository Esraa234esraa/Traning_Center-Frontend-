import React from "react";
import { useDeleteClass } from "../../../Hooks/Classes/useMutationClasses";

export default function DeleteClassModal({ cls, onClose }) {
  const { mutate, isLoading } = useDeleteClass();

  const handleDelete = () => {
    mutate(cls.id, { onSuccess: () => onClose() });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-lg w-96 text-center">
        <h2 className="text-lg font-bold mb-4">⚠️ تأكيد الحذف</h2>
        <p>هل أنت متأكد من حذف الحصة <b>{cls.bouquetName}</b>؟</p>
        <div className="flex justify-center gap-3 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-3 py-1 rounded"
          >
            إلغاء
          </button>
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            {isLoading ? "جارٍ الحذف..." : "حذف"}
          </button>
        </div>
      </div>
    </div>
  );
}
