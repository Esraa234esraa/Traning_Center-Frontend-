import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useAddNewStudent } from "../Hooks/Students/NewStudents/useMutationNewStudent";
import { useGetAllStudents } from "../Hooks/Students/NewStudents/useQueryNewStudent";
import Loading from "../Components/Loading";
import BookingConfirmation from "./BookingConfirmation";

export default function Booking() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [unavailableSlots, setUnavailableSlots] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState("");

  const addNewStudentMutation = useAddNewStudent();
  const { data: studentsData } = useGetAllStudents();

  // التحقق من المواعيد المحجوزة + التكرار
  useEffect(() => {
    if (selectedDate && studentsData?.data) {
      const booked = studentsData.data
        .filter((s) => s.date === selectedDate)
        .map((s) => s.time.substring(0, 5));
      setUnavailableSlots(booked);
    }
  }, [selectedDate, studentsData]);

  // توليد الأوقات المتاحة
  const generateSlots = () => {
    const slots = [];
    let hour = 15;
    let minute = 0;
    while (hour < 17 || (hour === 17 && minute === 0)) {
      const time = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
      slots.push(time);
      minute += 15;
      if (minute === 60) {
        hour++;
        minute = 0;
      }
    }
    return slots;
  };

  // Schema التحقق
  const validationSchema = Yup.object({
    studentName: Yup.string().required("اسم الطالب مطلوب"),
    phoneNumber: Yup.string()
      .required("رقم الهاتف مطلوب"),
    email: Yup.string().email("بريد إلكتروني غير صالح").required("البريد مطلوب"),
    gender: Yup.string().required("الجنس مطلوب"),
    city: Yup.string().required("المدينة مطلوبة"),
  });

  // معالجة اختيار اليوم
  const handleDateChange = (e) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const date = new Date(e.target.value);
    const day = date.getDay();

    if (day === 5 || day === 6) {
      toast.error("الجمعة والسبت غير متاحين");
      return;
    }
    if (date < today) {
      toast.error("لا يمكنك اختيار تاريخ في الماضي");
      return;
    }
    setSelectedDate(e.target.value);
  };

  if (addNewStudentMutation.isLoading) return <Loading />;

  return (
    <section className="md:mt-[10rem] mt-[7rem] mb-10">
      <div className="pt-12 my-[5%] max-w-4xl mx-auto bg-blue-50 p-6 md:p-10 shadow-lg rounded-2xl space-y-6">
        <h2 className="text-2xl font-bold text-text_color text-center mb-4">
          حجز موعد في مركز اللغة المثالية
        </h2>
        <p className="text-center text-gray-600">
          اختر اليوم والوقت المناسبين لك لإجراء اختبار تحديد المستوى
        </p>

        {/* اختيار اليوم */}
        <div>
          <label className="block mb-2 font-semibold">اختر اليوم</label>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            min={new Date().toISOString().split("T")[0]}
            className="p-2 border border-gray-300 rounded-lg w-full max-w-xs text-center"
          />
        </div>

        {/* اختيار الوقت */}
        {selectedDate && (
          <div>
            <label className="block mb-2 font-semibold">اختر الوقت</label>
            <div className="grid grid-cols-2 gap-2">
              {generateSlots().map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  disabled={unavailableSlots.includes(time)}
                  className={`p-2 rounded border text-sm ${unavailableSlots.includes(time)
                    ? "bg-red-200 cursor-not-allowed"
                    : selectedTime === time
                      ? "bg-background text-white"
                      : "bg-white hover:bg-blue-100"
                    }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* بيانات الطالب */}
        {selectedTime && (
          <Formik
            initialValues={{
              studentName: "",
              phoneNumber: "",
              email: "",
              gender: "",
              city: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              // تحقق من التكرار
              const duplicate = studentsData?.data?.find(
                (s) => s.phoneNumber === values.phoneNumber
              );
              if (duplicate) {
                setDuplicateWarning("هذا الطالب موجود مسبقًا!");
                setSubmitting(false);
                return;
              } else {
                setDuplicateWarning("");
              }

              const payload = {
                ...values,
                date: selectedDate,
                time: selectedTime.length === 5 ? `${selectedTime}:00` : selectedTime,
                status: 0,
              };

              addNewStudentMutation.mutate(payload, {
                onSuccess: (res) => {
                  setSubmitting(false);
                  if (res?.data.success) {
                    toast.success(res.data.message || "تم التسجيل بنجاح");
                    setShowConfirmation(true);
                  } else {
                    toast.error(res?.data.message || "حدث خطأ أثناء التسجيل");
                  }
                },
                onError: (err) => {
                  setSubmitting(false);
                  toast.error(err?.response?.data?.message || "حدث خطأ أثناء التسجيل");
                },
              });
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4 bg-white p-6 rounded shadow-md">
                <h3 className="text-lg font-semibold text-center text-text_color">
                  أكمل بيانات الطالب
                </h3>

                <Field
                  name="studentName"
                  placeholder="اسم الطالب"
                  className="block mb-2 p-2 border rounded w-full"
                />
                <ErrorMessage
                  name="studentName"
                  component="div"
                  className="text-red-500 text-sm"
                />

                <Field
                  name="phoneNumber"
                  placeholder="رقم الهاتف"
                  className="block mb-2 p-2 border rounded w-full"
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="text-red-500 text-sm"
                />

                <Field
                  name="email"
                  placeholder="البريد الالكتروني"
                  className="block mb-2 p-2 border rounded w-full"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />

                <Field
                  as="select"
                  name="gender"
                  className="block mb-2 p-2 border rounded w-full"
                >
                  <option value="">اختر الجنس</option>
                  <option value="ذكر">ذكر</option>
                  <option value="أنثى">أنثى</option>
                </Field>
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="text-red-500 text-sm"
                />

                <Field
                  name="city"
                  placeholder="المدينة"
                  className="block mb-2 p-2 border rounded w-full"
                />
                <ErrorMessage
                  name="city"
                  component="div"
                  className="text-red-500 text-sm"
                />

                {duplicateWarning && (
                  <p className="text-red-500 text-sm">{duplicateWarning}</p>
                )}

                <p className="text-sm text-gray-500">
                  التاريخ: {selectedDate} - الوقت: {selectedTime}
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-background hover:bg-[#347d86] transition-all text-white font-bold py-2 px-4 rounded w-full"
                >
                  {isSubmitting ? "جارٍ الحفظ..." : "تأكيد الحجز"}
                </button>
              </Form>
            )}
          </Formik>
        )}

        {showConfirmation && (
          <BookingConfirmation
            date={selectedDate}
            time={selectedTime}
            onClose={() => setShowConfirmation(false)}
          />
        )}
      </div>
    </section>
  );
}
