import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateLevel } from "../../../Hooks/Levels/useMutationLevel";
import { useGetLevelById } from "../../../Hooks/Levels/useQueryLevel";
import { useGetAllCourses } from "../../../Hooks/Courses/useQueryCourses";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function EditLevel() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: levelData, isLoading: isLevelLoading } = useGetLevelById(id);
  const { data: courses, isLoading: isCoursesLoading } = useGetAllCourses();
  const { mutate: updateLevel, isLoading: isUpdating } = useUpdateLevel();

  // ✅ schema للتحقق
  const validationSchema = Yup.object({
    levelNumber: Yup.number()
      .required("رقم المستوى مطلوب")
      .positive("يجب أن يكون رقم موجب"),
    name: Yup.string().required("اسم المستوى مطلوب"),
    courseId: Yup.string().required("اختيار الكورس مطلوب"),
  });

  const handleSubmit = (values) => {
    const form = new FormData();
    form.append("LevelNumber", values.levelNumber);
    form.append("Name", values.name);
    form.append("CourseId", values.courseId);

    updateLevel(
      { id, formData: form },
      {
        onSuccess: (res) => {
          if (res.success) {
            toast.success(res.message || "تم التحديث بنجاح 🎉");
            navigate("/dashboard/levels");
          } else {
            toast.error(res.message || "حدث خطأ في التحديث");
          }
        },
        onError: () => toast.error("فشل الاتصال بالسيرفر 🚨"),
      }
    );
  };

  if (isLevelLoading) return <p className="text-center">جاري تحميل البيانات...</p>;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">✏️ تعديل المستوى</h2>

      <Formik
        enableReinitialize
        initialValues={{
          levelNumber: levelData?.data?.levelNumber || "",
          name: levelData?.data?.name || "",
          courseId: levelData?.data?.courseId || "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="space-y-4">
            {/* رقم المستوى */}
            <div>
              <Field
                type="number"
                name="levelNumber"
                placeholder="رقم المستوى"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="levelNumber"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* اسم المستوى */}
            <div>
              <Field
                type="text"
                name="name"
                placeholder="اسم المستوى"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Dropdown اختيار الكورس */}
            <div>
              <Field
                as="select"
                name="courseId"
                className="w-full border p-2 rounded"
              >
                <option value="">اختر الكورس</option>
                {isCoursesLoading ? (
                  <option disabled>جاري تحميل الكورسات...</option>
                ) : (
                  courses?.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name}
                    </option>
                  ))
                )}
              </Field>
              <ErrorMessage
                name="courseId"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* الأزرار */}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                رجوع
              </button>

              <button
                type="submit"
                className="bg-yellow-500 text-white px-4 py-2 rounded"
                disabled={isUpdating}
              >
                {isUpdating ? "جارٍ التحديث..." : "تحديث"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
