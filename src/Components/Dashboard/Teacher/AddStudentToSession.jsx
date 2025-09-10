import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function AddStudentModal({ isOpen, onClose, onSubmit }) {
    if (!isOpen) return null;

    const validationSchema = Yup.object({
        package: Yup.string().required("اختر نوع الباقة"),
        studentName: Yup.string().required("اسم الطالب مطلوب"),
        level: Yup.string().required("اختر المستوى"),
        course: Yup.string().required("اختر الدورة التدريبية"),
        phone: Yup.string().required("رقم الهاتف مطلوب"),
        day: Yup.string().required("اختر اليوم"),
        time: Yup.string().required("اختر التوقيت"),
        city: Yup.string().required("المدينة مطلوبة"),
        amount: Yup.number().required("المبلغ مطلوب"),
        paymentStatus: Yup.string().required("اختر حالة الدفع"),
    });

    return (
        <div className="fixed inset-0 bg-gray-700/10 flex items-center justify-center z-50 ">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto scrollbar-hide">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold">إضافة طالب للحصة</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-red-500">
                        ✖
                    </button>
                </div>

                {/* Form */}
                <div className="p-6">
                    <Formik
                        initialValues={{
                            package: "",
                            studentName: "",
                            level: "",
                            course: "",
                            phone: "",
                            day: "",
                            time: "",
                            city: "",
                            amount: "",
                            paymentStatus: "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            onSubmit(values);
                            onClose();
                        }}
                    >
                        {() => (
                            <Form className="flex flex-col gap-4">
                                {/* نوع الباقة */}
                                <div>
                                    <label className="block mb-1">نوع الباقة</label>
                                    <Field as="select" name="package" className="w-full border rounded-md p-2">
                                        <option value="">اختر</option>
                                        <option value="1">باقة 1 طالب</option>
                                        <option value="2">باقة 2 طالب</option>
                                    </Field>
                                    <ErrorMessage name="package" component="p" className="text-red-500 text-sm" />
                                </div>

                                {/* اسم الطالب */}
                                <div>
                                    <label className="block mb-1">اسم الطالب</label>
                                    <Field name="studentName" className="w-full border rounded-md p-2" />
                                    <ErrorMessage name="studentName" component="p" className="text-red-500 text-sm" />
                                </div>

                                {/* المستوى */}
                                <div>
                                    <label className="block mb-1">المستوى</label>
                                    <Field as="select" name="level" className="w-full border rounded-md p-2">
                                        <option value="">اختر</option>
                                        <option value="1">المستوى 1</option>
                                        <option value="2">المستوى 2</option>
                                        <option value="3">المستوى 3</option>
                                        <option value="4">المستوى 4</option>
                                        <option value="5">المستوى 5</option>
                                        <option value="2">المستوى 6</option>
                                        <option value="3">المستوى 7</option>

                                    </Field>
                                    <ErrorMessage name="level" component="p" className="text-red-500 text-sm" />
                                </div>

                                {/* الدورة */}
                                <div>
                                    <label className="block mb-1">الدورة التدريبية</label>
                                    <Field name="course" className="w-full border rounded-md p-2" />
                                    <ErrorMessage name="course" component="p" className="text-red-500 text-sm" />
                                </div>

                                {/* الهاتف */}
                                <div>
                                    <label className="block mb-1">رقم الهاتف</label>
                                    <Field name="phone" className="w-full border rounded-md p-2" />
                                    <ErrorMessage name="phone" component="p" className="text-red-500 text-sm" />
                                </div>

                                {/* اليوم + الوقت */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block mb-1">اليوم</label>
                                        <Field as="select" name="day" className="w-full border rounded-md p-2">
                                            <option value="">اختر</option>
                                            <option value="الأحد">الأحد</option>
                                            <option value="الإثنين">الإثنين</option>
                                            <option value="الثلاثاء">الثلاثاء</option>
                                            <option value="الأربعاء">الأربعاء</option>
                                            <option value="الخميس">الخميس</option>
                                        </Field>
                                        <ErrorMessage name="day" component="p" className="text-red-500 text-sm" />
                                    </div>
                                    <div>
                                        <label className="block mb-1">الوقت</label>
                                        <Field name="time" className="w-full border rounded-md p-2" />
                                        <ErrorMessage name="time" component="p" className="text-red-500 text-sm" />
                                    </div>
                                </div>

                                {/* المدينة */}
                                <div>
                                    <label className="block mb-1">المدينة</label>
                                    <Field name="city" className="w-full border rounded-md p-2" />
                                    <ErrorMessage name="city" component="p" className="text-red-500 text-sm" />
                                </div>

                                {/* المبلغ + حالة الدفع */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block mb-1">المبلغ</label>
                                        <Field type="number" name="amount" className="w-full border rounded-md p-2" />
                                        <ErrorMessage name="amount" component="p" className="text-red-500 text-sm" />
                                    </div>
                                    <div>
                                        <label className="block mb-1">حالة الدفع</label>
                                        <Field as="select" name="paymentStatus" className="w-full border rounded-md p-2">
                                            <option value="">اختر</option>
                                            <option value="مدفوع">مدفوع</option>
                                            <option value="غير مدفوع">غير مدفوع</option>
                                        </Field>
                                        <ErrorMessage name="paymentStatus" component="p" className="text-red-500 text-sm" />
                                    </div>
                                </div>

                                {/* الأزرار */}
                                <div className="flex justify-end gap-3 mt-4">
                                    <button type="button" onClick={onClose} className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400">
                                        إلغاء
                                    </button>
                                    <button type="submit" className="px-4 py-2 rounded-md bg-background text-white hover:bg-blue-700">
                                        إضافة
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}
