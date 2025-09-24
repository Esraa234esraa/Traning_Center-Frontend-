import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllBouquets } from "../../../Hooks/Bouquets/useQueryBouquet";
import { useGetAllClassesOfBouquet } from "../../../Hooks/Classes/useQueryClasses";
import Loading from "../../Loading";
import DeleteBouquetModal from "./DeleteBouquetModal";

export default function BouquetsTable() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetAllBouquets();

  // 🔹 البحث والفلترة
  const [search, setSearch] = useState("");
  const [filterCourse, setFilterCourse] = useState("");
  const [filterLevel, setFilterLevel] = useState("");

  // 🔹 مودال الحصص
  const [currentBouquetId, setCurrentBouquetId] = useState(null);
  const [currentBouquetName, setCurrentBouquetName] = useState("");
  const [showClassesModal, setShowClassesModal] = useState(false);

  const { data: selectedBouquetClasses = [], isLoading: isClassesLoading, isError: isClassesError, refetch } =
    useGetAllClassesOfBouquet(currentBouquetId, showClassesModal);
  console.log(selectedBouquetClasses);

  const handleOpenClassesModal = (bouquetId, bouquetName) => {
    setCurrentBouquetId(bouquetId);
    setCurrentBouquetName(bouquetName);
    setShowClassesModal(true);
    refetch(); // إعادة جلب الحصص عند فتح المودال
  };

  // 🔹 بوب أب الحذف
  const [selectedBouquet, setSelectedBouquet] = useState(null);

  const bouquets = data || [];
  const filteredBouquets = useMemo(() => {
    return bouquets.filter((b) => {
      const matchSearch = b.bouquetName.toLowerCase().includes(search.toLowerCase());
      const matchCourse = filterCourse ? b.courseName === filterCourse : true;
      const matchLevel = filterLevel ? b.levelName === filterLevel : true;
      return matchSearch && matchCourse && matchLevel;
    });
  }, [bouquets, search, filterCourse, filterLevel]);

  if (isLoading) return <Loading />;
  if (isError) return <p>حدث خطأ أثناء جلب البيانات</p>;
  if (!data || data.length === 0) return <p>لا توجد باقات</p>;

  return (
    <div className="p-6">
      {/* 🔹 العنوان وزر إضافة */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">جدول الباقات</h2>
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
          placeholder="ابحث باسم الباقة..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-64"
        />
        <select value={filterCourse} onChange={(e) => setFilterCourse(e.target.value)} className="border p-2 rounded">
          <option value="">كل الكورسات</option>
          {[...new Set(bouquets.map((b) => b.courseName))].map((course) => (
            <option key={course} value={course}>{course}</option>
          ))}
        </select>
        <select value={filterLevel} onChange={(e) => setFilterLevel(e.target.value)} className="border p-2 rounded">
          <option value="">كل المستويات</option>
          {[...new Set(bouquets.map((b) => b.levelName))].map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>

      {/* 🔹 الجدول */}
      <div className="overflow-x-auto w-full">
        <table className="min-w-[700px] border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">#</th>
              <th className="p-2 border min-w-[120px]">اسم الباقة</th>
              <th className="p-2 border min-w-[120px]">الكورس</th>
              <th className="p-2 border min-w-[120px]">المستوى</th>
              <th className="p-2 border min-w-[80px]">عدد الطلاب</th>
              <th className="p-2 border min-w-[80px]">السعر</th>
              <th className="p-2 border min-w-[150px]">إجراءات</th>
              <th className="p-2 border min-w-[120px]">الحصص</th>
            </tr>
          </thead>
          <tbody>
            {filteredBouquets.length > 0 ? (
              filteredBouquets.map((b, index) => (
                <tr key={b.id} className="text-center">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{b.bouquetName}</td>
                  <td className="border p-2">{b.courseName}</td>
                  <td className="border p-2">{b.levelName} ({b.levelNumber})</td>
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
                  <td className="border p-2">
                    <button
                      className="text-text_color px-2 py-1 rounded"
                      onClick={() => handleOpenClassesModal(b.id, b.bouquetName)}
                    >
                      عرض الحصص
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-10">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-20 w-20 mb-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 17v-2h6v2m-7 4h8a2 2 0 002-2v-8l-6-6-6 6v8a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-lg font-medium">لا توجد باقات مطابقة 🔍</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>

  );
}
