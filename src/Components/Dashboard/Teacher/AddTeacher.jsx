import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAddTeacher } from "../../../Hooks/Teacher/useMutationTeacher";
import { useGetAllCourses } from "../../../Hooks/Courses/useQueryCourses"; // 🔹
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// ✅ validation schema

const validationSchema = Yup.object({
  fullName: Yup.string().required("الاسم مطلوب"),
  email: Yup.string().email("البريد الإلكتروني غير صالح").required("البريد الإلكتروني مطلوب"),
  city: Yup.string().required("المدينة مطلوبة"),
  gender: Yup.string().required("الجنس مطلوب"),
  phone: Yup.string().required("رقم الهاتف مطلوب"), // ✅ بدون شرط 05
  password: Yup.string().min(6, "كلمة السر يجب أن تكون 6 أحرف على الأقل").required("كلمة السر مطلوبة"),
  trainingCourse: Yup.string().required("اسم الدورة مطلوب"),
});


export default function AddTeacher() {
  const addTeacherMutation = useAddTeacher();
  const { data: courses, isLoading: coursesLoading } = useGetAllCourses();
  const navigate = useNavigate();

  const initialValues = {
    fullName: "",
    email: "",
    city: "",
    gender: "",
    phone: "",
    password: "",
    trainingCourse: "",
  };


  const handleSubmit = (values, { resetForm }) => {
    const payload = {
      fullName: values.fullName,
      email: values.email,
      phoneNumber: values.phone,
      password: values.password,
      gender: values.gender,
      city: values.city,
      courseId: values.trainingCourse, // 🔹 إرسال ID الحقيقي
    };

    addTeacherMutation.mutate(payload, {

      onSuccess: () => {
        console.log("Teacher added successfully", payload);

        toast.success("تم إضافة المعلم بنجاح");
        navigate("/dashboard/teacher_table");
        resetForm();
      },
      onError: (error) => {
        const errorMsg = error?.response?.data?.message || "حدث خطأ أثناء الإضافة";
        toast.error(errorMsg);
      },
    });
  };

  return (
    <div dir="rtl" className="bg-white min-h-screen p-10 font-sans text-gray-800">
      <h2 className="font-bold text-2xl mb-10 text-gray-800">إضافة معلم</h2>

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form className="flex flex-wrap gap-5 max-w-3xl">
          <div className="w-full">
            <Field name="fullName" placeholder="الاسم بالكامل" className="w-full h-9 text-sm border border-gray-300 rounded px-3 text-gray-500 focus:outline-none focus:border-blue-400" />
            <ErrorMessage name="fullName" component="div" className="text-red-500 text-xs mt-1" />
          </div>

          <div className="w-full">
            <Field type="email" name="email" placeholder="البريد الالكتروني" className="w-full h-9 text-sm border border-gray-300 rounded px-3 text-gray-500 focus:outline-none focus:border-blue-400" />
            <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
          </div>

          <div className="w-1/3">
            <Field
              as="select"
              name="city"
              className="w-full h-9 text-sm border border-gray-300 rounded px-3 text-gray-500 bg-white focus:outline-none focus:border-blue-400"
            >
              <option value="">المدينة</option>
              {[
                "الرياض",
                "جدة",
                "مكة المكرمة",
                "المدينة المنورة",
                "الدمام",
                "الخبر",
                "الأحساء",
                "القطيف",
                "الظهران",
                "حائل",
                "تبوك",
                "أبها",
                "خميس مشيط",
                "جازان",
                "نجران",
                "الباحة",
                "الطائف"
              ].map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </Field>

            <ErrorMessage name="city" component="div" className="text-red-500 text-xs mt-1" />
          </div>

          <div className="w-1/3">
            <Field as="select" name="gender" className="w-full h-9 text-sm border border-gray-300 rounded px-3 text-gray-500 bg-white focus:outline-none focus:border-blue-400">
              <option value="">الجنس</option>
              <option value="ذكر">ذكر</option>
              <option value="أنثى">أنثى</option>
            </Field>
            <ErrorMessage name="gender" component="div" className="text-red-500 text-xs mt-1" />
          </div>

          <div className="w-1/3">
            <Field type="tel" name="phone" placeholder="رقم الهاتف" className="w-full h-9 text-sm border border-gray-300 rounded px-3 text-gray-500 focus:outline-none focus:border-blue-400" />
            <ErrorMessage name="phone" component="div" className="text-red-500 text-xs mt-1" />
          </div>

          <div className="w-1/2">
            <Field type="password" name="password" placeholder="كلمة السر" className="w-full h-9 text-sm border border-gray-300 rounded px-3 text-gray-500 focus:outline-none focus:border-blue-400" />
            <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
          </div>

          <div className="w-1/2">
            <Field as="select" name="trainingCourse" className="w-full h-9 text-sm border border-gray-300 rounded px-3 text-gray-500 bg-white focus:outline-none focus:border-blue-400">
              <option value="">اختر الدورة التدريبية</option>
              {coursesLoading
                ? <option disabled>جاري التحميل...</option>
                : courses?.map((course) => (
                  <option key={course.id} value={course.id}>{course.name}</option>
                ))
              }
            </Field>
            <ErrorMessage name="trainingCourse" component="div" className="text-red-500 text-xs mt-1" />
          </div>

          <div className="w-full mt-5">
            <button type="submit" className="bg-[#1a9dbd] hover:bg-[#15859d] text-white font-bold text-sm py-2 px-6 rounded">
              {addTeacherMutation.isLoading ? "جاري الإضافة..." : "إضافة معلم"}
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
