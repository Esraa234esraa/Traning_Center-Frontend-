import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllBouquets } from "../../../Hooks/Bouquets/useQueryBouquet";
import Loading from "../../Loading";
import DeleteBouquetModal from "./DeleteBouquetModal";
import { toast } from "react-toastify";

export default function BouquetsTable() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetAllBouquets();

  // 🔹 البحث والفلترة
  const [search, setSearch] = useState("");
  const [filterCourse, setFilterCourse] = useState("");
  const [filterLevel, setFilterLevel] = useState("");
  const [selectedBouquetClasses, setSelectedBouquetClasses] = useState([]);
  const [showClassesModal, setShowClassesModal] = useState(false);
  const [currentBouquetName, setCurrentBouquetName] = useState("");

  const bouquets = data || [];
  const filteredBouquets = useMemo(() => {
    return bouquets.filter((b) => {
      const matchSearch = b.bouquetName
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCourse = filterCourse ? b.courseName === filterCourse : true;
      const matchLevel = filterLevel ? b.levelName === filterLevel : true;
      return matchSearch && matchCourse && matchLevel;
    });
  }, [bouquets, search, filterCourse, filterLevel]);
  const handleShowClasses = async (bouquetId, bouquetName) => {
    try {
      setCurrentBouquetName(bouquetName);
      const res = await fetch(`http://traning-center.runasp.net/api/Classes/AllClassesOfBouquet?bouquetId=${bouquetId}`);
      const data = await res.json();
      if (data.success && data.data) {
        setSelectedBouquetClasses(data.data);
      } else {
        setSelectedBouquetClasses([]);
        toast(data.message || "لا توجد حصص لهذه الباقة");
      }
      setShowClassesModal(true);
    } catch (err) {
      console.error(err);
      toast("حدث خطأ أثناء جلب الحصص");
    }
  };
  // 🔹 حالة البوب أب
  const [selectedBouquet, setSelectedBouquet] = useState(null);

  if (isLoading) return <Loading />;
  if (isError) return <p>حدث خطأ أثناء جلب البيانات</p>;

  if (!data || data.length === 0) return <p>لا توجد باقات</p>;

  return (
    <div className="p-6">
      {/* 🔹 العنوان وزر إضافة */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold"> جدول الباقات</h2>
        <button
          onClick={() => navigate("/dashboard/bouquets/add-bouquet")}
          className="bg-primary text-white px-4 py-2 rounded-lg"
        >
          إضافة باقة
        </button>
      </div>

      {/* 🔹 البحث والفلترة (دائمًا ظاهرين) */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder=" ابحث باسم الباقة..."
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
          {[...new Set(bouquets.map((b) => b.courseName))].map((course) => (
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
          {[...new Set(bouquets.map((b) => b.levelName))].map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}

        </select>
      </div>

      {/* 🔹 لو فيه باقات */}
      {filteredBouquets.length > 0 ? (
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
              <th className="p-2 border">الحصص</th>

            </tr>
          </thead>
          <tbody>
            {filteredBouquets.map((b, index) => (
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
                    onClick={() =>
                      navigate(`/dashboard/bouquets/edit-bouquet/${b.id}`)
                    }
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
                    className="text-text_color  px-2 py-1 rounded"
                    onClick={() => handleShowClasses(b.id, b.bouquetName)}
                  >
                    عرض الحصص
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        // 🔹 SVG لو مفيش بيانات
        <div className="flex flex-col items-center justify-center py-10 text-gray-500">
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
      )}
      {showClassesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 max-h-[80vh] overflow-auto">
            <h2 className="text-lg font-bold mb-4">حصص الباقة: {currentBouquetName}</h2>
            {selectedBouquetClasses.length > 0 ? (
              <table className="w-full border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">#</th>
                    <th className="border p-2">تاريخ البداية</th>
                    <th className="border p-2">تاريخ النهاية</th>
                    <th className="border p-2">وقت الحصة</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedBouquetClasses.map((cls, index) => (
                    <tr key={cls.id} className="text-center">
                      <td className="border p-2">{index + 1}</td>
                      <td className="border p-2">{cls.startDate.split("T")[0]}</td>
                      <td className="border p-2">{cls.endDate.split("T")[0]}</td>
                      <td className="border p-2">{cls.classTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-gray-500">لا توجد حصص لهذه الباقة</p>
            )}

            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-400 text-white px-3 py-1 rounded"
                onClick={() => setShowClassesModal(false)}
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔹 بوب أب الحذف */}
      {selectedBouquet && (
        <DeleteBouquetModal
          bouquetId={selectedBouquet.id}
          bouquetName={selectedBouquet.bouquetName}
          onClose={() => setSelectedBouquet(null)}
        />

      )}
    </div>
  );
}
