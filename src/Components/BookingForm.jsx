import { useState } from "react";

export default function BookingForm({ selectedDate, selectedTime, onSubmit, onLast }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = () => {
    if (!name || !phone) return;
    onSubmit({ name, phone, selectedDate, selectedTime });
  };

  return (
    <div className="p-4 w-[50%] m-auto border rounded">
      <input
        type="text"
        placeholder="اسم الطالب"
        onChange={(e) => setName(e.target.value)}
        className="block mb-2 p-2 border rounded w-full"
      />

      <input
        type="text"
        placeholder="رقم الجوال"
        onChange={(e) => setPhone(e.target.value)}
        className="block mb-2 p-2 border rounded w-full"
      />
      <p className="text-sm text-gray-500 mb-4">
        التاريخ: {selectedDate} - الوقت: {selectedTime}
      </p>

      <div className="flex lg:flex-row justify-between">  <button
        onClick={handleSubmit}
          className="bg-background hover:bg-[#347d86]  transition-all text-white font-bold py-2 px-4 rounded mt-2 w-full"
      >
        تأكيد الحجز
      </button>
        <button
          onClick={onLast}
          className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded mt-2 w-full"
        >
          رجوع
        </button> </div>

    </div>
  );
}
