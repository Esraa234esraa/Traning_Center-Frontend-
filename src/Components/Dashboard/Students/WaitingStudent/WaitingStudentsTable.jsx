import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import EditStudentPopup from "./EditStudentPopup";

export default function WaitingStudentsTable() {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const [students, setStudents] = useState([
        { name: "علي", phone: "01111111111", city: "السعودية, الاحساء" },
        { name: "محمد", phone: "--", city: "السعودية, الاحساء" },
        { name: "محمود", phone: "--", city: "السعودية, الاحساء" },
        { name: "حسن", phone: "--", city: "السعودية, الاحساء" },
        { name: "فاطمه", phone: "--", city: "السعودية, الاحساء" },
        { name: "احمد", phone: "--", city: "السعودية, الاحساء" },
    ]);

    const [deletePopup, setDeletePopup] = useState({ isOpen: false, index: null });
    const [editPopup, setEditPopup] = useState({ isOpen: false, index: null });

    const normalizeText = (text) =>
        text.toLowerCase().replace(/[\u064B-\u0652]/g, "").replace(/[أإآا]/g, "ا").replace(/\s+/g, " ").trim();

    const filteredStudents = students.filter(
        (student) =>
            normalizeText(student.name).includes(normalizeText(searchTerm)) ||
            normalizeText(student.phone).includes(normalizeText(searchTerm))
    );

    const handleAddToSession = (student) => {
        navigate("/dashboard/students/add-to-session", { state: { student } });
    };

    const handleDeleteStudent = (index) => {
        setStudents(students.filter((_, i) => i !== index));
        setDeletePopup({ isOpen: false, index: null });
    };

    const handleUpdateStudent = (updatedStudent) => {
        const newStudents = [...students];
        newStudents[editPopup.index] = updatedStudent;
        setStudents(newStudents);
    };

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
                    <h2 className="text-lg font-cairo text-gray-600 mb-2">لا يوجد طلاب في الوقت الحالي</h2>
                </div>
            ) : (
                <table className="w-full text-sm text-left rtl:text-right text-text_color dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="p-4">#</th>
                            <th className="px-4 py-3">اسم الطالب</th>
                            <th className="px-4 py-3">رقم الهاتف</th>
                            <th className="px-4 py-3">المدينة</th>
                            <th className="px-6 py-3">الإجراء</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.map((student, index) => (
                            <tr key={index} className="odd:bg-white even:bg-blue-50 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100">
                                <td className="p-4">{index + 1}</td>
                                <td>{student.name}</td>
                                <td>{student.phone}</td>
                                <td>{student.city}</td>
                                <td className="flex items-center px-6 py-4 space-x-2">
                                    <button
                                        onClick={() => handleAddToSession(student)}
                                        className="bg-background text-white px-3 py-1 ml-4 rounded-lg hover:bg-[#0f8392] transition"
                                    >
                                        إضافة لحصة
                                    </button>
                                    <button
                                        onClick={() => setEditPopup({ isOpen: true, index })}
                                        className="text-blue-600 hover:underline"
                                    >
                                        تعديل
                                    </button>
                                    <button
                                        onClick={() => setDeletePopup({ isOpen: true, index })}
                                        className="text-red-600 hover:underline"
                                    >
                                        حذف
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <ConfirmDeletePopup
                isOpen={deletePopup.isOpen}
                studentName={deletePopup.index !== null ? students[deletePopup.index].name : ""}
                onClose={() => setDeletePopup({ isOpen: false, index: null })}
                onConfirm={() => handleDeleteStudent(deletePopup.index)}
            />

            <EditStudentPopup
                isOpen={editPopup.isOpen}
                studentData={editPopup.index !== null ? students[editPopup.index] : null}
                onClose={() => setEditPopup({ isOpen: false, index: null })}
                onUpdateStudent={handleUpdateStudent}
            />
        </div>
    );
}
