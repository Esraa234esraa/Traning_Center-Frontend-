import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function EditTeacher() {
  const { id } = useParams();
  const navigate = useNavigate();

  const teachers = [
    { name: "علي", email: "michelle.rivera@example.com", city: "السعودية, الاحساء", subject: "Maths", phone: "0111111111", booked: 4, total: 7 },
    { name: "احمد", email: "debbie.baker@example.com", city: "اسم المدينة", subject: "اعراب", phone: "0111111111", booked: 5, total: 7 },
    { name: "حسن", email: "nathan.roberts@example.com", city: "اسم المدينة", subject: "English", phone: "0111111111", booked: 2, total: 7 },
  ];

  const teacher = teachers[id];

  const subjectsList = ["Maths", "English", "اعراب", "قراءة", "علوم", "برمجة"];

  const validationSchema = Yup.object({
    name: Yup.string().required("الاسم مطلوب"),
    email: Yup.string().email("بريد إلكتروني غير صالح").required("البريد الإلكتروني مطلوب"),
    city: Yup.string().required("المدينة مطلوبة"),
    subject: Yup.string().required("المادة مطلوبة"),
    phone: Yup.string().matches(/^[0-9]{10,15}$/, "رقم الهاتف غير صحيح").required("رقم الهاتف مطلوب"),
    booked: Yup.number().min(0, "لا يمكن أن يكون أقل من 0").max(7, "الحد الأقصى 7 حصص").required("عدد الحصص المحجوزة مطلوب"),
  });

  const handleSubmit = (values) => {
    console.log("✅ بيانات بعد التعديل:", values);
    navigate("/dashboard/teacher_table");
  };

  return (
    <div className="max-w-xl mx-auto  mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-xl font-bold mb-6 text-center">تعديل بيانات المعلم</h2>

      <Formik initialValues={teacher} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ values, isSubmitting }) => {
          const remaining = values.total - values.booked;

          return (
            <Form className="space-y-4">
              {/* الاسم */}
              <div>
                <Field name="name" className="w-full p-2 border rounded" placeholder="الاسم" />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* البريد */}
              <div>
                <Field name="email" className="w-full p-2 border rounded" placeholder="البريد الإلكتروني" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* المدينة */}
              <div>
                <Field name="city" className="w-full p-2 border rounded" placeholder="المدينة" />
                <ErrorMessage name="city" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* المادة */}
              <div>
                <Field as="select" name="subject" className="w-full p-2 border rounded bg-white">
                  <option value="">اختر المادة</option>
                  {subjectsList.map((subj, i) => (
                    <option key={i} value={subj}>
                      {subj}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="subject" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* الهاتف */}
              <div>
                <Field name="phone" className="w-full p-2 border rounded" placeholder="رقم الهاتف" />
                <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* الحصص المحجوزة */}
              {/* <div>
                <Field type="number" name="booked" className="w-full p-2 border rounded" placeholder="عدد الحصص المحجوزة" />
                <ErrorMessage name="booked" component="div" className="text-red-500 text-sm mt-1" />
                <p className="text-sm mt-1 text-gray-600">
                  متبقي: <span className="font-bold">{remaining}</span> من {values.total} حصص
                </p>
              </div> */}

              {/* الأزرار */}
              <div className="flex justify-between mt-6">
                <button type="button" onClick={() => navigate("/dashboard/teacher_table")} className="px-4 py-2 bg-gray-500 text-white rounded">
                  رجوع
                </button>
                <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-background text-white rounded disabled:opacity-50">
                  {isSubmitting ? "جارٍ الحفظ..." : "حفظ التعديلات"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
