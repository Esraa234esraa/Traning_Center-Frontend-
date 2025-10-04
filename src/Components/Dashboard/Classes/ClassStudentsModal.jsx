import React, { useMemo } from "react";
import { useGetAllCurrentStudentByClassId } from "../../../Hooks/Students/CurrentStudent/useQueryCurrentStudent";
import Loading from "../../Loading";

export default function ClassStudentsModal({ isOpen, onClose, classId }) {
  const { data, isLoading, isError } = useGetAllCurrentStudentByClassId(classId);

  // ⚡ نستخدم useMemo لتخزين بيانات الطلاب الجاهزة للعرض
  const students = useMemo(() => {
    return data?.data || [];
  }, [data?.data]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 left-2 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">👨‍🎓 طلاب الصف</h2>

        {isLoading ? (
          <Loading />
        ) : isError ? (
          <p className="text-red-500 text-center">حدث خطأ أثناء تحميل البيانات</p>
        ) : students.length > 0 ? (
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">الاسم</th>
                <th className="px-4 py-2 border">الهاتف</th>
                <th className="px-4 py-2 border">المدينة</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border text-center">
                    {student.studentName}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {student.phoneNumber}
                  </td>
                  <td className="px-4 py-2 border text-center">{student.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 text-center">لا يوجد طلاب في هذا الصف</p>
        )}
      </div>
    </div>
  );
}
