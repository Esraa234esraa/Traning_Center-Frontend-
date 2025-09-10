import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import AddStudentModal from "./AddStudentToSession";
export default function TeacherSessions() {
    const { teacherId, teacherName } = useParams();
    const [openModal, setOpenModal] = useState(false);
    const handleAddStudent = (data) => {
        console.log("🚀 بيانات الطالب:", data);
        // هنا هتعملي POST للـ API بتاع إضافة طالب للحصة
    };
    // بيانات الحصص (مؤقتة) مع باقات طلاب كـ أرقام
    const sessions = [
        { id: 1, level: "المستوى الأول", time: "5 مساءا", startDate: "10/7 الاحد", endDate: "10/8", students: 1, packageSize: 1 },
        { id: 2, level: "المستوى الثاني", time: "6 مساءا", startDate: "10/7 الاحد", endDate: "1/8", students: 1, packageSize: 2 },
        { id: 3, level: "المستوى الثالث", time: "3 مساءا", startDate: "20/6", endDate: "20/7", students: 2, packageSize: 3 },
        { id: 4, level: "المستوى الرابع", time: "4 مساءا", startDate: "--", endDate: "--", students: 0, packageSize: 4 },
        { id: 5, level: "المستوى الخامس", time: "1 مساءا", startDate: "20/6", endDate: "20/7", students: 3, packageSize: 5 },
        { id: 6, level: "المستوى السادس", time: "2 مساءا", startDate: "--", endDate: "--", students: 0, packageSize: 2 },
        { id: 7, level: "المستوى السابع", time: "7 مساءا", startDate: "17/7 الاحد", endDate: "15/7", students: 1, packageSize: 1 },
    ];

    // تحديد الحالة حسب عدد الطلاب
    const getStatus = (students, packageSize) => {
        if (students === 0) return "فارغة";
        if (students < packageSize) return "تحت الانتظار";
        return "مكتملة";
    };

    // ألوان الحالة
    const statusColors = {
        مكتملة: "bg-green-500 text-white",
        "تحت الانتظار": "bg-yellow-500 text-white",
        فارغة: "bg-red-500 text-white",
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-6xl mx-auto">
            <div className="flex justify-between items-center p-4">
                <h3 className="text-text_color font-cairo text-basemobile md:text-lg">
                    حصص المعلم: {decodeURIComponent(teacherName)}
                </h3>

                <div className="flex gap-2">
                    {/* زرار جدول الطلاب */}
                    <Link
                        to={`/dashboard/teacher-students/${teacherId}/${encodeURIComponent(teacherName)}`}
                        className="px-4 py-2 bg-secondary hover:bg-green-700 text-white rounded-lg shadow transition"
                    >
                        جدول الطلاب
                    </Link>

                    {/* زرار الرجوع للمعلمين */}
                    <Link
                        to="/dashboard/teacher_table"
                        className="px-4 py-2 bg-[#12A4B6] hover:bg-[#0e7f8d] text-white rounded-lg shadow transition"
                    >
                        رجوع للمعلمين
                    </Link>
                </div>
            </div>

            <table className="w-full text-sm text-left rtl:text-right text-text_color dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="p-3">#</th>
                        <th className="p-3">المستوى</th>
                        <th className="p-3">الحالة</th>
                        <th className="p-3">التوقيت</th>
                        <th className="p-3">تاريخ البداية</th>
                        <th className="p-3">تاريخ الانتهاء</th>
                        <th className="p-3">عدد الطلاب</th>
                        <th className="p-3">نوع الباقة</th>
                        <th className="p-3">الإجراء</th>
                    </tr>
                </thead>
                <tbody>
                    {sessions.map((session) => {
                        const status = getStatus(session.students, session.packageSize);
                        return (
                            <tr
                                key={session.id}
                                className="odd:bg-white even:bg-blue-50 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100"
                            >
                                <td className="p-3">{session.id}</td>
                                <td className="p-3">{session.level}</td>
                                <td className="p-3">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs ${statusColors[status]}`}
                                    >
                                        {status}
                                    </span>
                                </td>
                                <td className="p-3">{session.time}</td>
                                <td className="p-3">{session.startDate}</td>
                                <td className="p-3">{session.endDate}</td>
                                <td className="p-3">
                                    {session.students}/{session.packageSize}
                                </td>
                                <td className="p-3">باقة {session.packageSize} طلاب</td>
                                <td className="p-3 flex gap-3">
                                    {/* زرار فتح المودال */}
                                    <button
                                        onClick={() => setOpenModal(true)}
                                        className="text-green-600 hover:underline text-sm"
                                    >
                                        إضافة طالب
                                    </button>

                                    {/* المودال */}
                                    <AddStudentModal
                                        isOpen={openModal}
                                        onClose={() => setOpenModal(false)}
                                        onSubmit={handleAddStudent}
                                    />
                                    <Link
                                        to={`/dashboard/edit-session/${teacherId}/${encodeURIComponent(
                                            teacherName
                                        )}/${session.id}`}
                                        className="text-[#12A4B6] hover:underline text-sm"
                                    >
                                        تعديل
                                    </Link>

                                    <button className="text-red-600 hover:underline text-sm">
                                        تفريغ
                                    </button>
                                    {/* زرار عرض الطلاب */}
                                    <Link
                                        to={`/dashboard/session-students/${teacherId}/${encodeURIComponent(teacherName)}/${session.id}`}
                                        className="text-[#0f8b99] font-medium hover:text-[#0c6f70] hover:underline transition-colors duration-200 text-sm"
                                    >
                                        عرض الطلاب
                                    </Link>


                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
