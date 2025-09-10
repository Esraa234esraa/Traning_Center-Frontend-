import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function EditSession() {
  const { sessionId, teacherId, teacherName } = useParams(); // ناخد بيانات المدرس والحصة
  const navigate = useNavigate();

  const [session, setSession] = useState({
    time: "5 مساءا",
    startDate: "2025-08-20",
    endDate: "2025-08-30",
    status: "تحت الانتظار",
    students: [
      { id: 1, name: "أحمد محمد" },
      { id: 2, name: "سارة علي" },
    ],
    packageSize: 3,
  });

  // تحديث حالة الحصة بناءً على الطلاب والباقه
  const updateSession = (students, newPackageSize = session.packageSize) => {
    let newStatus = "تحت الانتظار";
    if (students.length === 0) newStatus = "فارغة";
    else if (students.length === newPackageSize) newStatus = "مكتملة";

    setSession((prev) => ({
      ...prev,
      students,
      status: newStatus,
      packageSize: newPackageSize,
    }));
  };

  // عند الحفظ يرجع لصفحة الحصص للمدرس
  const handleSave = (e) => {
    e.preventDefault();
    // هنا ممكن تبعتي البيانات لـ API أو localStorage
    navigate(
      `/dashboard/teacher-sessions/${teacherId}/${encodeURIComponent(
        teacherName
      )}`
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-6 shadow-md rounded-lg bg-white">
      <h2 className="text-xl font-bold mb-4">
        تعديل بيانات الحصة رقم {sessionId}
      </h2>

      <form className="space-y-4" onSubmit={handleSave}>
        {/* وقت الحصة */}
        <div>
          <label className="block font-semibold mb-1">وقت الحصة:</label>
          <input
            type="text"
            value={session.time}
            onChange={(e) => setSession({ ...session, time: e.target.value })}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* تاريخ البداية */}
        <div>
          <label className="block font-semibold mb-1">تاريخ البداية:</label>
          <input
            type="date"
            value={session.startDate}
            onChange={(e) =>
              setSession({ ...session, startDate: e.target.value })
            }
            className="border p-2 rounded w-full"
          />
        </div>

        {/* تاريخ النهاية */}
        <div>
          <label className="block font-semibold mb-1">تاريخ النهاية:</label>
          <input
            type="date"
            value={session.endDate}
            onChange={(e) =>
              setSession({ ...session, endDate: e.target.value })
            }
            className="border p-2 rounded w-full"
          />
        </div>

        {/* حالة الحصة */}
        <div>
          <label className="block font-semibold mb-1">حالة الحصة:</label>
          <input
            type="text"
            value={session.status}
            readOnly
            className="border p-2 rounded w-full bg-gray-100"
          />
        </div>

        {/* حجم الباقة */}
        <div>
          <label className="block font-semibold mb-1">عدد الطلاب في الباقة:</label>
          <input
            type="number"
            value={session.packageSize}
            min="1"
            onChange={(e) =>
              updateSession(session.students, parseInt(e.target.value))
            }
            className="border p-2 rounded w-full"
          />
        </div>

        {/* الطلاب */}
        <div>
          <label className="block font-semibold mb-1">الطلاب:</label>
          <ul className="list-disc ml-5">
            {session.students.map((student) => (
              <li key={student.id}>{student.name}</li>
            ))}
          </ul>
        </div>

        {/* الأزرار */}
        <div className="flex justify-between mt-6">
          <Link
            to={`/dashboard/teacher-sessions/${teacherId}/${encodeURIComponent(
              teacherName
            )}`}
            className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
          >
            رجوع
          </Link>

          <button
            type="submit"
            className="px-4 py-2 bg-[#12A4B6] hover:bg-[#0e7f8d] text-white rounded-lg transition"
          >
            حفظ التعديلات
          </button>
        </div>
      </form>
    </div>
  );
}
