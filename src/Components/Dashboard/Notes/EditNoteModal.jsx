import React, { useState, useEffect, useMemo } from "react";
import { useUpdateNote } from "../../../Hooks/Notes/useMutationNote";
import { useGetNoteById } from "../../../Hooks/Notes/useQueryNote";
import { useGetAllStudentsForNote } from "../../../Hooks/Notes/useQueryNote";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

export default function EditNoteModal({ isOpen, onClose, noteId, refetch }) {
  const { data: noteData, isLoading: isNoteLoading } = useGetNoteById(noteId);
  const { data: studentsData } = useGetAllStudentsForNote({ enabled: isOpen });
  const updateMutation = useUpdateNote();

  const [form, setForm] = useState({
    studentId: "",
    description: "",
  });

  // 🧠 نحفظ الطلاب في useMemo
  const studentOptions = useMemo(() => {
    if (!studentsData?.data?.data) return [];
    return studentsData.data.data.map((student) => ({
      id: student.id,
      name: student.studentName,
    }));
  }, [studentsData]);

  // 🧩 تحميل بيانات الملاحظة في الفورم أول ما توصل
  useEffect(() => {
    if (noteData?.data?.data && studentsData?.data?.data) {
      const n = noteData.data.data;
      const students = studentsData.data.data;

      // 🔍 نجيب الطالب اللي اسمه زي اللي في الملاحظة
      const matchedStudent = students.find(
        (s) => s.studentName === n.studentName
      );

      setForm({
        studentId: matchedStudent ? matchedStudent.id : "",
        description: n.description || "",
      });

    }
  }, [noteData, studentsData]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.description.trim()) {
      toast.error("الرجاء إدخال محتوى الملاحظة");
      return;
    }


    updateMutation.mutate(
      { id: noteId, formData: form },


      {
        onSuccess: (res) => {
          toast.success(res?.data?.message || "تم تعديل الملاحظة بنجاح");
          refetch();
          onClose();
        },
        onError: (error) => {
          console.error(error);
          toast.error(
            error?.response?.data?.message ||
            "حدث خطأ أثناء تعديل الملاحظة"
          );
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-[450px] animate-fadeIn">
        <h2 className="text-xl font-semibold mb-5 text-center border-b pb-2 text-gray-700">
          تعديل الملاحظة
        </h2>

        {isNoteLoading ? (
          <div className="flex justify-center items-center py-10">
            <FaSpinner className="animate-spin text-background text-2xl" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 🔽 اختيار الطالب */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                اسم الطالب
              </label>
              <select
                value={form.studentId}
                onChange={(e) =>
                  setForm({ ...form, studentId: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">اختر الطالب...</option>
                {studentOptions.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name}
                  </option>
                ))}
              </select>
            </div>

            {/* ✏️ محتوى الملاحظة */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                محتوى الملاحظة
              </label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={4}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="أدخل نص الملاحظة هنا..."
              />
            </div>

            {/* 🧭 أزرار التحكم */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
              >
                إلغاء
              </button>

              <button
                type="submit"
                disabled={updateMutation.isLoading}
                className="px-5 py-2 flex items-center justify-center gap-2 rounded-lg bg-background text-white hover:bg-background_hover transition disabled:opacity-70"
              >
                {updateMutation.isLoading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    <span>جارٍ الحفظ...</span>
                  </>
                ) : (
                  "حفظ"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
