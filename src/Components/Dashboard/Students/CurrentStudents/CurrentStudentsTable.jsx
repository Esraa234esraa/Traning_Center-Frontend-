import React, { useState, useMemo } from "react";
import { useGetAllCurrentStudents } from "../../../../Hooks/Students/CurrentStudent/useQueryCurrentStudent";
import { useDeleteCurrentStudent } from "../../../../Hooks/Students/CurrentStudent/useMutationCurrentStudent";
import DeleteModal from "./ConfirmDeleteModal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../../Loading";

export default function CurrentStudentTable() {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllCurrentStudents();
  const deleteMutation = useDeleteCurrentStudent();
    console.log(data);

  const [deleteStudent, setDeleteStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterPaid, setFilterPaid] = useState("all"); // all, paid, unpaid

  const filteredStudents = useMemo(() => {
    
    return data?.data?.filter((student) => {
      const matchesSearch =
        student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.phoneNumber.includes(searchTerm);

      const matchesFilter =
        filterPaid === "all" ||
        (filterPaid === "paid" && student.isPaid) ||
        (filterPaid === "unpaid" && !student.isPaid);

      return matchesSearch && matchesFilter;
    }) || [];
  }, [data, searchTerm, filterPaid]);

  if (isLoading) return <Loading />;

  const handleDeleteConfirm = () => {
    if (!deleteStudent) return;
    deleteMutation.mutate(deleteStudent.id, {
      onSuccess: (res) => toast.success(res.message),
      onError: () => toast.error("حدث خطأ أثناء الحذف"),
      onSettled: () => {
        setIsModalOpen(false);
        setDeleteStudent(null);
      },
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">طلاب الصف الحالي</h1>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
        <button
          className="px-4 py-2 bg-primary text-white rounded hover:bg-text_color transition"
          onClick={() => navigate("/dashboard/students/add-current")}
        >
          إضافة طالب جديد
        </button>

        <div className="flex gap-2 flex-col md:flex-row items-start md:items-center">
          <input
            type="text"
            placeholder="ابحث بالاسم، المدينة أو الهاتف..."
            className="px-4 py-2 border rounded w-full md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="px-4 py-2 border rounded"
            value={filterPaid}
            onChange={(e) => setFilterPaid(e.target.value)}
          >
            <option value="all">الكل</option>
            <option value="paid">المدفوع</option>
            <option value="unpaid">غير المدفوع</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">الاسم</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">الهاتف</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">المدينة</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">الباقة</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">الكورس</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">المستوى</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">الدفع</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStudents.map((student, idx) => {
              const firstClass = student.classes?.[0] || {}; // ناخد الحصة الأولى لو موجودة
              return (
                <tr
                  key={student.id}
                  className={idx % 2 === 0 ? "bg-gray-50 hover:bg-gray-100" : "hover:bg-gray-100"}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.studentName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.phoneNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.city}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {firstClass.bouquetName || "-"} #{firstClass.bouquetNumber || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{firstClass.courseName || "-"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {firstClass.levelName || "-"} ({firstClass.levelNumber || "-"})
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${student.isPaid ? "text-green-600" : "text-red-600"}`}>
                    {student.isPaid ? "نعم" : "لا"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <button
                      className="mr-2 px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
                      onClick={() => navigate(`/dashboard/students/edit/${student.id}`)}
                    >
                      تعديل
                    </button>
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                      onClick={() => { setDeleteStudent(student); setIsModalOpen(true); }}
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>


        </table>
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        studentName={deleteStudent?.studentName}
      />
    </div>
  );
}
