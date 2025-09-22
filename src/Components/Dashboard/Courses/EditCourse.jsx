// src/Pages/Courses/EditCourse.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Upload } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useGetCourseById } from "../../../Hooks/Courses/useQueryCourses";
import { useUpdateCourse } from "../../../Hooks/Courses/useMutationCourses";
import { toast } from "react-toastify";
import { getImageUrl } from "../../../Utils/getImageUrl";

// ✅ سكيمة التحقق
const CourseSchema = Yup.object({
  name: Yup.string()
    .required("اسم الدورة مطلوب")
    .min(3, "الاسم يجب ألا يقل عن 3 أحرف")
    .max(100, "الاسم يجب ألا يزيد عن 100 حرف"),
  description: Yup.string()
    .required("الوصف مطلوب")
    .test("max-words", "الوصف يجب ألا يزيد عن 100 كلمة", (value) => {
      if (!value) return true;
      return value.trim().split(/\s+/).length <= 100;
    }),
  file: Yup.mixed().nullable(),
});

export default function EditCourse() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: course, isLoading, refetch } = useGetCourseById(id);
  const mutation = useUpdateCourse();
  const [preview, setPreview] = useState(null);

  // تحديث preview عند تحميل بيانات الكورس
  useEffect(() => {
    if (course?.filePath) setPreview(getImageUrl(course.filePath));
  }, [course]);

  if (isLoading || !course) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin h-10 w-10 border-4 border-teal-600 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600">جاري تحميل بيانات الدورة...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl md:mt-14 mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-teal-700">تعديل الدورة</h2>

      <Formik
        enableReinitialize
        initialValues={{
          name: course.name,
          description: course.description,
          file: null,
        }}
        validationSchema={CourseSchema}
        onSubmit={(values) => {
          const formData = new FormData();

          formData.append("Name", values.name);
          formData.append("Description", values.description);
          if (values.file) {
            formData.append("Image", values.file);
          } else {
            formData.append("Image", null); // أو حذفي السطر لو السيرفر يقبل null
          }
          for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
          }
          console.log("file:", values.file);

          mutation.mutate({ id, formData }, {
            onSuccess: () => {
              toast.success("تم تعديل الدورة بنجاح");
              refetch(); // رجوع البيانات الجديدة
              navigate("/dashboard/courses");
            },
            onError: (error) => {
              const errorMsg = error?.response?.data?.message || "حدث خطأ أثناء التعديل";
              toast.error(errorMsg);
            },
          });
        }}
      >
        {({ setFieldValue }) => (
          <Form className="space-y-4">
            <div>
              <label className="block mb-2">اسم الدورة التدريبية</label>
              <Field
                type="text"
                name="name"
                className="w-full border rounded p-2"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block mb-2">وصف الدورة التدريبية</label>
              <Field
                as="textarea"
                name="description"
                className="w-full border rounded p-2"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block mb-2">رفع صورة جديدة (اختياري)</label>
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setFieldValue("file", file);
                    setPreview(URL.createObjectURL(file));
                  }
                }}
              />
              <label
                htmlFor="fileUpload"
                className="flex flex-col items-center justify-center w-40 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-teal-600 transition"
              >
                <Upload className="w-8 h-8 text-gray-500 mb-2" />
                <span className="text-sm text-gray-500">اضغط لرفع صورة</span>
              </label>

              {preview && (
                <div className="mt-3">
                  <img
                    src={preview}
                    alt="preview"
                    className="w-40 h-32 object-cover rounded-lg border"
                  />
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={mutation.isLoading}
                className="bg-background text-white px-4 py-2 rounded-lg"
              >
                {mutation.isLoading ? "جاري الحفظ..." : "حفظ التعديلات"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/dashboard/courses")}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg"
              >
                إلغاء
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
