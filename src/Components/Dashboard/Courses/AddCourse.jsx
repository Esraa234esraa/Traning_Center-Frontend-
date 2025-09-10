import { useNavigate } from "react-router-dom";
import { Upload } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";

const validationSchema = Yup.object({
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


export default function AddCourse() {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  return (
    <div className="p-6 max-w-2xl md:mt-14 mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-teal-700">
        إضافة دورة تدريبية
      </h2>

      <Formik
        initialValues={{ name: "", description: "", image: null }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values); // هنا ممكن تبعتيه للـ API
          navigate("/dashboard/courses");
        }}
      >
        {({ setFieldValue, values }) => (
          <Form className="space-y-4">
            {/* اسم الدورة */}
            <div>
              <label className="block mb-2">اسم الدورة التدريبية</label>
              <Field
                name="name"
                type="text"
                className="w-full border rounded p-2"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* وصف الدورة */}
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
                className="text-red-500 text-sm"
              />
            </div>

            {/* رفع صورة */}
            <div>
              <label className="block mb-2">رفع صورة</label>

              {/* Input مخفي */}
              <input
                id="fileUpload"
                type="file"
                accept="image/png, image/jpeg"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFieldValue("image", file);
                  if (file) {
                    setPreview(URL.createObjectURL(file));
                  }
                }}
              />

              {/* أيقونة للرفع */}
              <label
                htmlFor="fileUpload"
                className="flex flex-col items-center justify-center w-40 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-teal-600 transition"
              >
                <Upload className="w-8 h-8 text-gray-500 mb-2" />
                <span className="text-sm text-gray-500">
                  اضغط لرفع صورة
                </span>
              </label>

              {/* رسالة خطأ */}
              <ErrorMessage
                name="image"
                component="div"
                className="text-red-500 text-sm mt-2"
              />

              {/* معاينة الصورة */}
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

            {/* زر الإضافة */}
            <button
              type="submit"
              className="bg-background text-white px-4 py-2 rounded-lg"
            >
              إضافة
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard/courses")}
              className="bg-gray-400 text-white px-4 py-2 rounded-lg ml-2 mr-8"
            >
              إلغاء
            </button>

          </Form>
        )}
      </Formik>
    </div>
  );
}
