import React, { useState } from "react";
import AddStudentPopup from "./AddNewStudent";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import EditStudentPopup from "./EditStudentPopup";
import ConfirmMoveToWaitingPopup from "../WaitingStudent/ConfirmMoveToWaitingPopup";
import EmptyImg from "../../../../assets/images/Empty.png";
import { useGetAllStudents } from "../../../../Hooks/Students/NewStudents/useQueryNewStudent";
import {
  useAddNewStudent,
  useUpdateStudent,
  useDeleteStudent,
  useMoveStudentToWaiting,
} from "../../../../Hooks/Students/NewStudents/useMutationNewStudent";
import { toast } from "react-toastify";

export default function NewStudentsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editPopup, setEditPopup] = useState({ isOpen: false, student: null });
  const [moveToWatingPop, setMoveToWatingPop] = useState({ isOpen: false, student: null });
  const [deletePopup, setDeletePopup] = useState({ isOpen: false, student: null });

  // ✅ جلب الطلاب
  const { data: students, isLoading, isError } = useGetAllStudents();

  // ✅ الميوتيشنز
  const addMutation = useAddNewStudent();
  const updateMutation = useUpdateStudent();
  const deleteMutation = useDeleteStudent();
  const moveToWatingMutation = useMoveStudentToWaiting();

  const normalizeText = (text) =>
    text
      .toLowerCase()
      .replace(/[\u064B-\u0652]/g, "")
      .replace(/[أإآا]/g, "ا")
      .replace(/\s+/g, " ")
      .trim();

  const filteredStudents = (students?.data ?? []).filter((student) =>
    normalizeText(student.studentName).includes(normalizeText(searchTerm)) ||
    normalizeText(student.phoneNumber).includes(normalizeText(searchTerm))
  );

  if (isLoading) return <p className="text-center p-4">جاري تحميل الطلاب...</p>;
  if (isError) return <p className="text-center p-4 text-red-500">حدث خطأ أثناء جلب الطلاب</p>;

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
          <img src={EmptyImg} alt="لا يوجد طلاب" className="mx-auto mb-4 w-40 h-40 object-contain" />
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
                key={student.id}
                className="odd:bg-white even:bg-blue-50 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100"
              >
                <td className="p-4">{index + 1}</td>
                <td>{student.studentName}</td>
                <td>{student.phoneNumber}</td>
                <td>{student.city}</td>
                <td>{student.date}</td>
                <td>{student.time}</td>
                <td className="flex items-center px-6 py-4">
                  <button
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => setEditPopup({ isOpen: true, student })}
                  >
                    تعديل
                  </button>
                   <button
                    className="font-medium text-secondary mr-2 dark:text-yellow-600 hover:underline"
                    onClick={() => setMoveToWatingPop({ isOpen: true, student })}
                  >
                    نقل الي قائمة الانتظار
                  </button>
                  <button
                    className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                    onClick={() => setDeletePopup({ isOpen: true, student })}
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
        onSubmit={(data) => addMutation.mutate(data)}
      />

      {/* بوب اب تعديل الطالب */}
      {editPopup.isOpen && (
        <EditStudentPopup
          isOpen={editPopup.isOpen}
          onClose={() => setEditPopup({ isOpen: false, student: null })}
          studentData={editPopup.student}
          onSubmit={(data) =>
            updateMutation.mutate(
              { id: editPopup.student.id, data }, 
              {
                onSuccess: () => {
                  setEditPopup({ isOpen: false, student: null });
                  toast.success("تم تعديل الطالب بنجاح");
                },
                onError: () => toast.error("حدث خطأ أثناء التعديل"),
              }
            )
          }
        />
      )}
      {/* نقل الطالب الي قائمة الانتظار} */}

      {moveToWatingPop.isOpen && (
        <ConfirmMoveToWaitingPopup
          isOpen={moveToWatingPop.isOpen}
          studentId={moveToWatingPop.student.id}
          studentName={moveToWatingPop.student?.studentName || "هذا الطالب"}
          onClose={() => setMoveToWatingPop({ isOpen: false, student: null })}
          onConfirm={() =>
            moveToWatingMutation.mutate(moveToWatingPop.student.id, {
              onSuccess: () => {
                setMoveToWatingPop({ isOpen: false, student: null });
                toast.success("تم نقل الطالب إلى قائمة الانتظار بنجاح");
              },
              onError: (error) => {
                console.error("MoveToWaiting error:", error.response?.data || error.message);

                toast.error("حدث خطأ أثناء النقل")
              },
            })
          }
        />
      )}
      {/* بوب اب حذف الطالب */}
      {deletePopup.isOpen && (
        <ConfirmDeletePopup
          isOpen={deletePopup.isOpen}
          studentId={deletePopup.student.id}
          studentName={deletePopup.student?.studentName || "هذا الطالب"}
          onClose={() => setDeletePopup({ isOpen: false, student: null })}
          onConfirm={() =>
            deleteMutation.mutate(deletePopup.student.id, {
              onSuccess: () => {
                setDeletePopup({ isOpen: false, student: null });
                toast.success("تم حذف الطالب بنجاح");
              },
              onError: () => toast.error("حدث خطأ أثناء الحذف"),
            })
          }
        />
      )}

    </div>
  );
}
