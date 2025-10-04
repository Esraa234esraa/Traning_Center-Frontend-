import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllClasses } from "../../../Hooks/Classes/useQueryClasses";
import { useDeleteClass } from "../../../Hooks/Classes/useMutationClasses";
import Loading from "../../Loading";
import DeleteClassModal from "./DeleteClassModal";
import EditClassModal from "./EditClassModal";
import { toast } from "react-toastify";
import ClassStudentsModal from "./ClassStudentsModal";
import { useGetAllTeachers, useGetAllClassesForTeacher } from "../../../Hooks/Teacher/useQueryTeacher";

export default function ClassesTable() {
  const navigate = useNavigate();
  const { data: allClasses, isLoading, isError } = useGetAllClasses();
  const deleteMutation = useDeleteClass();
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const { data: teachersData, isLoading: isLoadingTeachers } = useGetAllTeachers();
  const teachers = teachersData || [];

  const [selectedClass, setSelectedClass] = useState(null);
  const [editClass, setEditClass] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedTeacherId, setSelectedTeacherId] = useState("all");
  const { data: teacherClasses } = useGetAllClassesForTeacher(selectedTeacherId);
  const classesToShow = selectedTeacherId === "all" ? allClasses?.data || [] : teacherClasses || [];


 const filteredClasses = useMemo(() => {
  return classesToShow.filter(cls => {
    const matchSearch = cls.bouquetName?.toLowerCase().includes(search.toLowerCase());

    const availableSeats = cls.bouquetCount - cls.currentStudentsCount;

    let matchStatus = true;
    if (statusFilter === "Completed") matchStatus = availableSeats === 0;
    else if (statusFilter === "Active") matchStatus = availableSeats === cls.bouquetCount;
    else if (statusFilter === "Cancelled") matchStatus = availableSeats < cls.bouquetCount && availableSeats > 0;

    return matchSearch && matchStatus;
  });
}, [classesToShow, search, statusFilter]);


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
            className="border w-[30%] p-2 rounded"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border w-[30%] p-2 rounded"
          >
            <option value="all">الكل</option>
            <option value="Completed">مكتملة</option>
            <option value="Cancelled">انتظار</option>
            <option value="Active">فارغة</option>
          </select>

          <select
            value={selectedTeacherId}
            onChange={(e) => setSelectedTeacherId(e.target.value)}
            className="border w-[30%] p-2 rounded"
          >
            <option value="all">كل المعلمين</option>
            {teachers.map((t) => (
              <option key={t.id} value={t.userId}>
                {t.fullName}
              </option>
            ))}
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
                  <td className="border p-2 text-center">
                    {(() => {
                      const availableSeats = cls.bouquetCount - cls.currentStudentsCount;

                      // نحدد الحالة حسب عدد الأماكن
                      let statusText = "";
                      let statusColor = "";

                      if (availableSeats === 0) {
                        statusText = "مكتملة";
                        statusColor = "bg-red-100 text-red-700 border border-red-300";
                      } else if (availableSeats < cls.bouquetCount && availableSeats > 0) {
                        statusText = `متوفر ${availableSeats} مكان`;
                        statusColor = "bg-yellow-100 text-yellow-700 border border-yellow-300";
                      } else if (availableSeats === cls.bouquetCount) {
                        statusText = "فارغة (كل الأماكن متاحة)";
                        statusColor = "bg-green-100 text-green-700 border border-green-300";
                      }

                      return (
                        <span
                          className={`inline-block px-3 py-1 rounded-full font-medium text-sm transition-all duration-200 ${statusColor}`}
                        >
                          {statusText}
                        </span>
                      );
                    })()}
                  </td>
                  <td className="border p-2 flex items-center justify-center gap-2">
                    <button
                      onClick={() => setEditClass(cls)}
                      className="btn-soft btn-blue"
                    >
                      تعديل
                    </button>

                    <button
                      onClick={() => setSelectedClass(cls)}
                      className="btn-soft btn-red"                    >
                      حذف
                    </button>

                    <button
                      onClick={() => {
                        if (cls.id) {
                          setSelectedClassId(cls.id);
                          setIsClassModalOpen(true);
                        } else {
                          toast.info("لم يتم العثور على بيانات هذه الحصة");
                        }
                      }}
                      className="px-3 py-1.5 rounded-lg bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 transition-all duration-200"
                    >
                      عرض الطلاب
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
      <ClassStudentsModal
        isOpen={isClassModalOpen}
        onClose={() => setIsClassModalOpen(false)}
        classId={selectedClassId}
      />

      {/* بوب أب التعديل */}
      {editClass && (
        <EditClassModal cls={editClass} onClose={() => setEditClass(null)} />
      )}
    </div>
  );
}


