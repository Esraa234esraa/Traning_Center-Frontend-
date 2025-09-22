import React from "react";
import { useNavigate } from "react-router-dom";
import { useAddLevel } from "../../../Hooks/Levels/useMutationLevel";
import { useGetAllCourses } from "../../../Hooks/Courses/useQueryCourses";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function AddLevel() {
  const navigate = useNavigate();
  const { mutate: addLevel, isLoading } = useAddLevel();
  const { data: courses, isLoading: isCoursesLoading } = useGetAllCourses();

  // ✅ validation schema
  const validationSchema = Yup.object({
    levelNumber: Yup.number()
      .required("رقم المستوى مطلوب")
      .positive("يجب أن يكون رقم موجب"),
    name: Yup.string().required("اسم المستوى مطلوب"),
    courseId: Yup.string().required("اختيار الكورس مطلوب"),
  });

  // ✅ handle submit
  const handleSubmit = (values) => {
    const data = new FormData();
    data.append("LevelNumber", values.levelNumber);
    data.append("Name", values.name);
    data.append("CourseId", values.courseId);

    addLevel(data, {
      onSuccess: (res) => {
        if (res.success) {
          toast.success(res.message || "تمت الإضافة بنجاح 🎉");
          navigate("/dashboard/levels");
        } else {
          toast.error(res.message || "حدث خطأ ما");
        }
      },
      onError: () => toast.error("فشل الاتصال بالسيرفر 🚨"),
    });
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">إضافة مستوى جديد</h2>

      <Formik
        initialValues={{ levelNumber: "", name: "", courseId: "" }}
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
                className="bg-green-500 text-white px-4 py-2 rounded"
                disabled={isLoading}
              >
                {isLoading ? "جارٍ الحفظ..." : "حفظ"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
