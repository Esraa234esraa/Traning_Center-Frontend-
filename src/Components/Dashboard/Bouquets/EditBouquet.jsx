import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetBouquetById } from "../../../Hooks/Bouquets/useQueryBouquet";
import { useUpdateBouquet } from "../../../Hooks/Bouquets/useMutationBouquet";
import Loading from "../../Loading";

export default function EditBouquet() {
  const { id } = useParams(); // 🔹 ID من الرابط
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetBouquetById(id);
  const { mutate: updateBouquet, isLoading: isUpdating } = useUpdateBouquet();

  // 🔹 state للفورم
  const [form, setForm] = useState({
    bouquetName: "",
    courseId: "",
    levelId: "",
    studentsPackageCount: "",
    money: "",
  });

  // ⏬ تحميل البيانات في الفورم
  useEffect(() => {
    if (data?.success && data.data) {
      setForm({
        bouquetName: data.data.bouquetName,
        courseId: data.data.courseId,
        levelId: data.data.levelId,
        studentsPackageCount: data.data.studentsPackageCount,
        money: data.data.money,
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBouquet(
      { id, ...form },
      {
        onSuccess: () => {
          navigate("/dashboard/bouquets");
        },
      }
    );
  };

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-red-500">فشل تحميل بيانات الباقة</p>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">✏️ تعديل الباقة</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">اسم الباقة</label>
          <input
            type="text"
            name="bouquetName"
            value={form.bouquetName}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">الكورس</label>
          <input
            type="text"
            name="courseId"
            value={form.courseId}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">المستوى</label>
          <input
            type="text"
            name="levelId"
            value={form.levelId}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">عدد الطلاب</label>
          <input
            type="number"
            name="studentsPackageCount"
            value={form.studentsPackageCount}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">السعر</label>
          <input
            type="number"
            name="money"
            value={form.money}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isUpdating}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            {isUpdating ? "جاري التعديل..." : "💾 حفظ التعديلات"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/dashboard/bouquets")}
            className="bg-gray-400 text-white px-4 py-2 rounded-lg"
          >
            إلغاء
          </button>
        </div>
      </form>
    </div>
  );
}
