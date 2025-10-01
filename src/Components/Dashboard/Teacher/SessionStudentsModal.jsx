import React from "react";

export default function SessionStudentsModal({ session, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg animate-fadeIn">
        <h4 className="text-lg font-bold mb-4 text-gray-800">
          طلاب الحصة
        </h4>

        {session.students?.length > 0 ? (
          <ul className="space-y-2">
            {session.students.map((s) => (
              <li
                key={s.id}
                className="p-2 border rounded bg-gray-50 hover:bg-gray-100"
              >
                <span className="font-medium">{s.fullName}</span> {" "}
                <span className="text-gray-600">{s.phoneNumber}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">لا يوجد طلاب في هذه الحصة</p>
        )}

        <button
          className="mt-6 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg w-full transition"
          onClick={onClose}
        >
          إغلاق
        </button>
      </div>
    </div>
  );
}
