import React, { useState } from "react";
import AddStudentPopup from "./AddNewStudent";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import EditStudentPopup from "./EditStudentPopup";
import EmptyImg from "../../../../assets/images/Empty.png";

export default function NewStudentsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [deletePopup, setDeletePopup] = useState({ isOpen: false, index: null });
  const [editPopup, setEditPopup] = useState({ isOpen: false, index: null });

  const [students, setStudents] = useState([
    { name: "علي", phone: "01111111111", city: "السعودية, الاحساء", day: "الاحد 19-7", time: "3:45 صباحاً" },
    { name: "محمد", phone: "--", city: "السعودية, الاحساء", day: "الاحد 19-7", time: "4:00 صباحاً" },
  ]);

  const normalizeText = (text) =>
    text.toLowerCase().replace(/[\u064B-\u0652]/g, "").replace(/[أإآا]/g, "ا").replace(/\s+/g, " ").trim();

  const filteredStudents = students.filter(
    (student) =>
      normalizeText(student.name).includes(normalizeText(searchTerm)) ||
      normalizeText(student.phone).includes(normalizeText(searchTerm))
  );

  const handleAddStudent = (student) => setStudents([...students, student]);
  const handleDeleteStudent = (index) => {
    setStudents(students.filter((_, i) => i !== index));
    setDeletePopup({ isOpen: false, index: null });
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-5xl mx-auto">
      <div className="flex justify-between items-center p-4">
        <h3 className="text-text_color font-cairo text-basemobile md:text-lg">الطلاب الجدد</h3>
        <button
          onClick={() => setIsAddOpen(true)}
          className="px-4 py-2 bg-background text-white rounded-lg shadow hover:bg-[#0f8392] transition"
        >
          إضافة طالب
        </button>
      </div>

      {/* مربع البحث */}
      <div className="p-4 bg-white dark:bg-gray-800">
        <input
          type="text"
          placeholder="🔍 إبحث عن الطالب باستخدام الاسم أو رقم الهاتف"
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Empty State */}
      {filteredStudents.length === 0 ? (
        <div className="text-center py-12">
          <img
            src={EmptyImg} // ضع رابط الصورة المناسب
            alt="لا يوجد طلاب"
            className="mx-auto mb-4 w-40 h-40 object-contain"
          />
          <h2 className="text-lg font-cairo text-gray-600 mb-2">لا يوجد طلاب في الوقت الحالي</h2>
          <p className="text-gray-500">
            سوف يظهر هنا جدول للطلاب الذين قاموا بحجز موعد زيارة للمركز التدريبي
          </p>
        </div>
      ) : (
        <table className="w-full text-sm text-left rtl:text-right text-text_color dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="p-4">#</th>
              <th className="px-4 py-3">اسم الطالب</th>
              <th className="px-4 py-3">رقم الهاتف</th>
              <th className="px-4 py-3">المدينة</th>
              <th className="px-4 py-3">اليوم</th>
              <th className="px-4 py-3">الوقت</th>
              <th className="px-6 py-3">الإجراء</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr
                key={index}
                className="odd:bg-white even:bg-blue-50 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100"
              >
                <td className="p-4">{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.phone}</td>
                <td>{student.city}</td>
                <td>{student.day}</td>
                <td>{student.time}</td>
                <td className="flex items-center px-6 py-4">
                  <button
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => setEditPopup({ isOpen: true, index })}
                  >
                    تعديل
                  </button>
                  <button
                    className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                    onClick={() => setDeletePopup({ isOpen: true, index })}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* بوب اب إضافة طالب */}
      <AddStudentPopup
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAddStudent={handleAddStudent}
      />

      {/* بوب اب تعديل الطالب */}
      {editPopup.isOpen && (
        <EditStudentPopup
          isOpen={editPopup.isOpen}
          onClose={() => setEditPopup({ isOpen: false, index: null })}
          studentData={students[editPopup.index]}
          onUpdateStudent={(updatedStudent) => {
            const newStudents = [...students];
            newStudents[editPopup.index] = updatedStudent;
            setStudents(newStudents);
          }}
        />
      )}

      {/* بوب اب حذف الطالب */}
      <ConfirmDeletePopup
        isOpen={deletePopup.isOpen}
        studentName={deletePopup.index !== null ? students[deletePopup.index].name : ""}
        onClose={() => setDeletePopup({ isOpen: false, index: null })}
        onConfirm={() => handleDeleteStudent(deletePopup.index)}
      />
    </div>
  );
}
