import React, { useState } from "react";

export default function EditStudentPopup({ isOpen, studentData, onClose, onUpdateStudent }) {
  const [formData, setFormData] = useState(studentData || { name: "", phone: "", city: "" });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateStudent(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 relative">
        <h2 className="text-lg font-cairo mb-4 text-text_color">تعديل بيانات الطالب</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="اسم الطالب"
            className="w-full p-2 border rounded-lg"
            required
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="رقم الهاتف"
            className="w-full p-2 border rounded-lg"
            required
          />
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="المدينة"
            className="w-full p-2 border rounded-lg"
            required
          />
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg">
              إغلاق
            </button>
            <button type="submit" className="px-4 py-2 bg-background text-white rounded-lg">
              حفظ التعديل
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
