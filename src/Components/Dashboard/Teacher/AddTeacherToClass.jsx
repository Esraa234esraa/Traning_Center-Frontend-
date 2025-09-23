import React, { useState } from "react";
import { useGetAllTeachers } from "../../../Hooks/Teacher/useQueryTeacher";
import { useGetAllClassesEmptyFromTeacher } from "../../../Hooks/Classes/useQueryClasses";
import { useAddClassToTeacher } from "../../../Hooks/Teacher/useMutationTeacher";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddTeacherToClass() {
  const { data: teachers } = useGetAllTeachers();
  const { data: classes } = useGetAllClassesEmptyFromTeacher();
  const addClassMutation = useAddClassToTeacher();


  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

//   // 🔹 نفلتر الحصص حسب المعلم المختار وكورس المعلم
//   const filteredClasses = useMemo(() => {
//     if (!selectedTeacher || !classes) return [];
//     const teacher = teachers.find((t) => t.id === selectedTeacher);
//     if (!teacher) return [];

//     return classes.filter((c) => c.teacherId === null && c.bouquetName === teacher.courseName);
//   }, [selectedTeacher, classes, teachers]);

const navigate=useNavigate();
 const handleSubmit = () => {
  if (!selectedTeacher || !selectedClass) {
    toast.error("اختر المعلم والحصة أولاً");
    return; // 👈 متتنقليش للصفحة لو لسه ناقص اختيار
  }

  addClassMutation.mutate(
    { teacherId: selectedTeacher, classId: selectedClass },
    {
      onSuccess: (res) => {
        toast.success(res.data?.message || "تمت إضافة المعلم بنجاح");
        navigate("/dashboard/teacher_table"); // 👈 هنا التنقل بعد النجاح فقط
      },
      onError: (err) =>
        toast.error(err.response?.data?.message || "حدث خطأ أثناء الإضافة"),
    }
  );
};

  return (
    <div className="p-6 mt-20 bg-white rounded shadow max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">إضافة معلم إلى حصة</h2>

      <div className="flex flex-col gap-4">
        <select
          value={selectedTeacher}
          onChange={(e) => {
            setSelectedTeacher(e.target.value);
            setSelectedClass(""); // إعادة تعيين الحصة عند تغيير المعلم
          }}
          className="border p-2 rounded"
        >
          <option value="">اختر المعلم</option>
          {teachers?.map((t) => (
            <option key={t.id} value={t.id}>
              {t.fullName} - {t.courseName}
            </option>
          ))}
        </select>

        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">اختر الحصة</option>
          {classes?.map((c) => (
            <option key={c.id} value={c.id}>
              {c.bouquetName} - {new Date(c.startDate).toLocaleDateString()} {c.classTime}
            </option>
          ))}
        </select>

        <button
          onClick={handleSubmit}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          إضافة المعلم للحصة
        </button>
      </div>
    </div>
  );
}
