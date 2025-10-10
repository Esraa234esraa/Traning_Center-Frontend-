import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllNotes } from "../../../Hooks/Notes/useQueryNote";
import EditNoteModal from "./EditNoteModal";
import DeleteNoteModal from "./DeleteNoteModal";
import Loading from "../../Loading";
import { FaStickyNote } from "react-icons/fa";

export default function NotesTable() {
    const navigate = useNavigate();
    const { data: allnotes, isLoading, refetch } = useGetAllNotes();
    console.log("getAllNotes 2",allnotes);

    const [selectedNote, setSelectedNote] = useState(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const notes = useMemo(() => allnotes?.data?.data || [], [allnotes]);
   console.log("notes",notes);
   

    if (isLoading) return <Loading />;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-2xl font-bold text-gray-700 flex items-center gap-2">
                    <FaStickyNote className="text-primary" />
                    الملاحظات
                </h1>
                <button
                    onClick={() => navigate("add-note")}
                    className="px-4 py-2 bg-primary text-white rounded hover:bg-text_color transition"
                >
                    إضافة ملاحظة جديدة
                </button>
            </div>

            {notes.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-20 text-gray-600">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-64 mb-4 opacity-80"
                        viewBox="0 0 200 200"
                        fill="none"
                    >
                        <rect width="200" height="200" rx="20" fill="#F9FAFB" />
                        <path
                            d="M60 50C60 44.4772 64.4772 40 70 40H130C135.523 40 140 44.4772 140 50V150C140 155.523 135.523 160 130 160H70C64.4772 160 60 155.523 60 150V50Z"
                            fill="#E5E7EB"
                        />
                        <rect x="75" y="65" width="50" height="8" rx="4" fill="#D1D5DB" />
                        <rect x="75" y="85" width="40" height="8" rx="4" fill="#D1D5DB" />
                        <rect x="75" y="105" width="45" height="8" rx="4" fill="#D1D5DB" />
                        <path
                            d="M100 140C110.493 140 119 131.493 119 121C119 110.507 110.493 102 100 102C89.5066 102 81 110.507 81 121C81 131.493 89.5066 140 100 140Z"
                            fill="#F3F4F6"
                        />
                        <path
                            d="M95 120L98 123L105 116"
                            stroke="#9CA3AF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <text
                            x="100"
                            y="180"
                            textAnchor="middle"
                            fill="#9CA3AF"
                            fontSize="14"
                            fontWeight="500"
                        >
                            لا توجد ملاحظات حالياً
                        </text>
                    </svg>

                    <p className="text-lg font-medium">
                        لا توجد ملاحظات حالياً — ابدأ بإضافة ملاحظة جديدة ✨
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto bg-white rounded shadow">
                    <table className="w-full text-sm border border-gray-300">
                        <thead className="bg-gray-100 border-b border-gray-300">
                            <tr>
                                <th className="px-4 py-3 border-r">الطالب</th>
                                <th className="px-4 py-3 border-r">الوصف</th>
                                <th className="px-4 py-3 border-r text-center">تاريخ الإنشاء</th>
                                <th className="px-4 py-3 border-r text-center">الإجراءات</th>
                            </tr>
                        </thead>

                        <tbody>
                            {notes.map((note) => (
                                <tr key={note.id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-2 border-r">{note.studentName}</td>
                                    <td className="px-4 py-2 border-r">{note.description}</td>
                                    <td className="px-4 py-2 border-r text-center">
                                        {new Date(note.createAt).toLocaleDateString("ar-EG", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </td>
                                    <td className="px-4 py-2 border-r text-center flex justify-center gap-2">
                                        <button
                                            onClick={() => {
                                                setSelectedNote(note);
                                                setIsEditOpen(true);
                                            }}
                                            className="btn-blue btn-soft"
                                        >
                                            تعديل
                                        </button>

                                        <button
                                            onClick={() => {
                                                setSelectedNote(note);
                                                setIsDeleteOpen(true);
                                            }}
                                            className="btn-soft btn-red"
                                        >
                                            حذف
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            )}

            <EditNoteModal
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                noteId={selectedNote?.id}   // ✅ نمرر الـ id فقط
                refetch={refetch}
            />


            <DeleteNoteModal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                note={selectedNote}
                refetch={refetch}
            />
        </div>
    );
}
