import React from "react";
import { useParams } from "react-router-dom";
import { useGetCurrentStudentsById } from "../../../../Hooks/Students/CurrentStudent/useQueryCurrentStudent";
import CurrentStudentForm from "./CurrentStudentForm";
import Loading from "../../../Loading";

export default function EditCurrentStudentForm() {
  const { id } = useParams(); // اسم الباراميتر في Route لازم يكون :id
  const { data, isLoading, isError } = useGetCurrentStudentsById(id);

  if (isLoading) return <Loading />;

  if (isError || !data?.data) {
    return <div className="p-6 text-red-600 font-semibold">❌ لم يتم العثور على بيانات الطالب</div>;
  }

  const student = Array.isArray(data?.data?.result)
    ? data?.data?.result[0]
    : data?.data?.result;

  const initialValues = {
    id: student?.id,
    StudentName: student?.studentName || "",
    PhoneNumber: student?.phoneNumber || "",
    Email: student?.email || "",
    City: student?.city || "",
    Gender: student?.gender || "",
    IsPaid: student?.isPaid || false,
    ClassId: student?.classes?.[0]?.classId || "",
    CourseId: student?.classes?.[0]?.courseId || "",
    LevelId: student?.classes?.[0]?.levelId || "",
    BouquetId: student?.classes?.[0]?.bouquetId || "",
  };


  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">تعديل بيانات الطالب</h1>
      <div className="bg-white shadow rounded p-4">
        <CurrentStudentForm
          initialValues={initialValues}
          isEdit={true}
        />
      </div>
    </div>
  );
}
