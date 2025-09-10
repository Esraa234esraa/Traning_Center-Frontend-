import { useState } from "react";
import CalendarCard from "./Calender";
import TimeSlotPicker from "./TimeSlotPicker";
import BookingForm from "./BookingForm";
import Loading from "../Components/Loading";
import BookingConfirmation from "./BookingConfirmation";

export default function Booking() {
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [unavailableSlots, setUnavailableSlots] = useState(["15:15"]);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleSubmit = async (data) => {
        setLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setShowConfirmation(true);
            setUnavailableSlots((prev) => [...prev, data.selectedTime]);
        } catch (error) {
            console.error("خطأ:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="pt-12 my-[10%] max-w-4xl mx-auto bg-blue-50 p-6 md:p-10 shadow-lg rounded-2xl space-y-6 transition-all duration-300">
            {step === 1 && (
                <CalendarCard
                    selectedDate={selectedDate}
                    onDateChange={setSelectedDate}
                    onNext={() => selectedDate && setStep(2)}
                />
            )}

            {step === 2 && selectedDate && (
                <div className="space-y-6">
                    <div >
                        <h3 className="text-lg font-semibold mb-2 text-center text-text_color">
                            اختر الوقت المناسب
                        </h3>
                        <TimeSlotPicker
                            selectedDate={selectedDate}
                            unavailableSlots={unavailableSlots}
                            onTimeSelect={setSelectedTime}
                            onNext={() => setStep(3)}
                            onLast={() => setStep(1)}
                        />

                    </div>


                </div>
            )}


            {step === 3 && selectedTime && (
                <div className="space-y-6 bg-white p-6 rounded shadow-md">
                    <h3 className="text-lg font-semibold mb-2 text-center text-text_color">
                        أكمل بيانات الطالب
                    </h3>
                    <BookingForm
                        selectedDate={selectedDate}
                        selectedTime={selectedTime}
                        onSubmit={handleSubmit}
                        onLast={() => setStep(2)}
                    />
                </div>
            )}
            {showConfirmation && (
                <BookingConfirmation
                    date={selectedDate}
                    time={selectedTime}
                    onClose={() => setShowConfirmation(false)}
                />
            )}

        </div>
    );
}
