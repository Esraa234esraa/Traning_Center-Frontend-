import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddLevel } from "../../../Hooks/Levels/useMutationLevel";
import { useGetAllCourses } from "../../../Hooks/Courses/useQueryCourses"; // ✅ hook جلب الكورسات
import { toast } from "react-toastify";

export default function AddLevel() {
  const navigate = useNavigate();
  const { mutate: addLevel } = useAddLevel();
  const { data: courses, isLoading } = useGetAllCourses(); // ✅ استدعاء الكورسات

  const [formData, setFormData] = useState({
    levelNumber: "",
    name: "",
    courseId: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("LevelNumber", formData.levelNumber);
    data.append("Name", formData.name);
    data.append("CourseId", formData.courseId);

    addLevel(data, {
      onSuccess: (res) => {
        if (res.success) {
          toast(res.message);
          navigate("/dashboard/levels"); // ✅ رجوع لصفحة المستويات
        } else {
          toast(res.message);
        }
      },
    });
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">إضافة مستوى جديد</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="رقم المستوى"
          value={formData.levelNumber}
          onChange={(e) =>
            setFormData({ ...formData, levelNumber: e.target.value })
          }
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          placeholder="اسم المستوى"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          className="w-full border p-2 rounded"
          required
        />

        {/* ✅ Dropdown لاختيار الكورس */}
        <select
          value={formData.courseId}
          onChange={(e) =>
            setFormData({ ...formData, courseId: e.target.value })
          }
          className="w-full border p-2 rounded"
          required
        >
          <option value="">اختر الكورس</option>
          {isLoading ? (
            <option disabled>جاري تحميل الكورسات...</option>
          ) : (
            courses?.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))
          )}
        </select>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)} // ✅ زر رجوع
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            رجوع
          </button>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            حفظ
          </button>
        </div>
      </form>
    </div>
  );
}
