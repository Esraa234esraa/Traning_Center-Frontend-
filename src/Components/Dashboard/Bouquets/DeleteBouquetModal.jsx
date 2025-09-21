import React from "react";
import { useDeleteBouquet } from "../../../Hooks/Bouquets/useMutationBouquet";
// import { toast } from "react-hot-toast";
export default function DeleteBouquetModal({ bouquetId, bouquetName, onClose }) {
  const { mutate: deleteBouquet } = useDeleteBouquet();

  const handleDelete = () => {
    deleteBouquet(bouquetId, {
      onSuccess: (res) => {
        alert(res.message);
        onClose();
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">⚠️ تأكيد الحذف</h2>
        <p className="mb-4">هل أنت متأكد أنك تريد حذف الباقة <b>{bouquetName}</b>؟</p>
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={onClose}
          >
            إلغاء
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={handleDelete}
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
}
