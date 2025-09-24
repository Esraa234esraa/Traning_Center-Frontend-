import React from "react";
import { toast } from "react-toastify";
import { useDeleteWaitingStudent } from "../../../../Hooks/Students/NewStudents/useMutationNewStudent";

export default function ConfirmDeletePopup({
  isOpen,
  onClose,
  studentId,
  studentName = "",
}) {
  const deleteStudentMutation = useDeleteWaitingStudent();

  if (!isOpen) return null;

  const handleDelete = () => {
    deleteStudentMutation.mutate(studentId, {
      onSuccess: (res) => {
        if (!res?.data?.success) {
          toast.error(res?.message || "حدث خطأ أثناء حذف الطالب", {
            toastId: `${res?.data?.message}-${Date.now()}`,
          });
          return; 
        }

        toast.success(res?.message || "تم حذف الطالب بنجاح");
        onClose();
      },
      onError: (error) => {
        const errorMsg =
          error?.response?.data?.message || "حدث خطأ أثناء حذف الطالب";
        toast.error(errorMsg, {
          toastId: `${errorMsg}-${Date.now()}`,
        });
      },
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h3 className="text-lg font-semibold mb-4">تأكيد الحذف</h3>
        <p>هل أنت متأكد من حذف {studentName || "هذا الطالب"}؟</p>
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            إلغاء
          </button>
          <button
            onClick={handleDelete}
            disabled={deleteStudentMutation.isLoading}
            className={`px-4 py-2 rounded-lg text-white ${
              deleteStudentMutation.isLoading
                ? "bg-red-300 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {deleteStudentMutation.isLoading ? "جارٍ الحذف..." : "حذف"}
          </button>
        </div>
      </div>
    </div>
  );
}
