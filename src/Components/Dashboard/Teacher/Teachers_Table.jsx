import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function TeachersTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [teacherToDelete, setTeacherToDelete] = useState(null); // ✅ لحفظ المعلّم اللي هيتحذف
  const [teachers, setTeachers] = useState([
    { id: 1, name: "علي", email: "michelle.rivera@example.com", city: "السعودية, الاحساء", subject: "Maths", phone: "0111111111", booked: 4, total: 7 },
    { id: 2, name: "احمد", email: "debbie.baker@example.com", city: "اسم المدينة", subject: "اعراب", phone: "0111111111", booked: 5, total: 7 },
    { id: 3, name: "حسن", email: "nathan.roberts@example.com", city: "اسم المدينة", subject: "English", phone: "0111111111", booked: 2, total: 7 },
    { id: 4, name: "محمود", email: "felicia.reid@example.com", city: "اسم المدينة", subject: "قراءة", phone: "0111111111", booked: 7, total: 7 },
    { id: 5, name: "ايمان", email: "tim.jennings@example.com", city: "اسم المدينة", subject: "قراءة", phone: "0111111111", booked: 0, total: 7 },
  ]);

  // 🔍 دالة لتطبيع النص للبحث
  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .replace(/[\u064B-\u0652]/g, "")
      .replace(/[أإآا]/g, "ا")
      .replace(/\s+/g, " ")
      .trim();
  };

  const normalizedSearch = normalizeText(searchTerm);

  const filteredTeachers = teachers.filter(
    (teacher) =>
      normalizeText(teacher.name).includes(normalizedSearch) ||
      normalizeText(teacher.email).includes(normalizedSearch) ||
      normalizeText(teacher.subject).includes(normalizedSearch)
  );

  // ✅ دالة تأكيد الحذف
  const handleDelete = () => {
    if (teacherToDelete) {
      const updated = teachers.filter((t) => t.id !== teacherToDelete.id);
      setTeachers(updated);
      setTeacherToDelete(null);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-5xl mx-auto">
      <div className="flex justify-between items-center p-4">
        <h3 className="text-text_color font-cairo text-basemobile md:text-lg">المعلمين</h3>
        <Link
          to="/dashboard/add-teacher"
          className="px-4 py-2 bg-background text-white rounded-lg shadow hover:bg-[#0f8392] transition"
        >
          إضافة معلم
        </Link>
      </div>

      {/* مربع البحث */}
      <div className="p-4 bg-white dark:bg-gray-800">
        <input
          type="text"
          placeholder="🔍 بحث بالاسم أو البريد الإلكتروني"
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Empty State */}
      {filteredTeachers.length === 0 ? (
        <div className="text-center py-12">
          <img
            src="/images/no-teachers.png"
            alt="لا يوجد معلمين"
            className="mx-auto mb-4 w-40 h-40 object-contain"
          />
          <h2 className="text-lg font-cairo text-gray-600 mb-2">لا يوجد معلمين في الوقت الحالي</h2>
          <p className="text-gray-500">سوف يظهر هنا جدول للمعلمين المتاحين بالمركز التدريبي</p>
        </div>
      ) : (
        <table className="w-full text-sm text-left rtl:text-right text-text_color dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="p-4">#</th>
              <th className="px-4 py-3">الاسم</th>
              <th className="px-6 py-3">البريد الإلكتروني</th>
              <th className="px-5 py-3">المدينة</th>
              <th className="px-4 py-3">المادة التدريبية</th>
              <th className="px-4 py-3">رقم الهاتف</th>
              <th className="px-6 py-3">الحصص المتوفرة</th>
              <th className="px-6 py-3">الإجراء</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeachers.map((teacher, index) => {
              const remaining = teacher.total - teacher.booked;
              let statusText =
                remaining === 0
                  ? "اكتمل العدد"
                  : remaining === teacher.total
                  ? "متوفرة بالكامل"
                  : `متوفر ${remaining} حصص`;

              return (
                <tr
                  key={teacher.id}
                  className="odd:bg-white even:bg-blue-50 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100"
                >
                  <td className="p-4">{index + 1}</td>
                  <td>
                    <Link to={`/dashboard/teacher-sessions/${teacher.id}/${encodeURIComponent(teacher.name)}`}>
                      {teacher.name}
                    </Link>
                  </td>
                  <td className="px-5 py-4">{teacher.email}</td>
                  <td className="px-4 py-4">{teacher.city}</td>
                  <td className="px-4 py-4">{teacher.subject}</td>
                  <td className="px-2 py-4">{teacher.phone}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-1 py-2 w-full flex items-center justify-center rounded-full text-white text-xs 
                      ${remaining === 0 ? "bg-red-500" : remaining === teacher.total ? "bg-green-500" : "bg-yellow-500"}`}
                    >
                      {statusText}
                    </span>
                  </td>
                  <td className="flex items-center px-6 py-4">
                    <Link
                      to={`/dashboard/edit-teacher/${teacher.id}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      تعديل
                    </Link>
                    <button
                      onClick={() => setTeacherToDelete(teacher)} // ✅ فتح البوب أب
                      className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* ✅ بوب أب الحذف */}
      {teacherToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
            <h2 className="text-lg font-bold mb-4">تأكيد الحذف</h2>
            <p className="text-gray-600 mb-6">
              هل أنت متأكد أنك تريد حذف المعلم{" "}
              <span className="font-bold text-red-500">{teacherToDelete.name}</span>؟
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                نعم، احذف
              </button>
              <button
                onClick={() => setTeacherToDelete(null)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
