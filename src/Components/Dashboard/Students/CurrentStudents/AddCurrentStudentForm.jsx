import React from "react";
import CurrentStudentForm from "./CurrentStudentForm";

export default function AddCurrentStudentForm() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">إضافة طالب جديد</h1>
      <div className="bg-white shadow rounded p-4">
        <CurrentStudentForm
          initialValues={{
            StudentName: "",
            Email: "",
            PhoneNumber: "",
            City: "",
            Gender: "",
            IsPaid: false,
            ClassId: "",
          }}
          isEdit={false}
          onClose={() => window.history.back()} // للرجوع للجدول بعد الإضافة
        />
      </div>
    </div>
  );
}
