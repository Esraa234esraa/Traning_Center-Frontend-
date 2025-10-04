import React, { useState, useMemo } from "react";
import ConfirmDeletePopup from "../WaitingStudent/ConfirmDeletePopup";
import EditWaitingStudentPop from "../WaitingStudent/EditWaitingStudentPop";
import { useGetAllWaitingStudents } from "../../../../Hooks/Students/NewStudents/useQueryNewStudent";
import Loading from "../../../Loading";
import EmptyImg from "../../../../assets/images/Empty.png";
import { useDeleteWaitingStudent, useUpdateWaitingStudent } from "../../../../Hooks/Students/NewStudents/useMutationNewStudent";
import { toast } from "react-toastify";

export default function WaitingStudentsTable() {
    const [searchTerm, setSearchTerm] = useState("");
    const { data: studentsData, isLoading, isError } = useGetAllWaitingStudents();

    const students = studentsData ?? [];
    const deleteMutation = useDeleteWaitingStudent();
    const updateMutation = useUpdateWaitingStudent();

    const [deletePopup, setDeletePopup] = useState({ isOpen: false, student: null });
    const [editPopup, setEditPopup] = useState({ isOpen: false, student: null });

    const normalizeText = (text) =>
        text
            .toLowerCase()
            .replace(/[\u064B-\u0652]/g, "")
            .replace(/[أإآا]/g, "ا")
            .replace(/\s+/g, " ")
            .trim();

    // ✅ استخدام useMemo لتخزين الطلاب بعد الفلترة
    const filteredStudents = useMemo(() => {
        return students.filter((student) => {
            if (!searchTerm.trim()) return true;
            return (
                normalizeText(student.studentName).includes(normalizeText(searchTerm)) ||
                normalizeText(student.phoneNumber).includes(normalizeText(searchTerm))
            );
        });
    }, [students, searchTerm]);

    if (isLoading) return <Loading />;
    if (isError) return <p className="text-center py-6 text-red-500">حدث خطأ أثناء جلب البيانات</p>;

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-5xl mx-auto">
            <div className="flex justify-between items-center p-4">
                <h3 className="text-text_color font-cairo text-basemobile md:text-lg">الطلاب في الانتظار</h3>
            </div>

            <div className="p-4 bg-white dark:bg-gray-800">
                <input
                    type="text"
                    placeholder="🔍 ابحث عن الطالب بالاسم أو رقم الهاتف"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:text-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {filteredStudents.length === 0 ? (
                <div className="text-center py-12">
                    <img src={EmptyImg} alt="لا يوجد طلاب" className="mx-auto mb-4 w-40 h-40 object-contain" />
                    <h2 className="text-lg font-cairo text-gray-600 mb-2">لا يوجد طلاب في الوقت الحالي</h2>
                    <p className="text-gray-500">سوف يظهر هنا جدول للطلاب الذين قاموا بزيارة للمركز التدريبي</p>
                </div>
            ) : (
                <table className="w-full text-sm text-left rtl:text-center text-text_color dark:text-gray-400 border-collapse border border-gray-300">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-500 dark:bg-gray-700 dark:text-gray-400 border-b border-gray-300">
                        <tr className="bg-blue-100 dark:bg-blue-800 text-gray-800 dark:text-white border-b border-gray-300">
                            <th className="p-4 border-r border-gray-300">#</th>
                            <th className="px-4 py-3 border-r border-gray-300">اسم الطالب</th>
                            <th className="px-4 py-3 border-r border-gray-300">رقم الهاتف</th>
                            <th className="px-4 py-3 border-r border-gray-300">المدينة</th>
                            <th className="px-6 py-3 border-r border-gray-300">الإجراء</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.map((student, index) => (
                            <tr
                                key={student.id || index}
                                className="odd:bg-white even:bg-blue-50 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100"
                            >
                                <td className="p-4 border-r border-gray-300">{index + 1}</td>
                                <td className="border-r border-gray-300">{student.studentName}</td>
                                <td className="border-r border-gray-300">{student.phoneNumber}</td>
                                <td className="border-r border-gray-300">{student.city}</td>
                                <td className="flex items-center px-6 py-4 gap-4 justify-center border-r border-gray-300">
                                    <button
                                        onClick={() => setEditPopup({ isOpen: true, student })}
                      className="btn-soft btn-blue"
                                    >
                                        تعديل
                                    </button>
                                    <button
                                        onClick={() => setDeletePopup({ isOpen: true, student })}
                      className="btn-soft btn-red"                    >
                                    
                                        حذف
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

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

            {editPopup.isOpen && (
                <EditWaitingStudentPop
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
        </div>
    );
}
