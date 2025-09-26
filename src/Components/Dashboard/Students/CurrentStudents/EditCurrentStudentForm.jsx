import React from "react";
import { useParams } from "react-router-dom";
import { useGetAllCurrentStudents } from "../../../../Hooks/Students/CurrentStudent/useQueryCurrentStudent";
import CurrentStudentForm from "./CurrentStudentForm";
import Loading from "../../../Loading";

export default function EditCurrentStudentForm() {
  const { id } = useParams();
  const { data, isLoading } = useGetAllCurrentStudents();

 

  if (isLoading) return <Loading />;

  const student = data?.data?.data.find((s) => s.id === id);

  if (!student) return <div>الطالب غير موجود</div>;

  // تجهيز initialValues بحيث تكون كاملة ومتوافقة مع الفورم
  const initialValues = {
    StudentName: student.studentName || "",
    PhoneNumber: student.phoneNumber || "",
    Email: student.email || "",
    City: student.city || "",
    Gender: student.gender || "",
    ClassId: student.classes?.[0]?.classId || "", // لو عنده أكثر من حصة خذ أول حصة
    bouquetName: student.classes?.[0]?.bouquetName || "",
    bouquetNumber: student.classes?.[0]?.bouquetNumber || 0,
    courseName: student.classes?.[0]?.courseName || "",
    levelName: student.classes?.[0]?.levelName || "",
    levelNumber: student.classes?.[0]?.levelNumber || 0,
    classTime: student.classes?.[0]?.classTime || "",
    currentStudentsCount: student.classes?.[0]?.currentStudentsCount || 0,
    IsPaid: student.isPaid || false,
    id: student.id, // ضروري لو الفورم يحتاج ID للتعديل
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">تعديل بيانات الطالب</h1>
      <div className="bg-white shadow rounded p-4">
        <CurrentStudentForm
          initialValues={initialValues}
          isEdit={true}
          onClose={() => window.history.back()} // للرجوع للجدول بعد التعديل
        />
      </div>
    </div>
  );
}
