import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useAddClass } from "../../../Hooks/Classes/useMutationClasses";
import { useGetAllBouquets } from "../../../Hooks/Bouquets/useQueryBouquet";
import Loading from "../../Loading";

export default function AddClass() {
  const navigate = useNavigate();
  const { mutate, isLoading } = useAddClass();
  const { data: bouquets, isLoading: isBouquetsLoading } = useGetAllBouquets();

  const formik = useFormik({
    initialValues: {
      startDate: "",
      endDate: "",
      classTime: "",
      bouquetId: "",
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
      // تحويل التاريخ والوقت للتوافق مع backend
      const payload = {
        bouquetId: values.bouquetId,
        startDate: values.startDate + "T00:00:00", // فقط التاريخ
        endDate: values.endDate + "T00:00:00",
        classTime: values.classTime + ":00", // تحويل "HH:mm" → "HH:mm:ss"
      };

      mutate(payload, {
        onSuccess: (res) => {
          if (res.success) {
            toast.success(" تم إضافة الحصة بنجاح");
            navigate("/dashboard/classes");
          } else {
            toast.error(res.message || " حدث خطأ أثناء الإضافة");
          }
        },
        onError: () => toast.error(" فشل في إضافة الحصة"),
      });
    },
  });

  const hoursOptions = Array.from({ length: 24 }, (_, i) =>
    `${i.toString().padStart(2, "0")}:00`
  );

  if (isBouquetsLoading) return <Loading />;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">إضافة حصة جديدة</h2>

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
          <select
            name="classTime"
            value={formik.values.classTime}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border p-2 rounded w-full"
          >
            <option value="">-- اختر وقت الحصة --</option>
            {hoursOptions.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
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

        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-lg"
          disabled={isLoading}
        >
          {isLoading ? " جارٍ الإضافة..." : " إضافة"}
        </button>
      </form>
    </div>
  );
}
