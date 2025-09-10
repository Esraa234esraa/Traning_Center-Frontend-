import { useState } from "react";

export default function TimeSlotPicker({
  selectedDate,
  unavailableSlots,
  onTimeSelect,
  onNext,
  onLast
}) {
  const [selected, setSelected] = useState("");

  if (!selectedDate) return null;

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

  const handleSelect = (time) => {
    setSelected(time);
    onTimeSelect(time);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        {generateSlots().map((time) => (
          <button
            key={time}
            onClick={() => handleSelect(time)}
            disabled={unavailableSlots.includes(time)}
            className={`p-2 rounded border text-sm ${
              unavailableSlots.includes(time)
                ? "bg-red-200 cursor-not-allowed"
                : selected === time
                ? "bg-background text-white"
                : "bg-white hover:bg-blue-100"
            }`}
          >
            {time}
          </button>
        ))}
      </div>

 {selected && (
  <div className="text-right mt-4 flex justify-end gap-2">
    <button
      onClick={onLast}
      className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded transition"
    >
      رجوع
    </button>
    <button
      onClick={onNext}
      className="bg-secondary hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded transition"
    >
      التالي
    </button>
  </div>
)}


    </div>
  
  );
}
