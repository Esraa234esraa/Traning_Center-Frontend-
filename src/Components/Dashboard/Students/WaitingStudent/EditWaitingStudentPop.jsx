import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useUpdateWaitingStudent } from "../../../../Hooks/Students/NewStudents/useMutationNewStudent";
import { useGetAllStudents } from "../../../../Hooks/Students/NewStudents/useQueryNewStudent";
import { toast } from "react-toastify";

// ✅ فاليديشن
const validationSchema = Yup.object({
  name: Yup.string().required("الرجاء إدخال اسم الطالب"),
  gender: Yup.string().required("الرجاء اختيار الجنس"),
  day: Yup.string().required("الرجاء إدخال اليوم"),
  city: Yup.string().required("الرجاء إدخال المدينة"),
  phone: Yup.string()
    .required("الرجاء إدخال رقم الهاتف")
    .matches(/^[0-9]+$/, "يجب إدخال أرقام فقط")
    .min(11, "رقم الهاتف يجب ألا يقل عن 11 رقم")
    .max(15, "رقم الهاتف يجب ألا يزيد عن 15 رقم"),
  time: Yup.string().required("الرجاء اختيار الوقت"),
});

export default function EditStudentPopup({ isOpen, onClose, studentData }) {
  const updateStudentMutation = useUpdateWaitingStudent();
  const { data: studentsData } = useGetAllStudents();

  const [isWeekend, setIsWeekend] = useState(false);
  const [bookedTimes, setBookedTimes] = useState([]);
  const [duplicateWarning, setDuplicateWarning] = useState("");

  if (!isOpen) return null;

  const today = new Date().toISOString().split("T")[0];

  // ✅ دالة لتنسيق الوقت
  const normalizeTime = (time) => {
    if (!time) return null;
    const date = new Date(`1970-01-01T${time}`);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}:00`; // HH:mm:ss
  };

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
          enableReinitialize
          initialValues={{
            id: studentData?.id || "",
            name: studentData?.studentName || "",
            gender: studentData?.gender || "",
            city: studentData?.city || "",
            phone: studentData?.phoneNumber || "",
            day: studentData?.date || "",
            time: studentData?.time?.slice(0, 5) || "", // "HH:mm"
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm, setSubmitting }) => {
            if (isWeekend) {
              toast.error("لا يمكن الحجز يوم الجمعة أو السبت");
              setSubmitting(false);
              return;
            }
            if (duplicateWarning) {
              toast.error("هذا الطالب موجود مسبقًا");
              setSubmitting(false);
              return;
            }

            const payload = {
              studentName: values.name,
              gender: values.gender,
              city: values.city,
              phoneNumber: values.phone,
              date: values.day,
              time: normalizeTime(values.time),
            };

            updateStudentMutation.mutate(
              { id: values.id, data: payload },
              {
                onSuccess: (res) => {
                  if (!res?.success) {
                    toast.error(res.message || "حدث خطأ أثناء تعديل الطالب", {
                      toastId: `${res.message}-${Date.now()}`,
                    });
                    setSubmitting(false);
                    return; 
                  }

                  resetForm();
                  setSubmitting(false);
                  onClose();
                  toast.success(res?.message || "تم تعديل الطالب بنجاح");
                },
                onError: (error) => {
                  const errorMsg =
                    error?.response?.data?.message || "حدث خطأ أثناء تعديل الطالب";
                  toast.error(errorMsg, {
                    toastId: `${errorMsg}-${Date.now()}`,
                  });
                  setSubmitting(false);
                },
              }
            );

          }}
        >
          {({ touched, errors, values, setFieldValue, isSubmitting }) => {
            useEffect(() => {
              if (values.day) {
                const dayOfWeek = new Date(values.day).getDay();
                setIsWeekend(dayOfWeek === 5 || dayOfWeek === 6);

                if (studentsData?.data) {
                  const booked = studentsData.data
                    .filter((s) => s.date === values.day && s.id !== values.id) // ✅ استبعد الطالب الحالي
                    .map((s) => s.time.slice(0, 5));
                  setBookedTimes(booked);
                }

                if (dayOfWeek === 5 || dayOfWeek === 6) {
                  setFieldValue("time", "");
                }
              } else {
                setBookedTimes([]);
                setIsWeekend(false);
              }

              if (studentsData?.data && (values.name || values.phone)) {
                const duplicate = studentsData.data.find(
                  (s) => s.phoneNumber === values.phone && s.id !== values.id
                );
                if (duplicate) {
                  setDuplicateWarning("هذا الطالب موجود مسبقًا!");
                } else {
                  setDuplicateWarning("");
                }
              }
            }, [values.day, values.name, values.phone, setFieldValue, studentsData, values.id]);

            return (
              <Form className="space-y-3">
                {/* الاسم */}
                <div>
                  <Field
                    type="text"
                    name="name"
                    placeholder="اسم الطالب"
                    className={`w-full p-2 border rounded-lg ${touched.name && errors.name
                      ? "border-red-500"
                      : "border-gray-300"
                      }`}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* الجنس */}
                <div>
                  <Field
                    as="select"
                    name="gender"
                    className={`w-full p-2 border rounded-lg ${touched.gender && errors.gender
                      ? "border-red-500"
                      : "border-gray-300"
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

                {/* اليوم */}
                <div>
                  <Field
                    type="date"
                    name="day"
                    min={today}
                    onChange={(e) => setFieldValue("day", e.target.value)}
                    className={`w-full p-2 border rounded-lg ${touched.day && errors.day
                      ? "border-red-500"
                      : "border-gray-300"
                      }`}
                  />
                  <ErrorMessage
                    name="day"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                  {isWeekend && (
                    <p className="text-red-500 text-sm mt-1">
                      لا يمكن الحجز يوم الجمعة أو السبت
                    </p>
                  )}
                </div>

                {/* الوقت */}
                <div>
                  <Field
                    as="select"
                    name="time"
                    disabled={isWeekend}
                    className={`w-full p-2 border rounded-lg ${touched.time && errors.time
                      ? "border-red-500"
                      : "border-gray-300"
                      }`}
                  >
                    <option value="">اختر الوقت</option>
                    {Array.from({ length: (22 - 8) * 4 }, (_, i) => {
                      const hour = 8 + Math.floor(i / 4);
                      const minutes = (i % 4) * 15;
                      const value = `${hour}:${minutes
                        .toString()
                        .padStart(2, "0")}`;
                      const isBooked = bookedTimes.includes(value);
                      return (
                        <option key={value} value={value} disabled={isBooked}>
                          {value} {isBooked ? "(محجوز)" : ""}
                        </option>
                      );
                    })}
                  </Field>
                  <ErrorMessage
                    name="time"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* المدينة */}
                <div>
                  <Field
                    type="text"
                    name="city"
                    placeholder="المدينة"
                    className={`w-full p-2 border rounded-lg ${touched.city && errors.city
                      ? "border-red-500"
                      : "border-gray-300"
                      }`}
                  />
                  <ErrorMessage
                    name="city"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* الهاتف */}
                <div>
                  <Field
                    type="text"
                    name="phone"
                    placeholder="رقم الهاتف"
                    className={`w-full p-2 border rounded-lg ${touched.phone && errors.phone
                      ? "border-red-500"
                      : "border-gray-300"
                      }`}
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* تحذير الطالب المكرر */}
                {duplicateWarning && (
                  <p className="text-red-500 text-sm mt-1">
                    {duplicateWarning}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || isWeekend || duplicateWarning}
                  className={`w-full py-2 rounded-lg transition ${isSubmitting || isWeekend || duplicateWarning
                    ? "bg-gray-400 cursor-not-allowed text-gray-200"
                    : "bg-background text-white hover:bg-[#0f8392]"
                    }`}
                >
                  {isSubmitting ? "جارٍ التعديل..." : "تعديل الطالب"}
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
