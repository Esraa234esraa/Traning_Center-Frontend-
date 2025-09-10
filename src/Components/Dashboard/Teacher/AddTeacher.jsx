import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// مخطط الفاليديشن
const validationSchema = Yup.object({
  fullName: Yup.string().required("الاسم مطلوب"),
  email: Yup.string().email("البريد الإلكتروني غير صالح").required("البريد الإلكتروني مطلوب"),
  city: Yup.string().required("المدينة مطلوبة"),
  gender: Yup.string().required("الجنس مطلوب"),
  phone: Yup.string()
    .matches(/^05\d{8}$/, "رقم الهاتف يجب أن يبدأ بـ 05 ويتكون من 10 أرقام")
    .required("رقم الهاتف مطلوب"),
  password: Yup.string().min(6, "كلمة السر يجب أن تكون 6 أحرف على الأقل").required("كلمة السر مطلوبة"),
  trainingCourse: Yup.string().required("اسم الدورة مطلوب"),
});

export default function AddTeacher() {
  const initialValues = {
    fullName: "",
    email: "",
    city: "",
    gender: "",
    phone: "",
    password: "",
    trainingCourse: "",
  };

  const handleSubmit = (values) => {
    console.log("Form Data:", values);
    alert("تم إضافة المعلم بنجاح!");
  };

  return (
    <div
      dir="rtl"
      className=" bg-white min-h-screen p-10 font-sans text-gray-800"
    >
      {/* رابط أعلى الفورم */}
      <div className="mb-10">
        <a href="#" className="text-sm text-[#0b556d] hover:underline">
          المعلمين
        </a>
      </div>

      <h2 className="font-bold text-2xl mb-10 text-gray-800">إضافة معلم</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-wrap gap-5 max-w-3xl">
          {/* الاسم بالكامل */}
          <div className="w-full">
            <Field
              name="fullName"
              placeholder="الاسم بالكامل"
              className="w-full h-9 text-sm border border-gray-300 rounded px-3 text-gray-500 focus:outline-none focus:border-blue-400"
            />
            <ErrorMessage
              name="fullName"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          {/* البريد الالكتروني */}
          <div className="w-full">
            <Field
              type="email"
              name="email"
              placeholder="البريد الالكتروني"
              className="w-full h-9 text-sm border border-gray-300 rounded px-3 text-gray-500 focus:outline-none focus:border-blue-400"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          {/* المدينة */}
          <div className="w-1/3">
            <Field
              as="select"
              name="city"
              className="w-full h-9 text-sm border border-gray-300 rounded px-3 text-gray-500 bg-white focus:outline-none focus:border-blue-400"
            >
              <option value="">المدينة</option>
              {[
                "الرياض", "جدة", "مكة المكرمة", "الدمام", "الخبر", "الطائف",
                "تبوك", "بريدة", "المدينة المنورة", "حائل", "خميس مشيط",
                "نجران", "جازان", "الأحساء", "عرعر",
              ].map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </Field>
            <ErrorMessage
              name="city"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          {/* الجنس */}
          <div className="w-1/3">
            <Field
              as="select"
              name="gender"
              className="w-full h-9 text-sm border border-gray-300 rounded px-3 text-gray-500 bg-white focus:outline-none focus:border-blue-400"
            >
              <option value="">الجنس</option>
              <option value="ذكر">ذكر</option>
              <option value="أنثى">أنثى</option>
            </Field>
            <ErrorMessage
              name="gender"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          {/* رقم الهاتف */}
          <div className="w-1/3">
            <Field
              type="tel"
              name="phone"
              placeholder="رقم الهاتف"
              className="w-full h-9 text-sm border border-gray-300 rounded px-3 text-gray-500 focus:outline-none focus:border-blue-400"
            />
            <ErrorMessage
              name="phone"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          {/* كلمة السر */}
          <div className="w-1/2">
            <Field
              type="password"
              name="password"
              placeholder="كلمة السر"
              className="w-full h-9 text-sm border border-gray-300 rounded px-3 text-gray-500 focus:outline-none focus:border-blue-400"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          {/* اسم الدورة */}
          <div className="w-1/2">
            <Field
              as="select"
              name="trainingCourse"
              className="w-full h-9 text-sm border border-gray-300 rounded px-3 text-gray-500 bg-white focus:outline-none focus:border-blue-400"
            >
              <option value="">اسم الدورة التدريبية</option>
              <option value="دورة أ">دورة أ</option>
              <option value="دورة ب">دورة ب</option>
              <option value="دورة ج">دورة ج</option>
            </Field>
            <ErrorMessage
              name="trainingCourse"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          {/* زر الإرسال */}
          <div className="w-full mt-5">
            <button
              type="submit"
              className="bg-[#1a9dbd] hover:bg-[#15859d] text-white font-bold text-sm py-2 px-6 rounded"
            >
              إضافة معلم
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
