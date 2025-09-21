import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddBouquet } from "../../../Hooks/Bouquets/useMutationBouquet";

export default function AddBouquet() {
  const navigate = useNavigate();
  const { mutate: addBouquet } = useAddBouquet();

  const [formData, setFormData] = useState({
    bouquetName: "",
    courseId: "",
    levelId: "",
    studentsPackageCount: "",
    money: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("BouquetName", formData.bouquetName);
    form.append("CourseId", formData.courseId);
    form.append("LevelId", formData.levelId);
    form.append("StudentsPackageCount", formData.studentsPackageCount);
    form.append("Money", formData.money);

    addBouquet(form, {
      onSuccess: (res) => {
        if (res.success) {
          alert(res.message);
          navigate("/bouquets");
        } else {
          alert(res.message);
        }
      },
    });
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">➕ إضافة باقة</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="اسم الباقة"
          value={formData.bouquetName}
          onChange={(e) => setFormData({ ...formData, bouquetName: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="CourseId"
          value={formData.courseId}
          onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="LevelId"
          value={formData.levelId}
          onChange={(e) => setFormData({ ...formData, levelId: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="عدد الطلاب"
          value={formData.studentsPackageCount}
          onChange={(e) => setFormData({ ...formData, studentsPackageCount: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="السعر"
          value={formData.money}
          onChange={(e) => setFormData({ ...formData, money: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />

        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          حفظ
        </button>
      </form>
    </div>
  );
}
