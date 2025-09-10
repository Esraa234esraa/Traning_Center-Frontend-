import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function AddCurrentStudentForm() {
    const navigate = useNavigate();

    const packages = ["طالب واحد", "طالبين", "3 طلاب", "5 طلاب"];
    const levels = ["المستوى 1", "المستوى 2", "المستوى 3", "المستوى 4", "المستوى 5", "المستوى 6", "المستوى 7"];
    const courses = ["رياضيات", "قراءة", "إملاء", "لغة إنجليزية"];
    const teachers = ["علي", "احمد", "حسن", "محمود", "ايمان"];
    const sessions = ["الحصة 1", "الحصة 2", "الحصة 3", "الحصة 4", "الحصة 5", "الحصة 6", "الحصة 7"];
    const waitingStudents = [
        { name: "علي" },
        { name: "محمد" },
        { name: "محمود" },
        { name: "حسن" },
        { name: "فاطمه" },
        { name: "احمد" }
    ];

const inputStyle = "w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ";

    return (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-cairo text-text_color mb-6">إضافة طالب</h2>
            <Formik
                initialValues={{
                    package: "",
                    studentName: "",
                    level: "",
                    course: "",
                    phone: "",
                    day: "",
                    time: "",
                    session: "",
                    city: "",
                    teacher: "",
                    amount: "",
                    paymentStatus: ""
                }}
                validationSchema={Yup.object({
                    package: Yup.string().required("اختر نوع الباقة"),
                    studentName: Yup.string().required("ادخل اسم الطالب"),
                    level: Yup.string().required("اختر المستوى"),
                    course: Yup.string().required("اختر الدورة"),
                    phone: Yup.string().required("ادخل رقم الهاتف"),
                    day: Yup.string().required("ادخل اليوم"),
                    time: Yup.string().required("ادخل الوقت"),
                    session: Yup.string().required("اختر الحصة"),
                    city: Yup.string().required("ادخل المدينة"),
                    teacher: Yup.string().required("اختر اسم المعلم"),
                    amount: Yup.string().required("ادخل المبلغ"),
                    paymentStatus: Yup.string().required("اختر حالة الدفع"),
                })}
                onSubmit={(values) => {
                    console.log("Student added:", values);
                    navigate(-1);
                }}
            >
                {() => (
                    <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* اسم الطالب */}
                        <div>
                            <label className="block mb-1">اسم الطالب</label>
                            <Field name="studentName">
                                {({ field }) => (
                                    <>
                                        <input
                                            list="waitingStudents"
                                            {...field}
                                            placeholder="اختر أو اكتب اسم الطالب"
                                            className={inputStyle}
                                        />
                                        <datalist id="waitingStudents">
                                            {waitingStudents.map((student, index) => (
                                                <option key={index} value={student.name} />
                                            ))}
                                        </datalist>
                                    </>
                                )}
                            </Field>
                            <ErrorMessage name="studentName" component="div" className="text-red-500 text-sm" />
                        </div>

                        {/* نوع الباقة */}
                        <div>
                            <label className="block mb-1">نوع الباقة</label>
                            <Field name="package">
                                {({ field }) => (
                                    <>
                                        <input
                                            list="packagesList"
                                            {...field}
                                            placeholder="اختر أو اكتب نوع الباقة"
                                            className={inputStyle}
                                        />
                                        <datalist id="packagesList">
                                            {packages.map((p, i) => (
                                                <option key={i} value={p} />
                                            ))}
                                        </datalist>
                                    </>
                                )}
                            </Field>
                            <ErrorMessage name="package" component="div" className="text-red-500 text-sm" />
                        </div>

                        {/* المستوى */}
                        <div>
                            <label className="block mb-1">المستوى</label>
                            <Field name="level">
                                {({ field }) => (
                                    <>
                                        <input
                                            list="levelsList"
                                            {...field}
                                            placeholder="اختر أو اكتب المستوى"
                                            className={inputStyle}
                                        />
                                        <datalist id="levelsList">
                                            {levels.map((l, i) => (
                                                <option key={i} value={l} />
                                            ))}
                                        </datalist>
                                    </>
                                )}
                            </Field>
                            <ErrorMessage name="level" component="div" className="text-red-500 text-sm" />
                        </div>

                        {/* الدورة */}
                        <div>
                            <label className="block mb-1">الدورة</label>
                            <Field name="course">
                                {({ field }) => (
                                    <>
                                        <input
                                            list="coursesList"
                                            {...field}
                                            placeholder="اختر أو اكتب الدورة"
                                            className={inputStyle}
                                        />
                                        <datalist id="coursesList">
                                            {courses.map((c, i) => (
                                                <option key={i} value={c} />
                                            ))}
                                        </datalist>
                                    </>
                                )}
                            </Field>
                            <ErrorMessage name="course" component="div" className="text-red-500 text-sm" />
                        </div>

                        {/* رقم الهاتف */}
                        <div>
                            <label className="block mb-1">رقم الهاتف</label>
                            <Field type="phone" name="phone" placeholder="رقم الهاتف" className={inputStyle} />
                            <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
                        </div>

                        {/* اليوم */}
                        <div>
                            <label className="block mb-1">اليوم</label>
                            <Field type="date" name="day" min={new Date().toISOString().split("T")[0]} className={inputStyle} />
                            <ErrorMessage name="day" component="div" className="text-red-500 text-sm" />
                        </div>

                        {/* الوقت */}
                        <div>
                            <label className="block mb-1">الوقت</label>
                            <Field type="time" name="time" className={inputStyle} />
                            <ErrorMessage name="time" component="div" className="text-red-500 text-sm" />
                        </div>

                        {/* الحصة */}
                        <div>
                            <label className="block mb-1">الحصة</label>
                            <Field name="session">
                                {({ field }) => (
                                    <>
                                        <input
                                            list="sessionsList"
                                            {...field}
                                            placeholder="اختر أو اكتب الحصة"
                                            className={inputStyle}
                                        />
                                        <datalist id="sessionsList">
                                            {sessions.map((s, i) => (
                                                <option key={i} value={s} />
                                            ))}
                                        </datalist>
                                    </>
                                )}
                            </Field>
                            <ErrorMessage name="session" component="div" className="text-red-500 text-sm" />
                        </div>

                        {/* المدينة */}
                        <div>
                            <label className="block mb-1">المدينة</label>
                            <Field type="text" name="city" placeholder="المدينة" className={inputStyle} />
                            <ErrorMessage name="city" component="div" className="text-red-500 text-sm" />
                        </div>

                        {/* المعلم */}
                        <div>
                            <label className="block mb-1">المعلم</label>
                            <Field name="teacher">
                                {({ field }) => (
                                    <>
                                        <input
                                            list="teachersList"
                                            {...field}
                                            placeholder="اختر أو اكتب اسم المعلم"
                                            className={inputStyle}
                                        />
                                        <datalist id="teachersList">
                                            {teachers.map((t, i) => (
                                                <option key={i} value={t} />
                                            ))}
                                        </datalist>
                                    </>
                                )}
                            </Field>
                            <ErrorMessage name="teacher" component="div" className="text-red-500 text-sm" />
                        </div>

                        {/* المبلغ */}
                        <div>
                            <label className="block mb-1">المبلغ</label>
                            <Field type="text" name="amount" placeholder="المبلغ" className={inputStyle} />
                            <ErrorMessage name="amount" component="div" className="text-red-500 text-sm" />
                        </div>

                        {/* حالة الدفع */}
                        <div>
                            <label className="block mb-1">حالة الدفع</label>
                            <Field name="paymentStatus">
                                {({ field }) => (
                                    <>
                                        <input
                                            list="paymentStatusList"
                                            {...field}
                                            placeholder="اختر أو اكتب حالة الدفع"
                                            className={inputStyle}
                                        />
                                        <datalist id="paymentStatusList">
                                            <option value="تم" />
                                            <option value="لم يتم" />
                                        </datalist>
                                    </>
                                )}
                            </Field>
                            <ErrorMessage name="paymentStatus" component="div" className="text-red-500 text-sm" />
                        </div>

                        {/* الأزرار */}
                        <div className="md:col-span-2 flex justify-between mt-4">
                            <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-300 rounded-lg">إغلاق</button>
                            <button type="submit" className="px-4 py-2 bg-background text-white rounded-lg">إضافة الطالب</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
