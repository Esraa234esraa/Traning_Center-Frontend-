import React from "react";
import { Link, useParams } from "react-router-dom";


export default function DailyySession() {
    const { teacherId, teacherName } = useParams();

    // البيانات الأولى اللي في وصفك
    const sessions = [
        { id: 1, packageSize: "طالب واحد", students: "محمد - احمد", time: "10:00 - 10:45" },
        { id: 2, packageSize: "3 طلاب", students: "علي - اسماء", time: "11:00 - 11:45" },
        { id: 3, packageSize: "طالبين", students: "مصطفي", time: "12:00 - 12:45" },
        { id: 4, packageSize: "طالب واحد", students: "--", time: "01:00 - 01:45" },
        { id: 5, packageSize: "5 طلاب", students: "--", time: "03:00 - 03:45" },
        { id: 6, packageSize: "طالب واحد", students: "--", time: "04:00 - 04:45" },
        { id: 7, packageSize: "فارغه", students: "--", time: "05:00 - 05:45" },
    ];

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-4xl mx-auto">
            <div className="flex justify-between items-center p-4">
                <h3 className="text-text_color font-cairo text-basemobile md:text-lg">
                    جدول حصص المعلم: {decodeURIComponent(teacherName)}
                </h3>

                {/* زر الرجوع للمعلمين */}
                <Link
                    to="/dashboard/teacher_table"
                    className="px-4 py-2 bg-[#12A4B6] hover:bg-[#0e7f8d] text-white rounded-lg shadow transition"
                >
                    رجوع للمعلمين
                </Link>
            </div>

            <table className="w-full text-sm text-left rtl:text-right text-text_color dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="p-3">رقم الحصة</th>
                        <th className="p-3">المستوى</th>
                        <th className="p-3">الباقة</th>
                        <th className="p-3">الطلاب</th>
                        <th className="p-3">الوقت</th>
                    </tr>
                </thead>
                <tbody>
                    {sessions.map((session, index) => (
                        <tr
                            key={session.id}
                            className="odd:bg-white even:bg-blue-50 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100"
                        >
                            <td className="p-3">{session.id}</td>
                            <td className="p-3">المستوى {index + 1}</td>
                            <td className="p-3">{session.packageSize}</td>
                            <td className="p-3">{session.students}</td>
                            <td className="p-3">{session.time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
