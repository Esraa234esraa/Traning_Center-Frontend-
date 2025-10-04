import React, { useState, useMemo,useEffect } from "react";
import { useGetAllTeachers } from "../../../Hooks/Teacher/useQueryTeacher";
import { useDeleteTeacher } from "../../../Hooks/Teacher/useMutationTeacher";
import DeleteModal from "./DeleteModal";
import { useNavigate } from "react-router-dom";
import Loading from "../../Loading";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function TeachersTable() {
  const { data: teachers = [], isLoading } = useGetAllTeachers();
  const deleteTeacherMutation = useDeleteTeacher();
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  console.log(teachers);

  // 🔹 البحث والفلترة
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [filterCourse, setFilterCourse] = useState("");

  // 🔹 Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    deleteTeacherMutation.mutate(deleteId, {
      onSuccess: () => {
        toast.success("تم حذف المعلم بنجاح");
        setShowModal(false);
      },
      onError: (error) => {
        const errorMsg = error?.response?.data?.message || "حدث خطأ أثناء الحذف";
        toast.error(errorMsg);
      },
    });
  };

  // 🔹 فلترة المعلمين حسب البحث والمدينة والدورة
  const filteredTeachers = useMemo(() => {
    if (!teachers) return [];
    return teachers.filter((teacher) => {
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        teacher.fullName.toLowerCase().includes(term) ||
        teacher.email.toLowerCase().includes(term) ||
        teacher.courseName?.toLowerCase().includes(term);

      const matchesCity = filterCity ? teacher.city === filterCity : true;
      const matchesCourse = filterCourse ? teacher.courseName === filterCourse : true;

      return matchesSearch && matchesCity && matchesCourse;
    });
  }, [teachers, searchTerm, filterCity, filterCourse]);

  const currentTeachers = useMemo(() => {
    if (!filteredTeachers) return [];  // ✅ إضافة افتراضية
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredTeachers.slice(start, end);
  }, [filteredTeachers, currentPage]);

  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

if (isLoading) return <Loading />;



// // 🔹 قيم المدن والدورات للفلتر
const cities = teachers ? Array.from(new Set(teachers.map((t) => t.city))).filter(Boolean) : [];
const courses = teachers ? Array.from(new Set(teachers.map((t) => t.courseName))).filter(Boolean) : [];

return (
  <div className="p-6 bg-white rounded shadow max-w-6xl mx-auto">
    <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
      <h2 className="text-xl font-bold">قائمة المعلمين</h2>

      <div className="flex gap-2">
        <button
          onClick={() => navigate("/dashboard/add-teacher")}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          إضافة معلم جديد
        </button>
        <button
          onClick={() => navigate("/dashboard/add-teacherToClass")}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-teal-600"
        >
          إضافة معلم لحصة
        </button>
      </div>
    </div>

    {/* 🔹 البحث والفلترة */}
    <div className="flex flex-col md:flex-row gap-2 mb-4">
      <input
        type="text"
        placeholder="ابحث بالاسم أو البريد أو الدورة..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        className="w-full md:w-1/3 border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none focus:border-teal-500"
      />

      <select
        value={filterCity}
        onChange={(e) => {
          setFilterCity(e.target.value);
          setCurrentPage(1);
        }}
        className="w-full md:w-1/6 border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none focus:border-teal-500"
      >
        <option value="">المدينة</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      <select
        value={filterCourse}
        onChange={(e) => {
          setFilterCourse(e.target.value);
          setCurrentPage(1);
        }}
        className="w-full md:w-1/6 border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none focus:border-teal-500"
      >
        <option value="">الدورة</option>
        {courses.map((course) => (
          <option key={course} value={course}>
            {course}
          </option>
        ))}
      </select>
    </div>

    {/* ✅ الجدول مع Scroll أفقي للشاشات الصغيرة */}
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 whitespace-nowrap">الاسم</th>
            <th className="border p-2 whitespace-nowrap">البريد</th>
            <th className="border p-2 whitespace-nowrap">الهاتف</th>
            <th className="border p-2 whitespace-nowrap">المدينة</th>
            <th className="border p-2 whitespace-nowrap">الدورة</th>
            <th className="border p-2 whitespace-nowrap">الحصص المتوفرة</th>

            <th className="border p-2 whitespace-nowrap">إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {currentTeachers?.length > 0 ? (
            currentTeachers.map((teacher) => (
              <tr key={teacher.userId} className="text-center">
                <td className="border p-2 text-blue-600 hover:underline cursor-pointer">
                  <Link
                    to={`/dashboard/teacher-sessions/${teacher.userId}/${encodeURIComponent(
                      teacher.fullName
                    )}`}
                  >
                    {teacher.fullName}
                  </Link>
                </td>
                <td className="border p-2">{teacher.email}</td>
                <td className="border p-2">{teacher.phoneNumber}</td>
                <td className="border p-2">{teacher.city}</td>
                <td className="border p-2">{teacher.courseName}</td>
                <td className="border p-2">
                  {teacher.availableClasses === 0 ? (
                    <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-red-100 text-red-700 border border-red-300">
                      غير متوفر (0)
                    </span>
                  ) : teacher.availableClasses < 7 ? (
                    <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-yellow-100 text-yellow-700 border border-yellow-300">
                      متوفر {teacher.availableClasses} حصص
                    </span>
                  ) : (
                    <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-700 border border-green-300">
                      متوفر {teacher.availableClasses} حصص
                    </span>
                  )}
                </td>


                <td className="border p-2 flex justify-center gap-2 flex-wrap">
                  <button
                    onClick={() =>
                      navigate(`/dashboard/edit-teacher/${teacher.id}`)
                    }
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => handleDelete(teacher.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center p-4 text-gray-500">
                لا توجد نتائج
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    <div className="flex items-center justify-center gap-2 mt-4">
      {/* زر السابق */}
      {currentPage > 1 && (
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
        >
          السابق
        </button>
      )}

      {/* رقم الصفحة */}
      <span className="px-3 py-2 bg-gray-100 rounded-lg font-semibold">
        الصفحة {currentPage} من {totalPages}
      </span>

      {/* زر التالي */}
      {currentPage < totalPages && (
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
        >
          التالي
        </button>
      )}
    </div>


    {showModal && (
      <DeleteModal
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
        message="هل أنت متأكد من حذف هذا المعلم؟"
      />
    )}
  </div>

);
}
