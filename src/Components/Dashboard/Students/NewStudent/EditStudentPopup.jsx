import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// سكيمة التحقق من Yup
const validationSchema = Yup.object({
  name: Yup.string().required("الرجاء إدخال اسم الطالب"),
  gender: Yup.string().required("الرجاء اختيار الجنس"),
  day: Yup.string().required("الرجاء إدخال اليوم"),
  city: Yup.string().required("الرجاء إدخال المدينة"),
  phone: Yup.string().required("الرجاء إدخال رقم الهاتف"),
  time: Yup.string().required("الرجاء إدخال الوقت"),
});

export default function EditStudentPopup({ isOpen, onClose, studentData, onUpdateStudent }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold"
        >
          &times;
        </button>
        <h2 className="text-lg font-cairo mb-4 text-text_color">تعديل الطالب</h2>

        <Formik
          initialValues={{
            name: studentData.name,
            gender: studentData.gender || "",
            day: studentData.day || "",
            city: studentData.city || "",
            phone: studentData.phone || "",
            time: studentData.time || "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onUpdateStudent(values); // نرسل البيانات الجديدة للجدول
            onClose();
          }}
        >
          {({ touched, errors }) => (
            <Form className="space-y-3">
              <div>
                <Field
                  type="text"
                  name="name"
                  placeholder="اسم الطالب"
                  className={`w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 ${
                    touched.name && errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <Field
                  as="select"
                  name="gender"
                  className={`w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 ${
                    touched.gender && errors.gender ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">الجنس</option>
                  <option value="ذكر">ذكر</option>
                  <option value="أنثى">أنثى</option>
                </Field>
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <Field
                  type="text"
                  name="day"
                  placeholder="اليوم"
                  className={`w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 ${
                    touched.day && errors.day ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <ErrorMessage
                  name="day"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <Field
                  type="text"
                  name="city"
                  placeholder="المدينة"
                  className={`w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 ${
                    touched.city && errors.city ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <ErrorMessage
                  name="city"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <Field
                  type="text"
                  name="phone"
                  placeholder="رقم الهاتف"
                  className={`w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 ${
                    touched.phone && errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <Field
                  type="text"
                  name="time"
                  placeholder="الوقت"
                  className={`w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 ${
                    touched.time && errors.time ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <ErrorMessage
                  name="time"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-background text-white py-2 rounded-lg hover:bg-[#0f8392] transition"
              >
                تعديل الطالب
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
