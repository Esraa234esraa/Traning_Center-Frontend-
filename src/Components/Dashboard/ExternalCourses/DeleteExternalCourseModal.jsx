import React from "react";
import { useDeleteExternalCourse } from "../../../Hooks/ExternalCourses/useMutationExternalCourse";
import { toast } from "react-toastify";

export default function DeleteExternalCourseModal({ isOpen, onClose, course, refetch }) {
  const deleteMutation = useDeleteExternalCourse();

  const handleDelete = () => {
    if (!course?.id) return; // تأكد إن فيه ID
    deleteMutation.mutate(course.id, {
      onSuccess: () => {
        if (refetch) refetch(); // لو عايز تعيد تحميل البيانات
        onClose();
      },
      onError: () => toast.error("حدث خطأ أثناء الحذف"),
    });
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-80 text-center">
        <h2 className="text-lg font-bold mb-4">حذف الدورة</h2>
        <p className="mb-4">
          هل أنت متأكد من حذف الدورة{" "}
          <span className="font-semibold">{course?.name}</span>؟
        </p>
        <div className="flex justify-center gap-2">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            حذف
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}
