import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllLevels } from "../../../Hooks/Levels/useQueryLevel";
import { useDeleteLevel } from "../../../Hooks/Levels/useMutationLevel";
import { useGetBouquetsOfLevel } from "../../../Hooks/Bouquets/useQueryBouquet";
import Loading from "../../Loading";
import { toast } from "react-toastify";

export default function LevelsTable() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetAllLevels();
  const { mutate: deleteLevel } = useDeleteLevel();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedLevelId, setSelectedLevelId] = useState(null);

  // مودال الباقات
  const [classesModalOpen, setClassesModalOpen] = useState(false);
  const [selectedLevelName, setSelectedLevelName] = useState("");

  const levels = data?.data || [];
  const courses = [...new Set(levels.map((l) => l.courseName))];

  const filteredLevels = useMemo(() => {
    return levels.filter((level) => {
      const matchesSearch =
        level.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        level.levelNumber.toString().includes(searchTerm);

      const matchesCourse = selectedCourse
        ? level.courseName === selectedCourse
        : true;

      return matchesSearch && matchesCourse;
    });
  }, [levels, searchTerm, selectedCourse]);

  const confirmDelete = () => {
    if (!selectedLevelId) return;
    deleteLevel(selectedLevelId, {
      onSuccess: () => {
        toast.success("تم حذف المستوى بنجاح ");
        setShowDeleteModal(false);
        setSelectedLevelId(null);
      },
      onError: () => toast.error("فشل حذف المستوى "),
    });
  };

  // ✅ useQuery لجلب الباقات الخاصة بالمستوى
  const {
    data: bouquetsData = [],
    isLoading: loadingBouquets,
    refetch: refetchBouquets,
  } = useGetBouquetsOfLevel(selectedLevelId, {
    enabled: !!selectedLevelId && classesModalOpen, // نشغل فقط عند فتح المودال
  });

  const openClassesModal = (levelId, levelName) => {
    setSelectedLevelId(levelId);
    setSelectedLevelName(levelName);
    setClassesModalOpen(true);
    refetchBouquets(); // نعيد جلب البيانات عند فتح المودال
  };

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-red-500">حدث خطأ</p>;

  return (
    <div className="p-6">
      {/* عنوان + زر إضافة مستوى */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">قائمة المستويات</h2>
        <button
          onClick={() => navigate("/dashboard/levels/addlevel")}
          className="bg-primary text-white px-4 py-2 rounded-lg"
        >
          إضافة مستوى
        </button>
      </div>

      {/* البحث والفلترة */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="ابحث بالاسم أو رقم المستوى..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-1/2"
        />
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">كل الكورسات</option>
          {courses.map((course, index) => (
            <option key={index} value={course}>
              {course}
            </option>
          ))}
        </select>
      </div>

      {/* جدول المستويات */}
      {filteredLevels.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-gray-500 text-center">لا توجد مستويات مطابقة</p>
        </div>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">#</th>
              <th className="border p-2">رقم المستوى</th>
              <th className="border p-2">الاسم</th>
              <th className="border p-2">الكورس</th>
              <th className="border p-2">الإجراءات</th>
              <th className="border p-2">الباقات</th>
            </tr>
          </thead>
          <tbody>
            {filteredLevels.map((level, index) => (
              <tr key={level.id} className="hover:bg-gray-100">
                <td className="border p-2 text-center">{index + 1}</td>
                <td className="border p-2 text-center">{level.levelNumber}</td>
                <td className="border p-2 text-center">{level.name}</td>
                <td className="border p-2 text-center">{level.courseName}</td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() =>
                      navigate(`/dashboard/levels/editlevel/${level.id}`)
                    }
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => {
                      setSelectedLevelId(level.id);
                      setShowDeleteModal(true);
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    حذف
                  </button>
                </td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => openClassesModal(level.id, level.name)}
                    className=" text-primary px-3 py-1 rounded"
                  >
                    عرض الباقات
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* مودال الباقات */}
      {classesModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto p-4">
            <h2 className="text-lg font-semibold mb-4">
              الباقات الخاصة بالمستوى {selectedLevelName}
            </h2>
            {loadingBouquets ? (
              <p>جاري التحميل...</p>
            ) : bouquetsData.length === 0 ? (
              <p>لا توجد باقات لهذا المستوى</p>
            ) : (
              <table className="w-full text-center border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-2">اسم الباقة</th>
                    <th className="border p-2">اسم الكورس</th>
                    <th className="border p-2">رقم المستوى</th>
                    <th className="border p-2">عدد الطلاب</th>
                    <th className="border p-2">السعر</th>
                  </tr>
                </thead>
                <tbody>
                  {bouquetsData.map((b) => (
                    <tr key={b.id} className="border hover:bg-gray-100">
                      <td className="border p-2">{b.bouquetName}</td>
                      <td className="border p-2">{b.courseName}</td>
                      <td className="border p-2">{b.levelNumber}</td>
                      <td className="border p-2">{b.studentsPackageCount}</td>
                      <td className="border p-2">{b.money.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <button
              onClick={() => setClassesModalOpen(false)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}

      {/* مودال الحذف */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">تأكيد الحذف</h2>
            <p className="mb-6">هل أنت متأكد أنك تريد حذف هذا المستوى؟</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                إلغاء
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



