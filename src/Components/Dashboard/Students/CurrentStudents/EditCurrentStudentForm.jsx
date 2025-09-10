import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// هنا نفس الـ students (في الحقيقة المفروض يجي من API أو Context)
const students = [
  {
    studentName: "علي",
    phone: "01111111111",
    city: "السعودية, الاحساء",
    course: "رياضيات",
    teacher: "علي",
    session: "الحصة 1",
    package: "طالب واحد",
    paymentStatus: "تم",
    level: "المستوى 1",
    day: "2025-08-25",
    time: "10:00",
    amount: "200",
  },
  {
    studentName: "محمد",
    phone: "0112222333",
    city: "السعودية, الاحساء",
    course: "لغة إنجليزية",
    teacher: "احمد",
    session: "الحصة 2",
    package: "3 طلاب",
    paymentStatus: "لم يتم",
    level: "المستوى 2",
    day: "2025-08-26",
    time: "12:00",
    amount: "150",
  },
];

export default function EditCurrentStudentForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // index الطالب
  const student = students[id];

  if (!student) return <p className="text-center mt-10">⚠️ الطالب غير موجود</p>;

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
    { name: "احمد" },
  ];

  const inputStyle = "w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ";

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-cairo text-text_color mb-6">تعديل بيانات الطالب</h2>
      <Formik
        initialValues={{
          package: student.package,
          studentName: student.studentName,
          level: student.level,
          course: student.course,
          phone: student.phone,
          day: student.day,
          time: student.time,
          session: student.session,
          city: student.city,
          teacher: student.teacher,
          amount: student.amount,
          paymentStatus: student.paymentStatus,
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
          console.log("Student updated:", values);
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
                      {waitingStudents.map((s, i) => (
                        <option key={i} value={s.name} />
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
                    <input list="packagesList" {...field} className={inputStyle} />
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
                    <input list="levelsList" {...field} className={inputStyle} />
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
                    <input list="coursesList" {...field} className={inputStyle} />
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
              <Field type="text" name="phone" className={inputStyle} />
              <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
            </div>

            {/* اليوم */}
            <div>
              <label className="block mb-1">اليوم</label>
              <Field type="date" name="day" className={inputStyle} />
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
                    <input list="sessionsList" {...field} className={inputStyle} />
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
              <Field type="text" name="city" className={inputStyle} />
              <ErrorMessage name="city" component="div" className="text-red-500 text-sm" />
            </div>

            {/* المعلم */}
            <div>
              <label className="block mb-1">المعلم</label>
              <Field name="teacher">
                {({ field }) => (
                  <>
                    <input list="teachersList" {...field} className={inputStyle} />
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
              <Field type="text" name="amount" className={inputStyle} />
              <ErrorMessage name="amount" component="div" className="text-red-500 text-sm" />
            </div>

            {/* حالة الدفع */}
            <div>
              <label className="block mb-1">حالة الدفع</label>
              <Field name="paymentStatus">
                {({ field }) => (
                  <>
                    <input list="paymentStatusList" {...field} className={inputStyle} />
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
              <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-300 rounded-lg">
                إلغاء
              </button>
              <button type="submit" className="px-4 py-2 bg-background text-white rounded-lg">
                حفظ التعديلات
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
