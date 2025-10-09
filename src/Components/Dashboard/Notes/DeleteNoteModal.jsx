import React from "react";
import { useDeleteNote } from "../../../Hooks/Notes/useMutationNote";
import { toast } from "react-toastify";

export default function DeleteNoteModal({ isOpen, onClose, note, refetch }) {
  const deleteMutation = useDeleteNote();

  if (!isOpen) return null;

  const handleDelete = () => {
    deleteMutation.mutate(note.id, {
      onSuccess: () => {
        toast.success("تم حذف الملاحظة بنجاح ");
        refetch();
        onClose();
      },
      onError: () => toast.error("حدث خطأ أثناء الحذف "),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow w-[400px] text-center">
        <h2 className="text-lg font-semibold mb-3 text-gray-700">
          هل أنت متأكد من حذف هذه الملاحظة؟
        </h2>
        <p className="text-gray-500 mb-5">{note?.title}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            إلغاء
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
}
