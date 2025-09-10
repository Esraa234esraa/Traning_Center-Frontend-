import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

export default function CurrentStudentsTable({ onDelete }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const [filterPackage, setFilterPackage] = useState(""); // فلتر الباقة
  const [filterPayment, setFilterPayment] = useState(""); // فلتر الدفع
  const [filterTeacher, setFilterTeacher] = useState(""); // فلتر الحصة/المعلم
  const [filterCity, setFilterCity] = useState("");
  const [filterSubject, setFilterSubject] = useState("");

  const openPopup = (student) => {
    setSelectedStudent(student);
    setIsOpen(true);
  };

  const confirmDelete = () => {
    if (selectedStudent) {
      onDelete(selectedStudent.id);
    }
    setIsOpen(false);
    setSelectedStudent(null);
  };

  const Allstudents = [
    { id: 1, name: "علي", phone: "01111111111", city: "السعودية, الاحساء", subject: "Maths", teacher: "علي / الحصة الاولى", package: "طالب واحد", paymentStatus: "تم الدفع" },
    { id: 2, name: "محمد", phone: "--", city: "السعودية, الاحساء", subject: "Maths", teacher: "محمد / الحصة الثانية", package: "3 طلاب", paymentStatus: "لم يتم" },
    { id: 3, name: "احمد", phone: "--", city: "السعودية, الاحساء", subject: "Maths", teacher: "احمد / الحصة السادسة", package: "طالبين", paymentStatus: "تم الدفع" },
    { id: 4, name: "حسن", phone: "--", city: "السعودية, الاحساء", subject: "Maths", teacher: "حسن / الحصة السابعة", package: "طالب واحد", paymentStatus: "لم يتم" },
    { id: 5, name: "فاطمه", phone: "--", city: "السعودية, الاحساء", subject: "Maths", teacher: "--", package: "5 طلاب", paymentStatus: "تم الدفع" },
  ];

  const normalizeText = (text) =>
    text.toLowerCase().replace(/[\u064B-\u0652]/g, "").replace(/[أإآا]/g, "ا").replace(/\s+/g, " ").trim();

  const filteredStudents = Allstudents.filter((student) => {
    const matchesSearch =
      normalizeText(student.name).includes(normalizeText(searchTerm)) ||
      normalizeText(student.phone).includes(normalizeText(searchTerm)) ||
      normalizeText(student.subject).includes(normalizeText(searchTerm));

    const matchesPackage = filterPackage ? student.package === filterPackage : true;
    const matchesPayment = filterPayment ? student.paymentStatus === filterPayment : true;
    const matchesTeacher = filterTeacher ? student.teacher === filterTeacher : true;
    const matchesCity = filterCity ? student.city === filterCity : true;
    const matchesSubject = filterSubject ? student.subject === filterSubject : true;

    return matchesSearch && matchesPackage && matchesPayment && matchesTeacher && matchesCity && matchesSubject;
  });

  const packages = [...new Set(Allstudents.map((s) => s.package))];
  const teachers = [...new Set(Allstudents.map((s) => s.teacher).filter(t => t !== "--"))];
  const cities = [...new Set(Allstudents.map((s) => s.city))];
  const subjects = [...new Set(Allstudents.map((s) => s.subject))];

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-6xl mx-auto p-4">
      <h3 className="text-text_color font-cairo text-basemobile md:text-lg mb-4">الطلاب الحاليين</h3>

      {/* الفلاتر */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="🔍 ابحث عن الطالب بالاسم أو رقم الهاتف"
          className="p-2 border rounded-lg flex-1 min-w-[180px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="p-2 border rounded-lg min-w-[140px]"
          value={filterPackage}
          onChange={(e) => setFilterPackage(e.target.value)}
        >
          <option value="">كل الباقات</option>
          {packages.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        <select
          className="p-2 border rounded-lg min-w-[140px]"
          value={filterPayment}
          onChange={(e) => setFilterPayment(e.target.value)}
        >
          <option value="">كل الحالات</option>
          <option value="تم الدفع">تم الدفع</option>
          <option value="لم يتم">لم يتم</option>
        </select>

        <select
          className="p-2 border rounded-lg min-w-[160px]"
          value={filterTeacher}
          onChange={(e) => setFilterTeacher(e.target.value)}
        >
          <option value="">كل الحصص/المعلمين</option>
          {teachers.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        <select
          className="p-2 border rounded-lg min-w-[140px]"
          value={filterCity}
          onChange={(e) => setFilterCity(e.target.value)}
        >
          <option value="">كل المدن</option>
          {cities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          className="p-2 border rounded-lg min-w-[140px]"
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
        >
          <option value="">كل المواد</option>
          {subjects.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <button
          className="px-3 py-2 bg-background text-white rounded-lg hover:bg-[#0f8392] transition"
          onClick={() => navigate("/dashboard/students/add-current")}
        >
          إضافة طالب
        </button>
      </div>

      {/* الجدول */}
      {filteredStudents.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-lg font-cairo text-gray-600 mb-2">لا يوجد طلاب حاليين</h2>
        </div>
      ) : (
        <table className="w-full text-sm text-left rtl:text-right text-text_color dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="p-4">#</th>
              <th className="px-4 py-3">اسم الطالب</th>
              <th className="px-4 py-3">رقم الهاتف</th>
              <th className="px-4 py-3">المدينة</th>
              <th className="px-4 py-3">المادة التدريبية</th>
              <th className="px-4 py-3">المعلم</th>
              <th className="px-4 py-3">الباقة</th>
              <th className="px-4 py-3">حالة الدفع</th>
              <th className="px-6 py-3">الإجراء</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={student.id} className="odd:bg-white even:bg-blue-50 border-b hover:bg-gray-100">
                <td className="p-4">{index + 1}</td>
                <td>
                  <button onClick={() => navigate(`/dashboard/students/student-profile/${student.id}`)} className="text-blue-600 hover:underline">
                    {student.name}
                  </button>
                </td>
                <td>{student.phone}</td>
                <td>{student.city}</td>
                <td>{student.subject}</td>
                <td>{student.teacher}</td>
                <td>{student.package}</td>
                <td>
                  <span className={student.paymentStatus === "تم الدفع" ? "text-green-600" : "text-red-600"}>
                    {student.paymentStatus}
                  </span>
                </td>
                <td className="px-6 py-4 space-x-2">
                  <button
                    className="text-blue-600 hover:bg-blue-700 hover:text-white px-3 py-1 rounded-lg transition"
                    onClick={() => navigate(`/dashboard/students/edit/${student.id}`)}
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => openPopup(student)}
                    className="text-red-700 px-3 py-1 rounded-lg hover:bg-red-700 hover:text-white transition"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* البوب أب */}
      <ConfirmDeleteModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={confirmDelete}
        student={selectedStudent}
      />
    </div>
  );
}
