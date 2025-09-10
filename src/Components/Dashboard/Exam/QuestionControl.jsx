import React, { useState, useRef } from "react";

export default function AdminDashboard() {
    const [questions, setQuestions] = useState([]);

    // مودال الإضافة
    const [addModal, setAddModal] = useState(false);
    const [newQuestion, setNewQuestion] = useState({
        questionText: "",
        audioUrl: "",
        options: [
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
        ],
        type: "listening",
        isVisible: true,
    });

    // تسجيل الصوت
    const [recording, setRecording] = useState(false);
    const [audioURL, setAudioURL] = useState(null);
    const mediaRecorderRef = useRef(null);
    const audioChunks = useRef([]);

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        audioChunks.current = [];

        mediaRecorderRef.current.ondataavailable = (e) => {
            audioChunks.current.push(e.data);
        };

        mediaRecorderRef.current.onstop = () => {
            const audioBlob = new Blob(audioChunks.current, { type: "audio/mp3" });
            const url = URL.createObjectURL(audioBlob);
            setAudioURL(url);
            setNewQuestion((prev) => ({ ...prev, audioUrl: url }));
        };

        mediaRecorderRef.current.start();
        setRecording(true);
    };

    const stopRecording = () => {
        mediaRecorderRef.current.stop();
        setRecording(false);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setAudioURL(url);
            setNewQuestion((prev) => ({ ...prev, audioUrl: url }));
        }
    };

    // مودال الحذف
    const [deleteModal, setDeleteModal] = useState({ open: false, id: null });

    // مودال التعديل
    const [editModal, setEditModal] = useState({ open: false, question: null });

    const addQuestion = () => {
        setQuestions([...questions, { ...newQuestion, id: Date.now() }]);
        setNewQuestion({
            questionText: "",
            audioUrl: "",
            options: [
                { text: "", isCorrect: false },
                { text: "", isCorrect: false },
                { text: "", isCorrect: false },
                { text: "", isCorrect: false },
            ],
            type: "listening",
            isVisible: true,
        });
        setAudioURL(null);
        setAddModal(false);
    };

    const handleOptionChange = (index, value) => {
        const updated = [...newQuestion.options];
        updated[index].text = value;
        setNewQuestion({ ...newQuestion, options: updated });
    };

    const deleteQuestion = () => {
        setQuestions(questions.filter((q) => q.id !== deleteModal.id));
        setDeleteModal({ open: false, id: null });
    };

    const saveEdit = () => {
        setQuestions(
            questions.map((q) =>
                q.id === editModal.question.id ? editModal.question : q
            )
        );
        setEditModal({ open: false, question: null });
    };

    const toggleVisibility = (id) => {
        setQuestions(
            questions.map((q) =>
                q.id === id ? { ...q, isVisible: !q.isVisible } : q
            )
        );
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">لوحة التحكم - الأسئلة</h2>

            {/* زر فتح مودال الإضافة */}
            <button
                className="bg-background text-white px-4 py-2 rounded mb-6"
                onClick={() => setAddModal(true)}
            >
                إضافة سؤال
            </button>

            {/* عرض الأسئلة */}
            <div>
                <h3 className="text-lg font-bold mb-2">الأسئلة الحالية</h3>
                <table className="w-full border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2">النص</th>
                            <th className="p-2">الصوت</th>
                            <th className="p-2">نوع</th>
                            <th className="p-2">خيارات</th>
                            <th className="p-2">الحالة</th>
                            <th className="p-2">إجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.map((q) => (
                            <tr key={q.id} className="border-t">
                                <td className="p-2">{q.questionText}</td>
                                <td className="p-2">
                                    {q.audioUrl ? <audio controls src={q.audioUrl} /> : "-"}
                                </td>
                                <td className="p-2">{q.type}</td>
                                <td className="p-2">
                                    {q.options.map((o, i) => (
                                        <span
                                            key={i}
                                            className={o.isCorrect ? "text-green-600 font-bold" : ""}
                                        >
                                            {o.text},{" "}
                                        </span>
                                    ))}
                                </td>
                                <td className="p-2 text-center">
                                    {q.isVisible ? (
                                        <span className="text-green-600 font-bold">ظاهر</span>
                                    ) : (
                                        <span className="text-gray-500">مخفي</span>
                                    )}
                                </td>
                                <td className="p-2 flex gap-2 justify-center">
                                    <button
                                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                                        onClick={() => setEditModal({ open: true, question: q })}
                                    >
                                        تعديل
                                    </button>
                                    <button
                                        className="bg-red-600 text-white px-2 py-1 rounded"
                                        onClick={() => setDeleteModal({ open: true, id: q.id })}
                                    >
                                        حذف
                                    </button>
                                    <button
                                        className={`${q.isVisible ? "bg-gray-500" : "bg-green-600"
                                            } text-white px-2 py-1 rounded`}
                                        onClick={() => toggleVisibility(q.id)}
                                    >
                                        {q.isVisible ? "إخفاء" : "إظهار"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* مودال الإضافة */}
            {addModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl shadow-xl w-[600px]">
                        <h3 className="text-lg font-bold mb-4">إضافة سؤال جديد</h3>
                        <input
                            type="text"
                            className="border p-2 w-full mb-2 rounded"
                            placeholder="نص السؤال"
                            value={newQuestion.questionText}
                            onChange={(e) =>
                                setNewQuestion({ ...newQuestion, questionText: e.target.value })
                            }
                        />

                        <select
                            className="border p-2 w-full mb-2 rounded"
                            value={newQuestion.type}
                            onChange={(e) =>
                                setNewQuestion({ ...newQuestion, type: e.target.value })
                            }
                        >
                            <option value="listening">استماع</option>
                            <option value="reading">قراءة</option>
                        </select>

                        {/* الصوت يظهر فقط لو Listening */}
                        {newQuestion.type === "listening" && (
                            <div className="mb-4">
                                <p className="font-bold mb-2">الصوت:</p>

                                <input type="file" accept="audio/*" onChange={handleFileUpload} />

                                <div className="flex gap-2 mt-2">
                                    <button
                                        onClick={startRecording}
                                        disabled={recording}
                                        className="bg-green-600 text-white px-3 py-1 rounded"
                                    >
                                        🎤 تسجيل
                                    </button>
                                    <button
                                        onClick={stopRecording}
                                        disabled={!recording}
                                        className="bg-red-600 text-white px-3 py-1 rounded"
                                    >
                                        ⏹️ إيقاف
                                    </button>
                                </div>

                                {audioURL && <audio controls src={audioURL} className="mt-2" />}
                            </div>
                        )}

                        {/* ٤ اختيارات */}
                        {newQuestion.options.map((opt, i) => (
                            <div key={i} className="flex gap-2 mb-2 items-center">
                                <input
                                    type="text"
                                    className="border p-2 flex-1 rounded"
                                    placeholder={`اختيار ${i + 1}`}
                                    value={opt.text}
                                    onChange={(e) => handleOptionChange(i, e.target.value)}
                                />
                                <input
                                    type="radio"
                                    name="correctOption"
                                    checked={opt.isCorrect}
                                    onChange={() => {
                                        const updated = newQuestion.options.map((o, idx) => ({
                                            ...o,
                                            isCorrect: idx === i,
                                        }));
                                        setNewQuestion({ ...newQuestion, options: updated });
                                    }}
                                />
                                <span>صح</span>
                            </div>
                        ))}

                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                                onClick={() => setAddModal(false)}
                            >
                                إلغاء
                            </button>
                            <button
                                className="bg-background text-white px-4 py-2 rounded"
                                onClick={addQuestion}
                            >
                                إضافة
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* مودال الحذف */}
            {deleteModal.open && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl shadow-xl w-96 text-center">
                        <h3 className="text-lg font-bold mb-4">تأكيد الحذف</h3>
                        <p className="mb-4">هل أنت متأكد أنك تريد حذف هذا السؤال؟</p>
                        <div className="flex justify-center gap-4">
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                                onClick={() => setDeleteModal({ open: false, id: null })}
                            >
                                إلغاء
                            </button>
                            <button
                                className="bg-red-600 text-white px-4 py-2 rounded"
                                onClick={deleteQuestion}
                            >
                                حذف
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* مودال التعديل (لسه عندك شغال) */}
            {editModal.open && editModal.question && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl shadow-xl w-[600px]">
                        <h3 className="text-lg font-bold mb-4">تعديل السؤال</h3>
                        {/* هنا تحط نفس مكونات الإضافة لكن مع editModal.question */}
                    </div>
                </div>
            )}
        </div>
    );
}
