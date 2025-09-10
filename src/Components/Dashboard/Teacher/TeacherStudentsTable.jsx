import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ActionButton } from "../../ActionButton";
import ConfirmDeleteModal from "../Students/CurrentStudents/ConfirmDeleteModal";

export default function TeacherStudentsTable() {
  const [search, setSearch] = useState("");
  const { teacherName } = useParams();
  const navigate = useNavigate();

  const [studentToDelete, setStudentToDelete] = useState(null);
  const [loading, setLoading] = useState(false); // ✅ للتحكم في اللودينج

  const students = [
    { id: 1, name: "علي", phone: "01111111111", level: 1, subject: "Maths", package: "طالبين", session: "الحصة الاولي", startDate: "بداية من 10-7", payment: "تم الدفع", city: "السعودية,الاحساء" },
    { id: 2, name: "محمد", phone: "--", level: 1, subject: "Maths", package: "3 طلاب", session: "الحصة الثانية", startDate: "بداية من 10-7", payment: "لم يتم", city: "السعودية,الاحساء" },
    { id: 3, name: "محمود", phone: "--", level: 1, subject: "Maths", package: "طالبين", session: "الحصة الاولي", startDate: "10-7", payment: "تم الدفع", city: "السعودية,الاحساء" },
    { id: 4, name: "حسن", phone: "--", level: 1, subject: "Maths", package: "طالب واحد", session: "الحصة الثانية", startDate: "بداية من 10/7", payment: "تم الدفع", city: "السعودية,الاحساء" },
  ];

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.phone.includes(search)
  );

  const handleDelete = async () => {
    if (!studentToDelete) return;
    setLoading(true); // ✅ نبدأ اللودينج
    try {
      // ⬇️ هنا مكان API delete
      await new Promise((resolve) => setTimeout(resolve, 2000)); // simulation
      console.log("Deleting student:", studentToDelete.id);
    } finally {
      setLoading(false);
      setStudentToDelete(null);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      {/* ✅ لو في لودينج نعرض شاشة التحميل */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center">
            <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
            <p className="text-gray-700 font-bold">جارٍ المعالجة...</p>
          </div>
        </div>
      )}

      {/* العنوان + البحث */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-background text-white rounded-lg shadow hover:bg-[#0f8392] transition md:mx-4"
        >
          رجوع للمعلم
        </button>
        <h2 className="text-xl font-bold text-gray-800 mb-4 md:mb-0">
          الطلاب الخاصين بالمعلم {decodeURIComponent(teacherName)}
        </h2>
        <input
          type="text"
          placeholder="ابحث بالاسم أو رقم الهاتف..."
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#12A4B6]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* الجدول */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border text-sm text-right">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3 border">اسم الطالب</th>
              <th className="p-3 border">المستوي</th>
              <th className="p-3 border">الحصة</th>
              <th className="p-3 border">البداية</th>
              <th className="p-3 border">المادة التدريبية</th>
              <th className="p-3 border">الباقة</th>
              <th className="p-3 border">حالة الدفع</th>
              <th className="p-3 border">المدينة</th>
              <th className="p-3 border">رقم الهاتف</th>
              <th className="p-3 border">لوحة التحكم</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="p-3 border font-medium text-blue-600 hover:underline">
                  <Link to={`/dashboard/students/student-profile/${student.id}`}>
                    {student.name}
                  </Link>
                </td>
                <td className="p-3 border">{student.level}</td>
                <td className="p-3 border">{student.session}</td>
                <td className="p-3 border">{student.startDate}</td>
                <td className="p-3 border">{student.subject}</td>
                <td className="p-3 border">{student.package}</td>
                <td
                  className={`p-3 border font-bold ${
                    student.payment === "تم الدفع"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {student.payment}
                </td>
                <td className="p-3 border">{student.city}</td>
                <td className="p-3 border">{student.phone}</td>
                <td className="p-3 border">
                  <div className="flex gap-2">
                    <ActionButton
                      to={`/dashboard/students/edit/${student.id}`}
                      color="blue"
                    >
                      تعديل
                    </ActionButton>
                    <ActionButton
                      onClick={() => setStudentToDelete(student)}
                      color="red"
                    >
                      حذف
                    </ActionButton>
                    <ActionButton
                      to={`/dashboard/students/student-profile/${student.id}`}
                      color="green"
                    >
                      تفاصيل
                    </ActionButton>
                  </div>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="10" className="p-4 text-center text-gray-500">
                  لا يوجد طلاب مطابقين لبحثك.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* ✅ المودال شغال على الطالب المختار */}
        {studentToDelete && (
          <ConfirmDeleteModal
            isOpen={!!studentToDelete}
            onCancel={() => setStudentToDelete(null)}
            onConfirm={handleDelete}
          />
        )}
      </div>
    </div>
  );
}
