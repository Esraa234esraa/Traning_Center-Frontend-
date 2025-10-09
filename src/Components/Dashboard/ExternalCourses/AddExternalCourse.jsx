import React, { useState } from "react";
import { useAddExternalCourse } from "../../../Hooks/ExternalCourses/useMutationExternalCourse";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export default function AddExternalCourse() {
  const addMutation = useAddExternalCourse();
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    description: "",
    image: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("الاسم مطلوب"),
    description: Yup.string().required("الوصف مطلوب"),
    image: Yup.mixed().required("الصورة مطلوبة"),
  });

  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    setFieldValue("image", file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const fd = new FormData();
    fd.append("Name", values.name);
    fd.append("Description", values.description);
    if (values.image) fd.append("Image", values.image);

    addMutation.mutate(fd, {
      onSuccess: () => {
        resetForm();   // إعادة تهيئة الفورم
        setPreview(null);
        navigate("/dashboard/external-courses/")
      },
      onSettled: () => setSubmitting(false),
    });
  };

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">إضافة دورة جديدة</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <Field
                type="text"
                name="name"
                placeholder="الاسم"
                className="w-full border px-3 py-2 rounded"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <Field
                as="textarea"
                name="description"
                placeholder="الوصف"
                className="w-full border px-3 py-2 rounded"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, setFieldValue)}
                className="w-full"
              />
              <ErrorMessage
                name="image"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {preview && (
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-1">معاينة الصورة:</p>
                <img
                  src={preview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded"
                />
              </div>
            )}

            <div className="flex gap-2 mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-primary text-white rounded"
              >
                {isSubmitting ? "جاري الحفظ..." : "حفظ"}
              </button>
              <button
                type="button"
                onClick={() => {
                  navigate("/dashboard/external-courses")
                  setPreview(null);
                }}
                className="px-4 py-2 bg-gray-300 rounded"
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
