import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetAllExternalCourses,
} from "../../../Hooks/ExternalCourses/useQueryExternalCourse";
import {
  useHideExternalCourse,
  useVisibleExternalCourse,
} from "../../../Hooks/ExternalCourses/useMutationExternalCourse";
import DeleteModal from "./DeleteExternalCourseModal";
import Loading from "../../Loading";
import { getImageUrl } from "../../../Utils/getImageUrl";
import { toast } from "react-toastify";

export default function ExternalCoursesTable() {
  const navigate = useNavigate();
  const { data, isLoading, isFetching, refetch } = useGetAllExternalCourses();

  const hideMutation = useHideExternalCourse();
  const showMutation = useVisibleExternalCourse();

  const [deleteCourse, setDeleteCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const coursesData = useMemo(() => data?.data?.data || [], [data]);

  const handleVisibility = (course) => {
    if (course.isVisible) {
      hideMutation.mutate(
        { id: course.id },
        {
          onSuccess: () => {
            refetch();
          },
        }
      );
    } else {
      showMutation.mutate(
        { id: course.id },
        {
          onSuccess: () => {
            refetch();
          },
        }
      );
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">الدورات الخارجية</h1>
        <button
          className="px-4 py-2 bg-primary text-white rounded hover:bg-text_color transition"
          onClick={() => navigate("add")}
        >
          إضافة دورة جديدة
        </button>
      </div>

      {/* ✅ عرض رسالة احترافية في حال عدم وجود بيانات */}
      {coursesData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center bg-white shadow rounded-lg">
          {/* أيقونة كتاب احترافية */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-40 h-40 text-gray-400 mb-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75V19.5M3.75 6.75A2.25 2.25 0 016 4.5h5.25v15H6a2.25 2.25 0 01-2.25-2.25V6.75zm16.5 0A2.25 2.25 0 0018 4.5h-5.25v15H18a2.25 2.25 0 002.25-2.25V6.75z"
            />
          </svg>

          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            لا توجد دورات خارجية حالياً
          </h2>
          <p className="text-gray-500 text-base max-w-md">
            لم تتم إضافة أي دورات خارجية بعد. يمكنك البدء بإضافة دورة جديدة
            لتظهر هنا وتكون متاحة للعرض.
          </p>
        
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded">
          <table className="w-full text-sm text-left rtl:text-center text-text_color border-collapse border border-gray-300">
            <thead className="bg-gray-50 border-b border-gray-300">
              <tr>
                <th className="px-6 py-3 border-r border-gray-300">الاسم</th>
                <th className="px-6 py-3 border-r border-gray-300">الوصف</th>
                <th className="px-6 py-3 border-r border-gray-300">الصورة</th>
                <th className="px-6 py-3 border-r border-gray-300">الحالة</th>
                <th className="px-6 py-3 border-r border-gray-300 text-center">
                  الإجراءات
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {coursesData.map((course) => (
                <tr key={course.id}>
                  <td className="px-6 py-4 border-r border-gray-300">
                    {course.name}
                  </td>
                  <td className="px-6 py-4 border-r border-gray-300">
                    {course.description}
                  </td>
                  <td className="px-6 py-4 border-r border-gray-300">
                    <img
                      src={
                        course.filePath
                          ? getImageUrl(course.filePath)
                          : "/placeholder.png"
                      }
                      alt={course.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                  </td>

                  <td className="px-6 py-4 border-r border-gray-300 text-center">
                    {course.isVisible ? (
                      <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                        ظاهرة
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-gray-200 text-gray-700 font-semibold">
                        مخفية
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 border-r border-gray-300 text-center flex justify-center gap-2">
                    <button
                      className="btn-soft btn-blue"
                      onClick={() => navigate(`edit/${course.id}`)}
                    >
                      تعديل
                    </button>

                    <button
                      className="btn-soft btn-red"
                      onClick={() => {
                        setDeleteCourse(course);
                        setIsModalOpen(true);
                      }}
                    >
                      حذف
                    </button>

                    <button
                      className={`btn-soft ${course.isVisible
                          ? "bg-yellow-100 text-yellow-700 border-yellow-300 hover:bg-yellow-200"
                          : "bg-green-100 text-green-700 border-green-300 hover:bg-green-200"
                        }`}
                      onClick={() => handleVisibility(course)}
                    >
                      {course.isVisible ? "إخفاء" : "إظهار"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {isFetching && (
            <p className="p-4 text-gray-500">جارٍ تحميل البيانات...</p>
          )}
        </div>
      )}

      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        course={deleteCourse}
        refetch={refetch}
      />
    </div>
  );
}
