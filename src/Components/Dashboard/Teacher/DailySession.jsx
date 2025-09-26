import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetTeacherProfile } from "../../../Hooks/Teacher/useQueryTeacher";
import SessionStudentsModal from "./SessionStudentsModal";
import Loading from "../../Loading";

export default function DailyySession() {
  const { teacherId, teacherName } = useParams();
  const { data: teacherProfile, isLoading, isError } =
    useGetTeacherProfile(teacherId);
  const [selectedSession, setSelectedSession] = useState(null);
  console.log(teacherProfile);

  if (isLoading) return <Loading />;
  if (isError)
    return <p className="text-center p-4 text-red-500">فشل تحميل الحصص</p>;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-4xl mx-auto">
      <div className="flex justify-between items-center p-4">
        <h3 className="text-text_color font-cairo text-basemobile md:text-lg">
          جدول حصص المعلم: {decodeURIComponent(teacherName)}
        </h3>
        <p className="text-primary font-cairo ">المادة التدربية : <span className="text-secondary bold ">{teacherProfile.courseName}</span></p>

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
    </div>
  );
}
