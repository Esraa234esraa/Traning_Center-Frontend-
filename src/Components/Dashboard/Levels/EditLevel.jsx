import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateLevel } from "../../../Hooks/Levels/useMutationLevel";
import { useGetLevelById } from "../../../Hooks/Levels/useQueryLevel";
import { useGetAllCourses } from "../../../Hooks/Courses/useQueryCourses"; // ✅
import { toast } from "react-toastify";

export default function EditLevel() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useGetLevelById(id);
  const { data: courses, isLoading } = useGetAllCourses(); // ✅ جلب كل الكورسات
  const { mutate: updateLevel } = useUpdateLevel();

  const [formData, setFormData] = useState({
    levelNumber: "",
    name: "",
    courseId: "",
  });

  useEffect(() => {
    if (data?.success) {
      setFormData({
        levelNumber: data.data.levelNumber,
        name: data.data.name,
        courseId: data.data.courseId, // ✅ نحتفظ بالـ ID لاستخدامه في التحديث
      });
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("LevelNumber", formData.levelNumber);
    form.append("Name", formData.name);
    form.append("CourseId", formData.courseId);

    updateLevel(
      { id, formData: form },
      {
        onSuccess: (res) => {
          if (res.success) {
            toast(res.message);
            navigate("/dashboard/levels");
          } else {
            toast(res.message);
          }
        },
      }
    );
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">تعديل المستوى</h2>
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

        {/* ✅ dropdown لاختيار الكورس */}
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
            onClick={() => navigate(-1)}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            رجوع
          </button>
          <button
            type="submit"
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            تحديث
          </button>
        </div>
      </form>
    </div>
  );
}
