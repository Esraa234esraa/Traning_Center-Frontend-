import { useState } from "react";
import { NavLink } from "react-router-dom";
import React from "react";
export default function BookingConfirmation({ date, time }) {
    const [showPopup, setShowPopup] = useState(true);
 
    const handleClose = () => {
        setShowPopup(false);
    };

    return (
        showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                <div className="bg-white p-6 rounded-2xl shadow-lg max-w-sm w-full transition-transform duration-300 scale-100">
                    <h2 className="text-blue-700 text-xl font-semibold mb-2">تم تأكيد الحجز</h2>
                    <p className="text-gray-700 text-base mb-1">
                        تم تأكيد المعاد في يوم <span className="font-bold">{date}</span>
                    </p>
                    <p className="text-gray-700 text-base mb-1">
                        الساعة <span className="font-bold">{time}</span>
                    </p>
                    <p className="text-green-700 text-sm mt-3">هتوصلك رسالة على رقمك بالتفاصيل.</p>
                    <NavLink to="/" onClick={handleClose}>
                        <button
                            className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                        >
                            تم
                        </button>
                    </NavLink>
                </div>
            </div>
        )
    );
}
