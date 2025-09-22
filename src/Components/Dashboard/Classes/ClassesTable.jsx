import React, { useState } from "react";
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
  const [statusFilter, setStatusFilter] = useState("all"); // فلتر الحالة

  if (isLoading) return <Loading />;
  if (isError) return <p>حدث خطأ أثناء جلب الحصص</p>;
  if (!data?.success) return <p>{data?.message || "لا توجد حصص"}</p>;

  // ✅ فلترة حسب الحالة
  const filteredClasses =
    statusFilter === "all"
      ? data.data
      : data.data.filter((cls) => cls.status === statusFilter);

  return (
    <div className="p-6">
      {/* 🔹 العنوان وزر إضافة */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">📚 جدول الحصص</h2>
        <div className="flex items-center space-x-3">
          {/* 🔹 فلترة */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="all">الكل</option>
            <option value="Active">نشطة</option>
            <option value="Cancelled">ملغية</option>
            <option value="Completed">مكتملة</option>
          </select>

          <button
            onClick={() => navigate("/dashboard/classes/add-classes")}
            className="bg-primary text-white px-4 py-2 rounded-lg"
          >
            إضافة حصة
          </button>
        </div>
      </div>

      {/* 🔹 الجدول */}
      <table className="w-full border border-gray-300 rounded-lg">
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
            <tr key={cls.id} className="text-center">
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

      {/* 🔹 بوب أب الحذف */}
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

      {/* 🔹 بوب أب التعديل */}
      {editClass && (
        <EditClassModal cls={editClass} onClose={() => setEditClass(null)} />
      )}
    </div>
  );
}
