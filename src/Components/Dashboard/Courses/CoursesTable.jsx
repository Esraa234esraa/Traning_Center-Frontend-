import { useNavigate } from "react-router-dom";
import Loading from "../../Loading";
import { useGetAllCourses } from "../../../Hooks/Courses/useQueryCourses";
import { useDeleteCourse, useHideCourse, useVisibleCourse } from "../../../Hooks/Courses/useMutationCourses";
import { getImageUrl } from "../../../Utils/getImageUrl";

export default function CoursesTable() {
  const navigate = useNavigate();

  // ✅ نجيب الكورسات من الـ API
  const { data: courses, isLoading } = useGetAllCourses();

  console.log(courses);

  // ✅ الميوتيشنز
  const deleteCourseMutation = useDeleteCourse();
  const hideCourseMutation = useHideCourse();
  const visibleCourseMutation = useVisibleCourse();

  // ✅ الحذف
  const handleDelete = (id) => {
    deleteCourseMutation.mutate(id);
  };

  // ✅ إخفاء/إظهار
  const toggleVisibility = (course) => {
    if (course.isVisible) {
      hideCourseMutation.mutate(course.id);
    } else {
      visibleCourseMutation.mutate(course.id);
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={() => navigate("/dashboard/courses/add-course")}
        className="bg-background text-white px-4 py-2 rounded-lg mb-4"
      >
        إضافة دورة تدريبية
      </button>

      {isLoading ? (
        <Loading />
      ) : !courses || !courses.data || courses.data.length === 0 ? (
        <div className="text-center py-20">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="not found"
            className="w-40 mx-auto mb-4 opacity-70"
          />
          <p className="text-gray-600 text-lg">لا توجد دورات تدريبية</p>
        </div>
      ) : (
        <table className="w-full border border-gray-300 shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">الصورة</th>
              <th className="p-2 border">اسم الدورة</th>
              <th className="p-2 border">الوصف</th>
              <th className="p-2 border">الحالة</th>
              <th className="p-2 border">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {courses.data.map((course) => (
              <tr key={course.id} className="text-center">
                <td className="border p-2">
                  <img
                    src={course.filePath ? getImageUrl(course.filePath) : "/placeholder.png"}
                    alt={course.name}
                    className="w-20 h-14 object-cover rounded-md mx-auto"
                  />
                </td>
                <td className="border p-2">{course.name}</td>
                <td className="border p-2">{course.description}</td>
                <td className="border p-2">{course.isVisible ? "ظاهر" : "مخفي"}</td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => navigate(`edit-course/${course.id}`)}
                    className="text-blue-500 px-2 py-1 rounded"
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="text-red-500 px-2 py-1 rounded"
                  >
                    حذف
                  </button>
                  <button
                    onClick={() => toggleVisibility(course)}
                    className="text-yellow-500 px-2 py-1 rounded"
                  >
                    {course.isVisible ? "إخفاء" : "إظهار"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  );
}
