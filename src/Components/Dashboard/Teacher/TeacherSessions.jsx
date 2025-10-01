import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useGetProfileTeacherWithClassesAsyncByAdmin } from "../../../Hooks/Teacher/useQueryTeacher";
import SessionStudentsModal from "./SessionStudentsModal";
import Loading from "../../Loading";
import { useResetTeacherPassword } from "../../../Hooks/Teacher/useMutationTeacher";
import { toast } from "react-toastify";

export default function TeacherSessions() {
  const { teacherId, teacherName } = useParams();
  const navigate = useNavigate();

  const { data: teacherProfile, isLoading, isError } =
    useGetProfileTeacherWithClassesAsyncByAdmin(teacherId);
  console.log(teacherProfile);

  const { mutate: resetPassword, isLoading: isResetting } =
    useResetTeacherPassword();

  const [selectedSession, setSelectedSession] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  if (isLoading) return <Loading />;
  if (isError)
    return <p className="text-center p-4 text-red-500">فشل تحميل الحصص</p>;

  const handleReset = () => {
    if (!newPassword) return;
    resetPassword(
      { teacherId, password: newPassword },
      {
        onSuccess: () => {
          toast.onSuccess("تم تغيير كلمة المرور بنجاح ");
          setIsModalOpen(false);
          setNewPassword("");
        },
        onError: () => {
          toast.onError("حدث خطأ أثناء تغيير كلمة المرور ");
        },
      }
    );
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-4xl mx-auto">
      <div className="flex justify-between items-center p-4">
        <h3 className="text-text_color font-cairo text-basemobile md:text-lg">
          جدول حصص المعلم: {decodeURIComponent(teacherName)}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            إعادة تعيين كلمة المرور
          </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
          >
            رجوع
          </button>
        </div>
      </div>

   
      <table className="w-full text-sm text-left rtl:text-right text-text_color dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="p-3">رقم الحصة</th>
            <th className="p-3">المستوى</th>
            <th className="p-3">رقم المستوى</th>

            <th className="p-3">الباقة</th>
            <th className="p-3">الطلاب</th>
            <th className="p-3">عدد الطلاب الحاليين</th>
            <th className="p-3">عدد الطلاب المتبقية</th>


            <th className="p-3">الوقت</th>
            <th className="p-3"> تاريخ البداية</th>
            <th className="p-3"> تاريخ الانتهاء</th>

          </tr>
        </thead>

        {teacherProfile?.classes?.length > 0 ? (
          <tbody>
            {teacherProfile.classes.map((session, index) => (
              <tr
                key={session.id}
                className="odd:bg-white even:bg-blue-50 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100"
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{session.levelName || "--"}</td>
                <td className="p-3">{session.levelNumber || "--"}</td>
                <td className="p-3">{session.packageSize || "--"}</td>
                <td
                  className="p-3 cursor-pointer text-primary hover:underline"
                  onClick={() => setSelectedSession(session)}
                >
                  {session.students?.length > 0
                    ? session.students.map((s) => s.fullName).join(" - ")
                    : "--"}
                </td>

                <td className="p-3">{session.currentStudentsCount || "--"}</td>
                <td className="p-3">
                  {session.currentStudentsCount >= session.packageSize ? (
                    <span className="text-red-500 font-bold">0</span>   // مكتملة
                  ) : session.currentStudentsCount === 0 ? (
                    <span className="text-green-500 font-bold">
                      {session.packageSize}
                    </span>   // كلها متاحة
                  ) : (
                    <span className="text-yellow-500 font-bold">
                      {session.packageSize - session.currentStudentsCount}
                    </span>   // لسه في انتظار
                  )}
                </td>

                <td className="p-3">
                  {session.classTime
                    ? new Date(`${session.startDate.split("T")[0]}T${session.classTime}`).toLocaleTimeString("ar-EG", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                    : "--"}
                </td>
                <td className="p-3">
                  {session.startDate
                    ? new Date(session.startDate).toLocaleDateString("ar-EG", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                    : "--"}
                </td>
                <td className="p-3">
                  {session.startDate
                    ? new Date(session.endDate).toLocaleDateString("ar-EG", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                    : "--"}
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan="5" className="text-center p-4 text-gray-500">
                لا توجد حصص لهذا المعلم اليوم
              </td>
            </tr>
          </tbody>
        )}
      </table>
      {selectedSession && (
        <SessionStudentsModal
          session={selectedSession}
          onClose={() => setSelectedSession(null)}
        />
      )}

      {/* المودال */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-lg font-bold mb-4 text-center">
              إعادة تعيين كلمة مرور المعلم
            </h2>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="ادخل كلمة المرور الجديدة"
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                إلغاء
              </button>
              <button
                onClick={handleReset}
                disabled={isResetting}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
              >
                {isResetting ? "جارٍ الحفظ..." : "تأكيد"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
