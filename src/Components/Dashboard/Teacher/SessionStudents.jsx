import { useParams, Link } from "react-router-dom";
import ConfirmDeleteModal from "../../Dashboard/Students/CurrentStudents/ConfirmDeleteModal";
import { useState } from "react";

// بيانات الطلاب (مؤقتة)
const initialStudents = [
  { id: 1, name: "علي", sessionId: 1, phone: "01111111111", city: "السعودية, الاحساء", level: 1, material: "Maths", start: "بداية من 10-7", package: "طالبين", payment: "تم الدفع" },
  { id: 2, name: "محمد", sessionId: 2, phone: "--", city: "السعودية, الاحساء", level: 1, material: "Maths", start: "بداية من 10-7", package: "3 طلاب", payment: "لم يتم" },
  { id: 3, name: "محمود", sessionId: 2, phone: "--", city: "السعودية, الاحساء", level: 1, material: "Maths", start: "بداية من 10-7", package: "3 طلاب", payment: "تم الدفع" },
  { id: 4, name: "حسن", sessionId: 3, phone: "--", city: "السعودية, الاحساء", level: 1, material: "Maths", start: "بداية من 17-7", package: "5 طلاب", payment: "لم يتم" },
];

export default function SessionStudents() {
  const { teacherId, teacherName, sessionId } = useParams();

  const [students, setStudents] = useState(initialStudents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const openDeleteModal = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    setStudents((prev) => prev.filter((s) => s.id !== selectedStudent.id));
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  const filteredStudents = students.filter(
    (s) => s.sessionId === Number(sessionId)
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">
          الطلاب الخاصين بالحصة {sessionId}
        </h2>
        <Link
          to={`/dashboard/teacher-sessions/${teacherId}/${encodeURIComponent(
            teacherName
          )}`}
          className="px-4 py-2 bg-[#12A4B6] text-white rounded-lg hover:bg-[#0e7f8d] transition"
        >
          رجوع للحصص
        </Link>
      </div>

      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">اسم الطالب</th>
            <th className="p-2 border">المستوى</th>
            <th className="p-2 border">المادة التدريبية</th>
            <th className="p-2 border">الباقة</th>
            <th className="p-2 border">حالة الدفع</th>
            <th className="p-2 border">رقم الهاتف</th>
            <th className="p-2 border">لوحة التحكم</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id}>
              <td className="p-2 border">{student.name}</td>
              <td className="p-2 border">{student.level}</td>
              <td className="p-2 border">{student.material}</td>
              <td className="p-2 border">{student.package}</td>
              <td className="p-2 border">{student.payment}</td>
              <td className="p-2 border">{student.phone}</td>
              <td className="p-2 border flex gap-2">
               <Link to={`/dashboard/students/student-profile/${student.id}`} 
               className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600" > 
               تفاصيل 
               </Link>
                <Link
                  to={`/dashboard/students/edit/${student.id}`}
                  className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  تعديل
                </Link>
                <button
                  onClick={() => openDeleteModal(student)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* المودال */}
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        student={selectedStudent} // نمرر بيانات الطالب للـ Modal
      />
    </div>
  );
}
