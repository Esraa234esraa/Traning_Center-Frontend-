import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAddNewStudent } from "../Hooks/Students/NewStudents/useMutationNewStudent";
import { useGetAllStudents } from "../Hooks/Students/NewStudents/useQueryNewStudent";
import Loading from "../Components/Loading";
import BookingConfirmation from "./BookingConfirmation";

export default function Booking() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [unavailableSlots, setUnavailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState("");

  const addNewStudentMutation = useAddNewStudent();
  const { data: studentsData } = useGetAllStudents();

  // تحديث الأوقات المحجوزة والتحقق من التكرار
  useEffect(() => {
    if (selectedDate && studentsData?.data) {
      const booked = studentsData.data
        .filter((s) => s.date === selectedDate)
        .map((s) => s.time.substring(0, 5)); // 🟢 تعديل مهم
      setUnavailableSlots(booked);

      const duplicate = studentsData.data.find(
        (s) => s.phoneNumber === phone
      );
      setDuplicateWarning(duplicate ? "هذا الطالب موجود مسبقًا!" : "");
    }
  }, [selectedDate, studentsData, name, phone]);

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

  // معالجة الحجز
  const handleSubmit = () => {
    if (!name || !phone || !selectedGender || !city || !selectedDate || !selectedTime) {
      toast.error("يرجى ملء جميع البيانات!");
      return;
    }
    if (duplicateWarning) return;

    const payload = {
      studentName: name,
      phoneNumber: phone,
      gender: selectedGender,
      city,
      date: selectedDate,
      time: selectedTime.length === 5 ? `${selectedTime}:00` : selectedTime,
      status: 0,
    };

    setLoading(true);
    addNewStudentMutation.mutate(payload, {
      onSuccess: (res) => {
        setLoading(false);

        if (res?.data.success) {
          toast.success(res.data.message || "تم التسجيل بنجاح ");
          setUnavailableSlots((prev) => [...prev, selectedTime]);
          setShowConfirmation(true);
        } else {
          toast.error(res?.data.message || "حدث خطأ أثناء التسجيل");
        }
      },
      onError: (error) => {
        setLoading(false);
        toast.error(error?.response?.data?.message || "حدث خطأ أثناء التسجيل");
      },
    });
  };

  if (loading) return <Loading />;

  return (
    <section className="md:mt-[10rem] mt-[7rem] mb-10">
      <div className="pt-12 my-[5%] max-w-4xl mx-auto bg-blue-50 p-6 md:p-10 shadow-lg rounded-2xl space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-text_color text-center mb-4">
            حجز موعد في مركز اللغة المثالية
          </h2>
          <p className="text-center text-gray-600">
            اختر اليوم والوقت المناسبين لك لإجراء اختبار تحديد المستوى
        .
          </p>
          
        </div>


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
          <div className="space-y-4 bg-white p-6 rounded shadow-md">
            <h3 className="text-lg font-semibold text-center text-text_color">
              أكمل بيانات الطالب
            </h3>
            <input
              type="text"
              placeholder="اسم الطالب"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block mb-2 p-2 border rounded w-full"
            />
            <input
              type="text"
              placeholder="رقم الهاتف"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="block mb-2 p-2 border rounded w-full"
            />
            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="block mb-2 p-2 border rounded w-full"
            >
              <option value="">اختر الجنس</option>
              <option value="ذكر">ذكر</option>
              <option value="أنثى">أنثى</option>
            </select>
            <input
              type="text"
              placeholder="المدينة"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="block mb-2 p-2 border rounded w-full"
            />

            {duplicateWarning && (
              <p className="text-red-500 text-sm">{duplicateWarning}</p>
            )}

            <p className="text-sm text-gray-500">
              التاريخ: {selectedDate} - الوقت: {selectedTime}
            </p>

            <button
              onClick={handleSubmit}
              disabled={duplicateWarning}
              className="bg-background hover:bg-[#347d86] transition-all text-white font-bold py-2 px-4 rounded w-full"
            >
              تأكيد الحجز
            </button>
          </div>
        )}

        {showConfirmation && (
          <BookingConfirmation
            date={selectedDate}
            time={selectedTime}
            onClose={() => setShowConfirmation(false)}
          />
        )}
      </div></section>

  );
}
