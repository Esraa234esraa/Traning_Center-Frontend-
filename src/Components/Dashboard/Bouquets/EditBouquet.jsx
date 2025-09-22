import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useGetBouquetById } from "../../../Hooks/Bouquets/useQueryBouquet";
import { useUpdateBouquet } from "../../../Hooks/Bouquets/useMutationBouquet";
import { useGetAllCourses } from "../../../Hooks/Courses/useQueryCourses";
import { useGetAllLevels } from "../../../Hooks/Levels/useQueryLevel";
import Loading from "../../Loading";

export default function EditBouquet() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetBouquetById(id);
  const { mutate: updateBouquet, isLoading: isUpdating } = useUpdateBouquet();

  const { data: courses, isLoading: loadingCourses } = useGetAllCourses();
  const { data: levels, isLoading: loadingLevels } = useGetAllLevels();

  const formik = useFormik({
    initialValues: {
      bouquetName: "",
      courseId: "",
      levelId: "",
      studentsPackageCount: "",
      money: "",
    },
    validationSchema: Yup.object({
      bouquetName: Yup.string().required("اسم الباقة مطلوب"),
      courseId: Yup.string().required("يجب اختيار الكورس"),
      levelId: Yup.string().required("يجب اختيار المستوى"),
      studentsPackageCount: Yup.number()
        .positive("يجب أن يكون رقمًا موجبًا")
        .required("عدد الطلاب مطلوب"),
      money: Yup.number()
        .positive("السعر يجب أن يكون موجبًا")
        .required("السعر مطلوب"),
    }),
    enableReinitialize: true,
    onSubmit: () => {
      const formData = new FormData();
      formData.append("BouquetName", formik.values.bouquetName);
      formData.append("CourseId", formik.values.courseId);
      formData.append("LevelId", formik.values.levelId);
      formData.append("StudentsPackageCount", formik.values.studentsPackageCount);
      formData.append("Money", formik.values.money);

      updateBouquet(
        { id, formData },
        {
          onSuccess: (res) => {
            if (res.success) {
              toast.success(" تم تعديل الباقة بنجاح");
              navigate("/dashboard/bouquets");
            } else {
              toast.error(res.message || "حدث خطأ أثناء التعديل");
            }
          },
          onError: () => toast.error(" فشل في تعديل الباقة"),
        }
      );
    },
  });

  useEffect(() => {
    if (data) {
      formik.setValues({
        bouquetName: data.bouquetName || "",
        courseId: data.courseId || "",
        levelId: data.levelId || "",
        studentsPackageCount: data.studentsPackageCount || "",
        money: data.money || "",
      });
    }
  }, [data]);

  if (isLoading || loadingCourses || loadingLevels) return <Loading />;
  if (isError) return <p className="text-red-500">فشل تحميل بيانات الباقة</p>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4"> تعديل الباقة</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <input
          type="text"
          name="bouquetName"
          placeholder="اسم الباقة"
          value={formik.values.bouquetName}
          onChange={formik.handleChange}
          className="border p-2 rounded w-full"
        />

        <select
          name="courseId"
          value={formik.values.courseId}
          onChange={formik.handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="">اختر الكورس</option>
          {courses?.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>

        <select
          name="levelId"
          value={formik.values.levelId}
          onChange={formik.handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="">اختر المستوى</option>
          {levels?.data?.map((level) => (
            <option key={level.id} value={level.id}>
              {level.levelName} (رقم {level.levelNumber})
            </option>
          ))}
        </select>

        <input
          type="number"
          name="studentsPackageCount"
          placeholder="عدد الطلاب"
          value={formik.values.studentsPackageCount}
          onChange={formik.handleChange}
          className="border p-2 rounded w-full"
        />

        <input
          type="number"
          name="money"
          placeholder="السعر"
          value={formik.values.money}
          onChange={formik.handleChange}
          className="border p-2 rounded w-full"
        />

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isUpdating}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            {isUpdating ? "جاري التعديل..." : " حفظ التعديلات"}
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
