import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetExternalCourseById } from "../../../Hooks/ExternalCourses/useQueryExternalCourse";
import { useUpdateExternalCourse } from "../../../Hooks/ExternalCourses/useMutationExternalCourse";
import { toast } from "react-toastify";
import Loading from "../../Loading";
import { getImageUrl } from "../../../Utils/getImageUrl"; // ✅ علشان نجيب الصورة من المسار الصحيح

export default function EditExternalCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetExternalCourseById(id);
  const updateMutation = useUpdateExternalCourse();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState(null); // ✅ للمعاينة

  // تحميل بيانات الدورة
  useEffect(() => {
    if (data?.data?.data) {
      const courseData = data.data.data;
      setFormData({
        name: courseData.name || "",
        description: courseData.description || "",
        image: null,
      });

      // ✅ الصورة الأصلية (من السيرفر)
      if (courseData.filePath) {
        setPreview(getImageUrl(courseData.filePath));
      }
    }
  }, [data]);

  // عند اختيار صورة جديدة
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("Name", formData.name);
    fd.append("Description", formData.description);
    if (formData.image) fd.append("Image", formData.image);

    updateMutation.mutate(
      { id, formData: fd },
      {
        onSuccess: () => {
          toast.success("✅ تم التعديل بنجاح");
          navigate("/dashboard/external-courses");
        },
        onError: () => toast.error("❌ حدث خطأ أثناء التعديل"),
      }
    );
  };

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-red-500">حدث خطأ أثناء تحميل البيانات</p>;

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">تعديل الدورة</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full"
        />

        {/* ✅ معاينة الصورة */}
        {preview && (
          <div className="mt-2">
            <p className="text-sm text-gray-500 mb-1">معاينة الصورة:</p>
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded border"
            />
          </div>
        )}

        <div className="flex gap-2 mt-4">
          <button
            type="submit"
            disabled={updateMutation.isPending}
            className="px-4 py-2 bg-yellow-500 text-white rounded"
          >
            {updateMutation.isPending ? "جارٍ الحفظ..." : "حفظ"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/dashboard/external-courses")}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            إلغاء
          </button>
        </div>
      </form>
    </div>
  );
}
