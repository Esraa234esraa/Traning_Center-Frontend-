import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      {/* Icon */}
      <div className="bg-red-100 p-6 rounded-full mb-6 shadow-md">
        <AlertTriangle className="w-16 h-16 text-red-500" />
      </div>

      {/* Text */}
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        الصفحة غير موجودة
      </h2>
      <p className="text-gray-500 text-center mb-6 max-w-md">
        عذرًا! الصفحة التي تبحث عنها غير متوفرة أو تم نقلها إلى مكان آخر.
      </p>

      {/* Button */}
      <Link
        to="/"
        className="px-6 py-3 bg-[#12A4B6] text-white font-medium rounded-lg shadow hover:bg-[#0e7f8d] transition"
      >
        الرجوع إلى الصفحة الرئيسية
      </Link>
    </div>
  );
}
