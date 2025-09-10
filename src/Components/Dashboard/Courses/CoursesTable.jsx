import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../../../assets/images/تاسيس الطلاب فى النحو 1.png";
import img2 from "../../../assets/images/علاج اضرابات النطق 1.png";
import img3 from "../../../assets/images/مهارات القراءه 2.png";
import LoadingPage from "../../Loading";

export default function CoursesTable() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courseToDelete, setCourseToDelete] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      // نجيب الدورات من localStorage
      const storedCourses = JSON.parse(localStorage.getItem("courses"));

      if (storedCourses && storedCourses.length > 0) {
        setCourses(storedCourses);
      } else {
        // لو مفيش داتا نخزن الافتراضي
        const defaultCourses = [
          {
            id: 1,
            name: "علاج اضطرابات النطق واللغة",
            description:
              "تأسيس الطلاب في الإعراب بأسلوب واضح وتطبيقي يضمن فهم القواعد من الأساس، مع متابعة مستمرة تعزز ثقة الطفل وتساعده على التميز الدراسي.",
            visible: true,
            image: img2,
          },
          {
            id: 2,
            name: "تأسيس الطلاب في الإعراب",
            description:
              "تعليم قواعد الإعراب خطوة بخطوة بأسلوب مبسط يساعد الطالب على فهم الأساسيات وتطبيقها بثقة.",
            visible: true,
            image: img1,
          },
          {
            id: 3,
            name: "تقوية مهارات القراءة للأطفال",
            description:
              "تأسيس قوي للقراءة في وقت قصير، مع تعليم القواعد بأساليب مبتكرة ودورات تفاعلية تناسب كل الأعمار.",
            visible: false,
            image: img3,
          },
        ];
        setCourses(defaultCourses);
        localStorage.setItem("courses", JSON.stringify(defaultCourses));
      }
      setLoading(false);
    }, 1000);
  }, []);

  const confirmDelete = (id) => {
    setCourseToDelete(id);
  };

  const handleDelete = () => {
    const updatedCourses = courses.filter((c) => c.id !== courseToDelete);
    setCourses(updatedCourses);
    localStorage.setItem("courses", JSON.stringify(updatedCourses));
    setCourseToDelete(null);
  };

  const toggleVisibility = (id) => {
    const updatedCourses = courses.map((c) =>
      c.id === id ? { ...c, visible: !c.visible } : c
    );
    setCourses(updatedCourses);
    localStorage.setItem("courses", JSON.stringify(updatedCourses));
  };

  return (
    <div className="p-6">
      <button
        onClick={() => navigate("/dashboard/courses/add-course")}
        className="bg-background text-white px-4 py-2 rounded-lg mb-4"
      >
        إضافة دورة تدريبية
      </button>

      {/* لودينج */}
      {loading ? (
        <LoadingPage />
      ) : courses.length === 0 ? (
        <div className="text-center py-20">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="not found"
            className="w-40 mx-auto mb-4 opacity-70"
          />
          <p className="text-gray-600 text-lg">لا توجد دورات تدريبية</p>
        </div>
      ) : (
        <table className="w-full border border-gray-300 shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">الصورة</th>
              <th className="p-2 border">اسم الدورة</th>
              <th className="p-2 border">الوصف</th>
              <th className="p-2 border">الحالة</th>
              <th className="p-2 border">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="text-center">
                <td className="border p-2">
                  <img
                    src={
                      typeof course.image === "string"
                        ? course.image
                        : URL.createObjectURL(course.image)
                    }
                    alt={course.name}
                    className="w-20 h-14 object-cover rounded-md mx-auto"
                  />
                </td>
                <td className="border p-2">{course.name}</td>
                <td className="border p-2">{course.description}</td>
                <td className="border p-2">
                  {course.visible ? "ظاهر" : "مخفي"}
                </td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => navigate(`edit-course/${course.id}`)}
                    className="text-blue-500 px-2 py-1 rounded"
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => confirmDelete(course.id)}
                    className="text-red-500 px-2 py-1 rounded"
                  >
                    حذف
                  </button>
                  <button
                    onClick={() => toggleVisibility(course.id)}
                    className="text-yellow-500 px-2 py-1 rounded"
                  >
                    {course.visible ? "إخفاء" : "إظهار"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* بوب اب الحذف */}
      {courseToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
            <h2 className="text-lg font-bold mb-4">تأكيد الحذف</h2>
            <p className="text-gray-600 mb-6">
              هل أنت متأكد أنك تريد حذف هذه الدورة؟
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                نعم، احذف
              </button>
              <button
                onClick={() => setCourseToDelete(null)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
