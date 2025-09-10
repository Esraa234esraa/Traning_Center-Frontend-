import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Upload } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// سكيمة التحقق
const CourseSchema = Yup.object({
  name: Yup.string()
    .required("اسم الدورة مطلوب")
    .min(3, "الاسم يجب ألا يقل عن 3 أحرف")
    .max(100, "الاسم يجب ألا يزيد عن 100 حرف"),

  description: Yup.string()
    .required("الوصف مطلوب")
    .test(
      "max-words",
      "الوصف يجب ألا يزيد عن 100 كلمة",
      (value) => {
        if (!value) return true;
        return value.trim().split(/\s+/).length <= 100;
      }
    ),

  image: Yup.mixed()
    .required("الصورة مطلوبة")
    .test(
      "fileType",
      "الملف يجب أن يكون صورة JPG أو PNG",
      (value) => {
        if (!value) return false;
        const allowedTypes = ["image/jpeg", "image/png"];
        return allowedTypes.includes(value.type);
      }
    )
    .test(
      "fileSize",
      "حجم الصورة يجب ألا يزيد عن 2MB",
      (value) => {
        if (!value) return false;
        return value.size <= 2 * 1024 * 1024; // 2 ميجا
      }
    ),
});
export default function EditCourse() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [initialCourse, setInitialCourse] = useState(null);
  const [preview, setPreview] = useState(null);

  // جلب بيانات الكورس من localStorage
  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem("courses")) || [];
    const currentCourse = storedCourses.find((c) => c.id === parseInt(id));
    if (currentCourse) {
      setInitialCourse(currentCourse);
      setPreview(currentCourse.image || null);
    }
  }, [id]);

  if (!initialCourse) {
    return <div className="text-center py-20">
          <div className="animate-spin h-10 w-10 border-4 border-teal-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل البيانات...</p>
        </div>;
  }

  return (
    <div className="p-6 max-w-2xl md:mt-14 mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-teal-700">
        تعديل الدورة التدريبية
      </h2>

      <Formik
        initialValues={{
          name: initialCourse.name,
          description: initialCourse.description,
          image: initialCourse.image,
        }}
        validationSchema={CourseSchema}
        onSubmit={(values) => {
          const storedCourses = JSON.parse(localStorage.getItem("courses")) || [];
          const updatedCourses = storedCourses.map((c) =>
            c.id === parseInt(id) ? { ...c, ...values } : c
          );
          localStorage.setItem("courses", JSON.stringify(updatedCourses));
          navigate("/dashboard/courses");
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
              <label className="block mb-2">رفع صورة</label>
              <input
                id="fileUpload"
                type="file"
                accept="image/png, image/jpeg"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    if (
                      file.type === "image/jpeg" ||
                      file.type === "image/png"
                    ) {
                      setFieldValue("image", file);
                      setPreview(URL.createObjectURL(file));
                    } else {
                      alert("الملف يجب أن يكون صورة بصيغة JPG أو PNG فقط");
                      e.target.value = null;
                    }
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
                    src={
                      typeof preview === "string"
                        ? preview
                        : URL.createObjectURL(preview)
                    }
                    alt="preview"
                    className="w-40 h-32 object-cover rounded-lg border"
                  />
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-background text-white px-4 py-2 rounded-lg"
              >
                حفظ التعديلات
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
