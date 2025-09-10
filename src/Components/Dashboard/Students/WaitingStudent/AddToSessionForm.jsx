import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function AddToSessionForm() {
    const location = useLocation();
    const navigate = useNavigate();
    const student = location.state?.student;

    if (!student) {
        return <p className="text-center mt-10">لم يتم اختيار طالب</p>;
    }

    // بيانات افتراضية
    const packages = ["باقة 1", "باقة 2", "باقة 3"];
    const levels = ["المستوى 1", "المستوى 2", "المستوى 3", "المستوى 4", "المستوى 5", "المستوى 6", "المستوى 7"];
    const courses = ["رياضيات", "قراءة", "إملاء", "لغة إنجليزية"];
    const teachers = ["علي", "احمد", "حسن", "محمود", "ايمان"];

    // حصص افتراضية لكل معلم (هترتبط بالباك لاحقًا)
    const teacherSessions = {
        علي: ["الحصة 1", "الحصة 2", "الحصة 3"],
        احمد: ["الحصة 1", "الحصة 2"],
        حسن: ["الحصة 1"],
        محمود: ["الحصة 1", "الحصة 2", "الحصة 3", "الحصة 4"],
        ايمان: ["الحصة 1", "الحصة 2"]
    };

    const [availableSessions, setAvailableSessions] = useState([]);

    return (
        <div className="max-w-4xl mx-auto mt-10 bg-white px-20 py-6  rounded-lg shadow-md">
            <h2 className="text-lg font-cairo text-text_color mb-4">
                إضافة {student?.name} إلى الحصة
            </h2>

            <Formik
                initialValues={{
                    package: "",
                    teacher: "",
                    level: "",
                    course: "",
                    session: "",
                    day: "",
                    time: "",
                    amount: "",
                    paymentStatus: ""
                }}
                validationSchema={Yup.object({
                    package: Yup.string().required("اختر نوع الباقة"),
                    teacher: Yup.string().required("اختر اسم المعلم"),
                    level: Yup.string().required("اختر المستوى"),
                    course: Yup.string().required("اختر الدورة التدريبية"),
                    session: Yup.string().required("اختر الحصة"),
                    day: Yup.string().required("ادخل اليوم"),
                    time: Yup.string().required("ادخل الوقت"),
                    amount: Yup.string().required("ادخل المبلغ"),
                    paymentStatus: Yup.string().required("اختر حالة الدفع")
                })}
                onSubmit={(values) => {
                    console.log("Student added to session:", { student, ...values });
                    navigate(-1);
                }}
            >
                {({ values, setFieldValue }) => (
                    <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* نوع الباقة */}
                        <div className="transform transition">
                            <label className="block mb-1">نوع الباقة</label>
                            <Field as="select" name="package" className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200">
                                <option value="">اختر الباقة</option>
                                {packages.map((pkg, i) => (
                                    <option key={i} value={pkg}>{pkg}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="package" component="div" className="text-red-500 text-sm" />
                        </div>

                        {/* اسم المعلم */}
                        <div className="transform transition  ">
                            <label className="block mb-1">اسم المعلم</label>
                            <Field as="select"
                                name="teacher"
                                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200"
                                onChange={(e) => {
                                    const teacherName = e.target.value;
                                    setFieldValue("teacher", teacherName);
                                    setFieldValue("session", "");
                                    setAvailableSessions(teacherSessions[teacherName] || []);
                                }}
                            >
                                <option value="">اختر المعلم</option>
                                {teachers.map((t, i) => (
                                    <option key={i} value={t}>{t}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="teacher" component="div" className="text-red-500 text-sm" />
                        </div>

                        {/* المستوي */}
                        <div className="transform transition  ">
                            <label className="block mb-1">المستوى</label>
                            <Field as="select" name="level" className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200">
                                <option value="">اختر المستوى</option>
                                {levels.map((level, i) => (
                                    <option key={i} value={level}>{level}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="level" component="div" className="text-red-500 text-sm" />
                        </div>

                        {/* الدورة التدريبية */}
                        <div className="transform transition  ">
                            <label className="block mb-1">الدورة التدريبية</label>
                            <Field as="select" name="course" className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200">
                                <option value="">اختر الدورة</option>
                                {courses.map((course, i) => (
                                    <option key={i} value={course}>{course}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="course" component="div" className="text-red-500 text-sm" />
                        </div>

                        {/* الحصة */}
                        <div className="transform transition  ">
                            <label className="block mb-1">الحصة</label>
                            <Field as="select" name="session" className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200">
                                <option value="">اختر الحصة</option>
                                {availableSessions.map((s, i) => (
                                    <option key={i} value={s}>{s}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="session" component="div" className="text-red-500 text-sm" />
                        </div>

                        {/* اليوم - Calendar */}
                        <div className="transform transition  ">
                            <label className="block mb-1">اليوم</label>
                            <Field
                                type="date"
                                name="day"
                                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200"
                                min={new Date().toISOString().split("T")[0]} // يمنع الأيام السابقة
                            />
                            <ErrorMessage name="day" component="div" className="text-red-500 text-sm" />
                        </div>

                        {/* الوقت */}
                        <div className="transform transition  ">
                            <label className="block mb-1">الوقت</label>
                            <Field type="time" name="time" className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200" />
                            <ErrorMessage name="time" component="div" className="text-red-500 text-sm" />
                        </div>

                        {/* المبلغ */}
                        <div className="transform transition  ">
                            <label className="block mb-1">المبلغ</label>
                            <Field type="text" name="amount" className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200" />
                            <ErrorMessage name="amount" component="div" className="text-red-500 text-sm" />
                        </div>

                        {/* حالة الدفع */}
                        <div className="transform transition  ">
                            <label className="block mb-1">حالة الدفع</label>
                            <Field as="select" name="paymentStatus" className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200">
                                <option value="">اختر الحالة</option>
                                <option value="تم">تم</option>
                                <option value="لم يتم">لم يتم</option>
                            </Field>
                            <ErrorMessage name="paymentStatus" component="div" className="text-red-500 text-sm" />
                        </div>

                        {/* الأزرار */}
                        <div className="md:col-span-2 flex justify-between mt-4">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="px-4 py-2 bg-gray-300 rounded-lg   transition"
                            >
                                إغلاق
                            </button>
                            <button type="submit" className="px-4 py-2 bg-background text-white rounded-lg   transition">
                                إضافة الطالب
                            </button>
                        </div>
                    </Form>

                )}
            </Formik>
        </div>

    );
}
