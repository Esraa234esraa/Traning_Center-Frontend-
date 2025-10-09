import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNote } from "../../../Hooks/Notes/useMutationNote";
import { useGetAllCurrentStudents } from "../../../Hooks/Students/CurrentStudent/useQueryCurrentStudent";
import { toast } from "react-toastify";
import Loading from "../../Loading";

export default function AddNote() {
  const navigate = useNavigate();
  const addMutation = useAddNote();
  const { data: studentsData, isLoading } = useGetAllCurrentStudents();

  const students = useMemo(() => studentsData?.data?.data?.result || [], [studentsData]);
  
  const [form, setForm] = useState({
    studentId: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.studentId || !form.description.trim()) {
      toast.error("يرجى إدخال جميع الحقول");
      return;
    }
    console.log(form.studentId);
    

    addMutation.mutate(form, {
      onSuccess: () => {
        toast.success("تمت إضافة الملاحظة بنجاح ");
        navigate(-1);
      },
      onError: () => toast.error("حدث خطأ أثناء الإضافة "),
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-8 max-w-lg mx-auto bg-white rounded shadow mt-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">إضافة ملاحظة جديدة</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Select Student */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            الطالب
          </label>
          <select
            name="studentId"
            value={form.studentId}
            onChange={(e) => setForm({ ...form, studentId: e.target.value })}
            className="w-full border rounded p-2 bg-white"
            required
          >
            <option value="">اختر الطالب</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.studentName}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            الملاحظة
          </label>
          <textarea
            name="description"
            placeholder="اكتب الملاحظة هنا..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border rounded p-2"
            rows={5}
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded hover:bg-text_color transition"
            disabled={addMutation.isPending}
          >
            {addMutation.isPending ? "جارٍ الحفظ..." : "حفظ"}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
          >
            إلغاء
          </button>
        </div>
      </form>
    </div>
  );
}
