import React from "react";
import { Link } from "react-router-dom";
import { LockKeyhole } from "lucide-react";

function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      {/* Icon */}
      <div className="bg-red-100 p-6 rounded-full mb-6 shadow-md">
        <LockKeyhole className="w-16 h-16 text-red-500" />
      </div>

      {/* Text */}
      <h1 className="text-3xl md:text-4xl font-bold text-red-500 mb-4">
        🚫 غير مصرح لك بالدخول
      </h1>
      <p className="text-gray-600 text-lg mb-6">
        ليس لديك صلاحية للوصول إلى هذه الصفحة.
      </p>

      {/* Actions */}
      <div className="flex gap-4">
        <Link
          to="/"
          className="px-6 py-3 bg-[#12A4B6] text-white font-medium rounded-lg shadow hover:bg-[#0e7f8d] transition"
        >
          العودة للرئيسية
        </Link>
        <Link
          to="/login"
          className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg shadow hover:bg-gray-300 transition"
        >
          تسجيل الدخول
        </Link>
      </div>
    </div>
  );
}

export default Unauthorized;
