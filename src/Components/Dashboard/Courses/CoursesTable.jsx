import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../Loading";
import { useGetAllCourses } from "../../../Hooks/Courses/useQueryCourses";
import { useDeleteCourse, useHideCourse, useVisibleCourse } from "../../../Hooks/Courses/useMutationCourses";
import { getImageUrl } from "../../../Utils/getImageUrl";
import { toast } from "react-toastify";
import { Formik, Form } from "formik";
import { useGetAllLevelsOfCourse } from "../../../Hooks/Levels/useQueryLevel";

export default function CoursesTable() {
  const navigate = useNavigate();
  const { data: courses, isLoading } = useGetAllCourses();

  const deleteCourseMutation = useDeleteCourse();
  const hideCourseMutation = useHideCourse();
  const visibleCourseMutation = useVisibleCourse();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  // مودال المستويات
  const [levelsModalOpen, setLevelsModalOpen] = useState(false);
  const [selectedCourseName, setSelectedCourseName] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const { data: levelsRes, isLoading: loadingLevels, refetch } = useGetAllLevelsOfCourse(selectedCourseId);
  const levelsData = levelsRes?.data || [];
  const handleShowLevels = (courseId, courseName) => {
    setSelectedCourseId(courseId);
    setSelectedCourseName(courseName);
    setLevelsModalOpen(true);
    refetch(); // يضمن جلب البيانات عند فتح المودال
  };
  const confirmDelete = () => {
    if (!selectedCourseId) return;
    deleteCourseMutation.mutate(selectedCourseId, {
      onSuccess: () => {
        toast.success("تم الحذف بنجاح");
        setShowDeleteModal(false);
        setSelectedCourseId(null);
      },
      onError: () => toast.error("فشل الحذف "),
    });
  };

  const toggleVisibility = (course) => {
    if (course.isVisible) {
      hideCourseMutation.mutate(course.id, {
        onSuccess: () => toast.info("تم إخفاء الدورة 👁️‍🗨️"),
      });
    } else {
      visibleCourseMutation.mutate(course.id, {
        onSuccess: () => toast.success("تم إظهار الدورة "),
      });
    }
  };



  const filteredCourses = courses?.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "all"
        ? true
        : filterStatus === "visible"
          ? course.isVisible
          : !course.isVisible;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => navigate("/dashboard/courses/add-course")}
          className="bg-background text-white px-4 py-2 rounded-lg"
        >
          إضافة دورة تدريبية
        </button>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="🔍 ابحث عن دورة..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border  px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none"
          >
            <option value="all">الكل</option>
            <option value="visible">الظاهرة</option>
            <option value="hidden">المخفية</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <Loading />
      ) : !filteredCourses || filteredCourses.length === 0 ? (
        <div className="text-center py-20">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="not found"
            className="w-40 mx-auto mb-4 opacity-70"
          />
          <p className="text-gray-600 text-lg">لا توجد دورات تدريبية</p>
        </div>
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="min-w-[700px] border border-gray-300 shadow-md">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">الصورة</th>
                <th className="p-2 border">اسم الدورة</th>
                <th className="p-2 border">الوصف</th>
                <th className="p-2 border">الحالة</th>
                <th className="p-2 border">المستويات</th>
                <th className="p-2 border">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course) => (
                <tr key={course.id} className="text-center">
                  <td className="border p-2">
                    <img
                      src={course.filePath ? getImageUrl(course.filePath) : "/placeholder.png"}
                      alt={course.name}
                      className="w-20 h-14 object-cover rounded-md mx-auto"
                    />
                  </td>
                  <td className="border p-2 min-w-[120px]">{course.name}</td>
                  <td className="border p-2 min-w-[150px]">{course.description}</td>
                  <td className="border p-2 min-w-[80px]">{course.isVisible ? "ظاهر" : "مخفي"}</td>
                  <td className="border p-2 min-w-[120px]">
                    <button
                      onClick={() => handleShowLevels(course.id, course.name)}
                      className="px-2 py-1 text-primary rounded"
                    >
                      عرض المستويات
                    </button>
                  </td>
                  <td className="border p-2 min-w-[150px] space-x-2">
                    <button
                      onClick={() => navigate(`edit-course/${course.id}`)}
                      className="text-blue-500 px-2 py-1 rounded"
                    >
                      تعديل
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCourseId(course.id);
                        setShowDeleteModal(true);
                      }}
                      className="text-red-500 px-2 py-1 rounded"
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

      {/* مودال المستويات */}
      {levelsModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto p-4">
            <h2 className="text-lg font-semibold mb-4">المستويات الخاصة بـ {selectedCourseName}</h2>
            {loadingLevels ? (
              <p>جاري التحميل...</p>
            ) : levelsData.length === 0 ? (
              <p>لا توجد مستويات لهذه الدورة</p>
            ) : (
              <ul className="list-disc pl-5 space-y-1">
                {levelsData.map((level) => (
                  <li key={level.id}>
                    {level.name} | رقم المستوى: {level.levelNumber} | الدورة: {level.courseName}
                  </li>
                ))}
              </ul>

            )}
            <button
              onClick={() => setLevelsModalOpen(false)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">تأكيد الحذف</h2>
            <p className="mb-6">هل أنت متأكد أنك تريد حذف هذه الدورة؟</p>

            <Formik
              initialValues={{ courseId: selectedCourseId }}
              enableReinitialize
              onSubmit={() => {
                deleteCourseMutation.mutate(selectedCourseId, {
                  onSuccess: () => {
                    toast.success("تم الحذف بنجاح");
                    setShowDeleteModal(false);
                    setSelectedCourseId(null);
                  },
                  onError: () => toast.error("فشل الحذف"),
                });
              }}
            >
              {({ isSubmitting }) => (
                <Form className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowDeleteModal(false)}
                    className="px-4 py-2 bg-gray-300 rounded-lg"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || deleteCourseMutation.isLoading}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg"
                  >
                    {isSubmitting || deleteCourseMutation.isLoading
                      ? "جاري الحذف..."
                      : "حذف"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
}
