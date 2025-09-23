import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useUpdateClass } from "../../../Hooks/Classes/useMutationClasses";
import { useGetAllBouquets } from "../../../Hooks/Bouquets/useQueryBouquet";
import Loading from "../../Loading";

export default function EditClassModal({ cls, onClose }) {
  const useUpdateClassMutation = useUpdateClass();
  const { data: bouquets, isLoading: isBouquetsLoading } = useGetAllBouquets();

  const formik = useFormik({
    initialValues: {
      startDate: cls.startDate || "",
      endDate: cls.endDate || "",
      classTime: cls.classTime || "",
      bouquetId: cls.bouquetId || "",
    },
    validationSchema: Yup.object({
      startDate: Yup.date().required("تاريخ البداية مطلوب"),
      endDate: Yup.date()
        .min(Yup.ref("startDate"), "تاريخ النهاية يجب أن يكون بعد البداية")
        .required("تاريخ النهاية مطلوب"),
      classTime: Yup.string().required("وقت الحصة مطلوب"),
      bouquetId: Yup.string().required("يجب اختيار الباقة"),
    }),
    onSubmit: (values) => {
      useUpdateClassMutation.mutate(
        {
          id: cls.id,  
          data: values,  },
        {
          onSuccess: () => {
            toast.success("تم تعديل بيانات الحصة بنجاح");
            onClose();
          },
          onError: (error) => {
            const errorMsg =
              error?.response?.data?.message || "حدث خطأ أثناء التعديل";
            toast.error(errorMsg);
          },
        }
      );
    },
  });

  if (isBouquetsLoading) return <Loading />;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">تعديل الحصة</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-3">
          {/* تاريخ البداية */}
          <div>
            <label className="block mb-1 font-semibold">تاريخ البداية</label>
            <input
              type="date"
              name="startDate"
              value={formik.values.startDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border p-2 rounded w-full"
            />
            {formik.touched.startDate && formik.errors.startDate && (
              <p className="text-red-500 text-sm">{formik.errors.startDate}</p>
            )}
          </div>

          {/* تاريخ النهاية */}
          <div>
            <label className="block mb-1 font-semibold">تاريخ النهاية</label>
            <input
              type="date"
              name="endDate"
              value={formik.values.endDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border p-2 rounded w-full"
            />
            {formik.touched.endDate && formik.errors.endDate && (
              <p className="text-red-500 text-sm">{formik.errors.endDate}</p>
            )}
          </div>

          {/* وقت الحصة */}
          <div>
            <label className="block mb-1 font-semibold">وقت الحصة</label>
            <input
              type="time"
              name="classTime"
              value={formik.values.classTime}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border p-2 rounded w-full"
            />
            {formik.touched.classTime && formik.errors.classTime && (
              <p className="text-red-500 text-sm">{formik.errors.classTime}</p>
            )}
          </div>

          {/* الباقة */}
          <div>
            <label className="block mb-1 font-semibold">اختر الباقة</label>
            <select
              name="bouquetId"
              value={formik.values.bouquetId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border p-2 rounded w-full"
            >
              <option value="">-- اختر باقة --</option>
              {bouquets?.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.bouquetName} | {b.courseName} | المستوى {b.levelNumber}
                </option>
              ))}
            </select>
            {formik.touched.bouquetId && formik.errors.bouquetId && (
              <p className="text-red-500 text-sm">{formik.errors.bouquetId}</p>
            )}
          </div>

          {/* الأزرار */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-3 py-1 rounded"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="bg-primary text-white px-3 py-1 rounded"
              disabled={useUpdateClassMutation.isLoading}
            >
              {useUpdateClassMutation.isLoading ? "جاري الحفظ..." : "حفظ"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
