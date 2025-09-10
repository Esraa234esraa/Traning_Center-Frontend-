import { toast } from "react-toastify";
import React from "react";

export default function CalendarCard({ selectedDate, onDateChange, onNext }) {
  const handleDateChange = (e) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // خلي الساعة 0 عشان المقارنة تكون دقيقة

    const date = new Date(e.target.value);
    const day = date.getDay();

    // منع اختيار أيام الجمعة والسبت
    if (day === 5 || day === 6) {
      toast.error("الجمعة والسبت غير متاحين");
      return;
    }

    // منع اختيار أي تاريخ قبل اليوم
    if (date < today) {
      toast.error("لا يمكنك اختيار تاريخ في الماضي");
      return;
    }

    onDateChange(e.target.value);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 shadow-lg rounded-2xl flex flex-col md:flex-row items-center gap-8">
      {/* النص */}
      <div className="w-full md:w-1/2 space-y-4 text-right">
        <h2 className="text-2xl font-bold text-text_color">
          مركز اللغة المثالية للتدريب
        </h2>
        <p className="text-secondary text-lg">
          حدد موعدك معنا لاختيار الدورة الأنسب لطفلك
        </p>
        <p className="text-gray-500 text-sm leading-loose">
          يمكنك الآن حجز موعد لزيارة المركز لمقابلة فريقنا التعليمي وتحديد مستوى الطالب بدقة، لنساعده في اختيار الدورة المناسبة لقدراته واحتياجاته.
        </p>
        <p className="text-sm font-semibold text-primary">المدة: 15 دقيقة</p>
        {selectedDate && (
          <button
            onClick={onNext}
            className="mt-4 bg-secondary hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded transition"
          >
            التالي
          </button>
        )}
      </div>

      {/* التقويم */}
      <div className="w-full md:w-1/2 flex lg:flex-col justify-center">
      <label className="p-3 lg:text-start  w-full max-w-xs text-center"> اختر اليوم المناسب </label>
       
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          min={new Date().toISOString().split("T")[0]} // كمان ممكن تحددي في الـ input نفسه الحد الأدنى
          className="p-3 border border-gray-300 rounded-lg w-full max-w-xs text-center"
        />
      </div>
    </div>
  );
}
