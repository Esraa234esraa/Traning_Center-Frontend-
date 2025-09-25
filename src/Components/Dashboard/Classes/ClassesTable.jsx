import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllClasses } from "../../../Hooks/Classes/useQueryClasses";
import { useDeleteClass } from "../../../Hooks/Classes/useMutationClasses";
import Loading from "../../Loading";
import DeleteClassModal from "./DeleteClassModal";
import EditClassModal from "./EditClassModal";

export default function ClassesTable() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetAllClasses();
  const deleteMutation = useDeleteClass();

  const [selectedClass, setSelectedClass] = useState(null);
  const [editClass, setEditClass] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const filteredClasses = useMemo(() => {
    const classesData = data?.data || [];
    return classesData.filter((cls) => {
      const matchStatus = statusFilter === "all" || cls.status === statusFilter;
      const matchSearch = cls.bouquetName
        ?.toLowerCase()
        .includes(search.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [data?.data, statusFilter, search]);

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-red-500">حدث خطأ أثناء جلب الحصص</p>;


  return (
    <div className="p-6">
      {/* العنوان + زر إضافة + فلترة */}
      <div className="flex flex-col flex-wrap justify-between items-center mb-4 gap-3">
        <div className="flex flex-wrap gap-3 items-center justify-between w-[100%]">
          <h2 className="text-xl font-bold">📚 جدول الحصص</h2>
          <button
            onClick={() => navigate("/dashboard/classes/add-classes")}
            className="bg-primary text-white px-4 py-2 rounded-lg"
          >
            إضافة حصة
          </button>
        </div>
        <div className="flex gap-3 items-center w-[100%] justify-center md:justify-start">
          <input
            type="text"
            placeholder="ابحث بالباقة..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border w-[50%] p-2 rounded"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border w-[50%] p-2 rounded"
          >
            <option value="all">الكل</option>
            <option value="Active">نشطة</option>
            <option value="Cancelled">ملغية</option>
            <option value="Completed">مكتملة</option>
          </select>

        </div>
      </div>

      {/* لو مفيش بيانات */}
      {filteredClasses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
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
          <p className="text-lg font-medium">لا توجد حصص مطابقة 🔍</p>
        </div>
      ) : (
        // الجدول
        <div className="overflow-x-auto w-full">
          <table className="min-w-[700px] border border-gray-300 rounded-lg text-center">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">#</th>
                <th className="p-2 border">الباقة</th>
                <th className="p-2 border">بداية</th>
                <th className="p-2 border">نهاية</th>
                <th className="p-2 border">الوقت</th>
                <th className="p-2 border">عدد الطلاب</th>
                <th className="p-2 border">الحالة</th>
                <th className="p-2 border">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredClasses.map((cls, index) => (
                <tr key={cls.id} className="hover:bg-gray-50">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{cls.bouquetName}</td>
                  <td className="border p-2">
                    {new Date(cls.startDate).toLocaleDateString()}
                  </td>
                  <td className="border p-2">
                    {new Date(cls.endDate).toLocaleDateString()}
                  </td>
                  <td className="border p-2">{cls.classTime}</td>
                  <td className="border p-2">{cls.currentStudentsCount}</td>
                  <td className="border p-2">{cls.status}</td>
                  <td className="border p-2 space-x-2">
                    <button
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                      onClick={() => setEditClass(cls)}
                    >
                      تعديل
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => setSelectedClass(cls)}
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

      {/* بوب أب الحذف */}
      {selectedClass && (
        <DeleteClassModal
          cls={selectedClass}
          onClose={() => setSelectedClass(null)}
          onConfirm={() =>
            deleteMutation.mutate(selectedClass.id, {
              onSuccess: () => setSelectedClass(null),
            })
          }
        />
      )}

      {/* بوب أب التعديل */}
      {editClass && (
        <EditClassModal cls={editClass} onClose={() => setEditClass(null)} />
      )}
    </div>
  );
}
