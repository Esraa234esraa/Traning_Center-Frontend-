import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function StudentProfile() {
  const { studentId } = useParams();
  const navigate = useNavigate();

  // بيانات افتراضية - ممكن تجيبها من API أو context
  const student = {
    id: studentId,
    name: "علي محمد",
    phone: "01111344444",
    nationalId: "566765",
    city: "السعودية - الاحساء",
    material: "لغة عربية",
    teacher: "أ. وليد عمر",
    level: 1,
    package: "طالبين",
    paymentStatus: "تم الدفع",
    amount: "1500 ريال",
    startDate: "2025/7/20",
    endDate: "2025/8/20",
  };

  const courses = [
    { id: 1, title: "دورة: الإعراب", teacher: "أ. وليد", level: 1, package: "طالبين" },
    { id: 2, title: "دورة: الإعراب", teacher: "أ. وليد", level: 1, package: "طالبين" },
    { id: 3, title: "دورة: الإعراب", teacher: "أ. وليد", level: 1, package: "طالبين" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* الهيدر */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">الصفحة الشخصية للطالب</h1>
        <button
          onClick={() => navigate(-1)}
          className="text-[#12A4B6] hover:underline"
        >
          رجوع
        </button>
      </div>

      {/* بيانات الطالب الأساسية */}
      <div className="bg-white rounded-lg shadow p-4 mb-6 max-w-md">
        <h2 className="text-lg font-semibold">{student.name}</h2>
        <p className="text-gray-600">الرقم التعريفي للطالب (ID): {student.nationalId}</p>
        <p className="text-gray-600">رقم الهاتف: {student.phone}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* بيانات الدورة */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-md font-bold mb-2">
            اسم المادة التدريبية: {student.material}
          </h3>
          <p>اسم الطالب بالكامل: {student.name}</p>
          <p>اسم ولي الأمر: {student.teacher}</p>
          <p>موعد بداية الدورة التدريبية: {student.startDate}</p>
          <p>موعد انتهاء الدورة التدريبية: {student.endDate}</p>
        </div>

        {/* بيانات الطالب */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-md font-bold mb-2">بيانات الطالب</h3>
          <p>العنوان: {student.city}</p>
          <p>نوع الباقة: {student.package}</p>
          <p>المستوى: {student.level}</p>
          <p>الحصة: الأولى</p>
          <p>اسم معلم المادة: {student.teacher}</p>
          <p>حالة الدفع: {student.paymentStatus}</p>
          <p>المبلغ: {student.amount}</p>
        </div>
      </div>

      {/* الكورسات */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow p-4 text-center">
            <h4 className="font-bold mb-2">{course.title}</h4>
            <p>اسم المعلم: {course.teacher}</p>
            <p>المستوى: {course.level}</p>
            <p>الباقة: {course.package}</p>
            <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
