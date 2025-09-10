import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../Loading"; // ✅ استدعاء صفحة اللودينج

export default function ActivitiesTable() {
    const navigate = useNavigate();
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activityToDelete, setActivityToDelete] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            const storedActivities = JSON.parse(localStorage.getItem("activities"));

            if (storedActivities && storedActivities.length > 0) {
                setActivities(storedActivities);
            } else {
                const defaultActivities = [
                    {
                        id: 1,
                        name: "بدء كورس تحسين اضطرابات النطق واللغة",
                        description: "",
                        image: "https://via.placeholder.com/150",
                        date: new Date().toLocaleDateString("ar-EG"),
                    },
                    {
                        id: 2,
                        name: "تأسيس الطلاب في الإعراب",
                        description:
                            "تعليم قواعد الإعراب خطوة بخطوة بأسلوب مبسط يساعد الطالب على الفهم...",
                        image: "https://via.placeholder.com/150",
                        date: new Date().toLocaleDateString("ar-EG"),
                    },
                ];
                setActivities(defaultActivities);
                localStorage.setItem("activities", JSON.stringify(defaultActivities));
            }
            setLoading(false);
        }, 1000);
    }, []);

    const confirmDelete = (id) => {
        setActivityToDelete(id);
    };

    const handleDelete = () => {
        const updatedActivities = activities.filter((c) => c.id !== activityToDelete);
        setActivities(updatedActivities);
        localStorage.setItem("activities", JSON.stringify(updatedActivities));
        setActivityToDelete(null);
    };

    if (loading) {
        return <LoadingPage />; // ✅ استدعاء صفحة اللودينج بدل الشكل اليدوي
    }

    return (
        <div className="p-6">
            <button
                onClick={() => navigate("/dashboard/activities/add-activity")}
                className="bg-background text-white px-4 py-2 rounded-lg mb-4"
            >
                إضافة نشاط او خبر جديد
            </button>

            {activities.length === 0 ? (
                <div className="text-center py-20">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                        alt="not found"
                        className="w-40 mx-auto mb-4 opacity-70"
                    />
                    <p className="text-gray-600 text-lg">لا توجد اخبار او انشطة جديدة</p>
                </div>
            ) : (
                <table className="w-full border border-gray-300 shadow-md">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 border">العنوان</th>
                            <th className="p-2 border">الوصف</th>
                            <th className="p-2 border">الصورة</th>
                            <th className="p-2 border">الوقت</th>
                            <th className="p-2 border">الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activities.map((activity) => (
                            <tr key={activity.id} className="text-center">
                                <td className="border p-2">{activity.name}</td>
                                <td className="border p-2">{activity.description}</td>
                                <td className="border p-2">
                                    <img
                                        src={
                                            activity.image instanceof File
                                                ? URL.createObjectURL(activity.image) // في حالة الملف
                                                : activity.image // في حالة الرابط
                                        }
                                        alt={activity.title}
                                        className="w-20 h-20 object-cover rounded"
                                    />

                                </td>
                                <td className="border p-2">{activity.date}</td>
                                <td className="border p-2 space-x-2">
                                    <button
                                        onClick={() => navigate(`edit-activity/${activity.id}`)}
                                        className="text-blue-500 px-2 py-1 rounded"
                                    >
                                        تعديل
                                    </button>
                                    <button
                                        onClick={() => confirmDelete(activity.id)}
                                        className="text-red-500 px-2 py-1 rounded"
                                    >
                                        حذف
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {activityToDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
                        <h2 className="text-lg font-bold mb-4">تأكيد الحذف</h2>
                        <p className="text-gray-600 mb-6">
                            هل أنت متأكد أنك تريد حذف هذا النشاط؟
                        </p>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                نعم، احذف
                            </button>
                            <button
                                onClick={() => setActivityToDelete(null)}
                                className="bg-gray-300 px-4 py-2 rounded"
                            >
                                إلغاء
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
