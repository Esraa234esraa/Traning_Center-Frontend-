import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllBouquets } from "../../../Hooks/Bouquets/useQueryBouquet";
import Loading from "../../Loading";
import DeleteBouquetModal from "./DeleteBouquetModal";

export default function BouquetsTable() {
    const navigate = useNavigate();
    const { data, isLoading, isError } = useGetAllBouquets();

    // 🔹 البحث والفلترة
    const [search, setSearch] = useState("");
    const [filterCourse, setFilterCourse] = useState("");
    const [filterLevel, setFilterLevel] = useState("");
    const filteredBouquets = useMemo(() => {
        return data.data.filter((b) => {
            const matchSearch = b.bouquetName
                .toLowerCase()
                .includes(search.toLowerCase());
            const matchCourse = filterCourse ? b.courseName === filterCourse : true;
            const matchLevel = filterLevel ? b.levelName === filterLevel : true;
            return matchSearch && matchCourse && matchLevel;
        });
    }, [data, search, filterCourse, filterLevel]);

    // 🔹 حالة البوب أب
    const [selectedBouquet, setSelectedBouquet] = useState(null);

    if (isLoading) return <Loading />;
    if (isError) return <p>حدث خطأ أثناء جلب البيانات</p>;
    if (!data?.success) return <p>{data?.message || "لا توجد باقات"}</p>;

    // 🔹 تطبيق البحث والفلترة

    return (
        <div className="p-6">
            {/* 🔹 العنوان وزرار إضافة */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">📦 جدول الباقات</h2>
                <button
                    onClick={() => navigate("/dashboard/bouquets/add-bouquet")}
                    className="bg-primary text-white px-4 py-2 rounded-lg"
                >
                     إضافة باقة
                </button>
            </div>

            {/* 🔹 البحث والفلترة */}
            <div className="flex flex-wrap gap-3 mb-4">
                <input
                    type="text"
                    placeholder="🔍 ابحث باسم الباقة..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border p-2 rounded w-64"
                />

                <select
                    value={filterCourse}
                    onChange={(e) => setFilterCourse(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="">كل الكورسات</option>
                    {[...new Set(data.data.map((b) => b.courseName))].map((course) => (
                        <option key={course} value={course}>
                            {course}
                        </option>
                    ))}
                </select>

                <select
                    value={filterLevel}
                    onChange={(e) => setFilterLevel(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="">كل المستويات</option>
                    {[...new Set(data.data.map((b) => b.levelName))].map((level) => (
                        <option key={level} value={level}>
                            {level}
                        </option>
                    ))}
                </select>
            </div>

            {/* 🔹 الجدول */}
            <table className="w-full border border-gray-300 rounded-lg">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 border">#</th>
                        <th className="p-2 border">اسم الباقة</th>
                        <th className="p-2 border">الكورس</th>
                        <th className="p-2 border">المستوى</th>
                        <th className="p-2 border">عدد الطلاب</th>
                        <th className="p-2 border">السعر</th>
                        <th className="p-2 border">إجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBouquets.length > 0 ? (
                        filteredBouquets.map((b, index) => (
                            <tr key={b.id} className="text-center">
                                <td className="border p-2">{index + 1}</td>
                                <td className="border p-2">{b.bouquetName}</td>
                                <td className="border p-2">{b.courseName}</td>
                                <td className="border p-2">
                                    {b.levelName} ({b.levelNumber})
                                </td>
                                <td className="border p-2">{b.studentsPackageCount}</td>
                                <td className="border p-2">{b.money} جنيه</td>
                                <td className="border p-2 space-x-2">
                                    <button
                                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                                        onClick={() => navigate(`/dashboard/bouquets/edit-bouquet/${b.id}`)}
                                    >
                                        تعديل
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                        onClick={() => setSelectedBouquet(b)}
                                    >
                                        حذف
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center p-4 text-gray-500">
                                لا توجد باقات مطابقة 🔍
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* 🔹 بوب أب الحذف */}
            {selectedBouquet && (
                <DeleteBouquetModal
                    bouquet={selectedBouquet}
                    onClose={() => setSelectedBouquet(null)}
                />
            )}
        </div>
    );
}
