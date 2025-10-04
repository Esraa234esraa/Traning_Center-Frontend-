import React, { useState, useMemo, useEffect } from "react";
import { useGetAllCurrentStudents } from "../../../../Hooks/Students/CurrentStudent/useQueryCurrentStudent";
import { useDeleteCurrentStudent } from "../../../../Hooks/Students/CurrentStudent/useMutationCurrentStudent";
import DeleteModal from "./ConfirmDeleteModal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../../Loading";

export default function CurrentStudentTable() {
  const navigate = useNavigate();
  const deleteMutation = useDeleteCurrentStudent();

  const [deleteStudent, setDeleteStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterPaid, setFilterPaid] = useState("all"); // all, paid, unpaid
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // عدد الصفوف لكل صفحة

  const { data, isLoading, isFetching } = useGetAllCurrentStudents(
    searchTerm,
    page,
    pageSize
  );

  // Debug
  useEffect(() => {
    console.log("Hook Response:", data);
    if (data?.data?.data?.result) {
      console.log("Updated Result:", data?.data?.data.result);
    }
  }, [data]);

  const Spinner = () => (
    <svg
      className="animate-spin h-4 w-4 text-gray-600"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
  );

  // الطلاب بعد الفلترة
  const filteredStudents = useMemo(() => {
    const students = data?.data?.data?.result || [];

    return students.filter((student) => {
      const matchesSearch =
        student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.phoneNumber.includes(searchTerm);

      const matchesFilter =
        filterPaid === "all" ||
        (filterPaid === "paid" && student.isPaid) ||
        (filterPaid === "unpaid" && !student.isPaid);

      return matchesSearch && matchesFilter;
    });
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

      {/* البحث والفلاتر */}
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

      {/* جدول الطلاب */}
      <div className="overflow-x-auto bg-white shadow rounded">
        {filteredStudents.length === 0 ? (
          <div className="p-6 text-center text-gray-500">لا يوجد طلاب</div>
        ) : (
          <>
            {isFetching && (
              <div className="text-gray-500 text-sm px-4 py-2">
                جارٍ تحميل البيانات...
              </div>
            )}

            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الاسم
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الهاتف
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المدينة
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الباقة
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الكورس
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المستوى
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الدفع
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student, idx) => {
                  const firstClass = student.classes?.[0] || {};
                  return (
                    <tr
                      key={student.id}
                      className={
                        idx % 2 === 0
                          ? "bg-gray-50 hover:bg-gray-100"
                          : "hover:bg-gray-100"
                      }
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.studentName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.phoneNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.city}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {firstClass.bouquetName || "-"} #
                        {firstClass.bouquetNumber || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {firstClass.courseName || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {firstClass.levelName || "-"} (
                        {firstClass.levelNumber || "-"})
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${
                          student.isPaid ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {student.isPaid ? "نعم" : "لا"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <button
                          className="mr-2 px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
                          onClick={() =>
                            navigate(`/dashboard/students/edit/${student.id}`)
                          }
                        >
                          تعديل
                        </button>
                        <button
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                          onClick={() => {
                            setDeleteStudent(student);
                            setIsModalOpen(true);
                          }}
                        >
                          حذف
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}

        {/* الباجينيشن */}
        <div className="flex items-center justify-between mt-4">
          {/* Page Size Selector */}
          <div>
            <label className="mr-2">عدد الصفوف:</label>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              className="border rounded px-2 py-1"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>

          {/* Pagination Buttons */}
          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              السابق
            </button>
            <span>
              صفحة {page} من {data?.data?.data?.totalPages || 1}
            </span>
            <button
              disabled={page >= (data?.data?.data?.totalPages || 1)}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 flex items-center gap-2"
            >
              {isFetching &&
              page < (data?.data?.data?.totalPages || 1) ? (
                <>
                  <Spinner /> تحميل...
                </>
              ) : (
                "التالي"
              )}
            </button>
          </div>
        </div>
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
