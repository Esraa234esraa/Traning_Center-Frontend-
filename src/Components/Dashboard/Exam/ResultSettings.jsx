import React, { useState } from "react";
import { toast } from 'react-toastify';

export default function AdminResultsSettings() {
    // المستويات (درجة من – درجة إلى – مستوى)
    const [levels, setLevels] = useState([
        { id: 1, min: 0, max: 5, label: "مبتدئ" },
        { id: 2, min: 6, max: 10, label: "متوسط" },
        { id: 3, min: 11, max: 15, label: "متقدم" },
    ]);

    const [newLevel, setNewLevel] = useState({ min: "", max: "", label: "" });

    // عدد الأسئلة في الامتحان
    const [examQuestionsCount, setExamQuestionsCount] = useState(10);

    // حالة المودال للتعديل
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editLevel, setEditLevel] = useState(null);

    const addLevel = () => {
        if (!newLevel.min || !newLevel.max || !newLevel.label) return;

        setLevels([
            ...levels,
            {
                ...newLevel,
                id: Date.now(),
                min: Number(newLevel.min),
                max: Number(newLevel.max),
            },
        ]);
        setNewLevel({ min: "", max: "", label: "" });
    };

    const deleteLevel = (id) => {
        setLevels(levels.filter((lvl) => lvl.id !== id));
    };

    const openEditModal = (level) => {
        setEditLevel({ ...level }); // ننسخ الداتا
        setEditModalOpen(true);
    };

    const saveEditLevel = () => {
        setLevels(
            levels.map((lvl) => (lvl.id === editLevel.id ? editLevel : lvl))
        );
        setEditModalOpen(false);
        setEditLevel(null);
    };

    return (
        <div className="p-6 space-y-8">
            {/* إدارة المستويات */}
            <div className="bg-white shadow rounded-xl p-4">
                <h2 className="text-xl font-bold mb-4">إدارة النتائج / المستويات</h2>

                {/* جدول المستويات */}
                <table className="w-full border mb-4">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2">من</th>
                            <th className="p-2">إلى</th>
                            <th className="p-2">المستوى</th>
                            <th className="p-2">إجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {levels.map((lvl) => (
                            <tr key={lvl.id} className="border-t">
                                <td className="p-2 text-center">{lvl.min}</td>
                                <td className="p-2 text-center">{lvl.max}</td>
                                <td className="p-2 text-center">{lvl.label}</td>
                                <td className="p-2 text-center">
                                    <button
                                        className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                                        onClick={() => openEditModal(lvl)}
                                    >
                                        تعديل
                                    </button>
                                    <button
                                        className="bg-red-600 text-white px-2 py-1 rounded"
                                        onClick={() => deleteLevel(lvl.id)}
                                    >
                                        حذف
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* إضافة مستوى جديد */}
                <div className="grid grid-cols-3 gap-2 mb-2">
                    <input
                        type="number"
                        className="border p-2 rounded"
                        placeholder="من"
                        value={newLevel.min}
                        onChange={(e) => setNewLevel({ ...newLevel, min: e.target.value })}
                    />
                    <input
                        type="number"
                        className="border p-2 rounded"
                        placeholder="إلى"
                        value={newLevel.max}
                        onChange={(e) => setNewLevel({ ...newLevel, max: e.target.value })}
                    />
                    <input
                        type="text"
                        className="border p-2 rounded"
                        placeholder="المستوى"
                        value={newLevel.label}
                        onChange={(e) =>
                            setNewLevel({ ...newLevel, label: e.target.value })
                        }
                    />
                </div>
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                    onClick={addLevel}
                >
                    إضافة مستوى
                </button>
            </div>

            {/* إعدادات الامتحان */}
            <div className="bg-white shadow rounded-xl p-4 mt-6">
                <h2 className="text-xl font-bold mb-4">إعدادات الامتحان</h2>

                <div className="flex items-center gap-4 mb-4">
                    <label className="font-medium">عدد الأسئلة في الامتحان:</label>
                    <input
                        type="number"
                        className="border p-2 rounded w-24"
                        value={examQuestionsCount}
                        onChange={(e) => setExamQuestionsCount(Number(e.target.value))}
                    />
                </div>

                <button
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    onClick={() => {
                        toast.success(` تم حفظ عدد الأسئلة: ${examQuestionsCount}`);
                        // هنا ممكن تبعتي القيمة للباك اند أو تحفظيها في state تانية
                    }}
                >
                    تأكيد التغييرات
                </button>
            </div>

            {/* المودال للتعديل */}
            {editModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow w-96">
                        <h3 className="text-lg font-bold mb-4">تعديل المستوى</h3>

                        <input
                            type="number"
                            className="border p-2 w-full mb-2 rounded"
                            placeholder="من"
                            value={editLevel.min}
                            onChange={(e) =>
                                setEditLevel({ ...editLevel, min: Number(e.target.value) })
                            }
                        />
                        <input
                            type="number"
                            className="border p-2 w-full mb-2 rounded"
                            placeholder="إلى"
                            value={editLevel.max}
                            onChange={(e) =>
                                setEditLevel({ ...editLevel, max: Number(e.target.value) })
                            }
                        />
                        <input
                            type="text"
                            className="border p-2 w-full mb-2 rounded"
                            placeholder="المستوى"
                            value={editLevel.label}
                            onChange={(e) =>
                                setEditLevel({ ...editLevel, label: e.target.value })
                            }
                        />

                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                className="bg-gray-400 text-white px-4 py-2 rounded"
                                onClick={() => setEditModalOpen(false)}
                            >
                                إلغاء
                            </button>
                            <button
                                className="bg-green-600 text-white px-4 py-2 rounded"
                                onClick={saveEditLevel}
                            >
                                حفظ التعديلات
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
