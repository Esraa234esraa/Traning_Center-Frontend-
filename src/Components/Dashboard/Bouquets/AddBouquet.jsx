import React from "react";
import { useNavigate } from "react-router-dom";
import { useAddBouquet } from "../../../Hooks/Bouquets/useMutationBouquet";
import { useGetAllCourses } from "../../../Hooks/Courses/useQueryCourses";
import { useGetAllLevelsOfCourse } from "../../../Hooks/Levels/useQueryLevel";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Loading from "../../Loading";

// ✅ مخطط التحقق Yup
const validationSchema = Yup.object({
  bouquetName: Yup.string().required("اسم الباقة مطلوب"),
  courseId: Yup.string().required("يجب اختيار كورس"),
  levelId: Yup.string().required("يجب اختيار مستوى"),
  studentsPackageCount: Yup.number()
    .positive("عدد الطلاب يجب أن يكون أكبر من 0")
    .required("عدد الطلاب مطلوب"),
  money: Yup.number()
    .positive("السعر يجب أن يكون أكبر من 0")
    .required("السعر مطلوب"),
});

// 🟢 كومبوننت المستويات المتغيرة حسب الكورس
function LevelsSelect() {
  const { values } = useFormikContext(); // ناخد قيم الفورم
  const courseId = values.courseId;

  // لو لسه مفيش كورس مختار، نرجّع null
  const { data: levelsRes, isLoading } = useGetAllLevelsOfCourse(courseId, {
    enabled: !!courseId, // ما يشتغلش غير لما يتحدد الكورس
  });

  const levels = Array.isArray(levelsRes?.data) ? levelsRes.data : [];

  if (!courseId) {
    return (
      <Field as="select" name="levelId" className="w-full border p-2 rounded">
        <option value="">اختر المستوى (حدد الكورس أولاً)</option>
      </Field>
    );
  }

  if (isLoading) return <p className="text-gray-500">جاري تحميل المستويات...</p>;

  return (
    <Field as="select" name="levelId" className="w-full border p-2 rounded">
      <option value="">اختر المستوى</option>
      {levels.map((level) => (
        <option key={level.id} value={level.id}>
          {level.name} (رقم {level.levelNumber})
        </option>
      ))}
    </Field>
  );
}

export default function AddBouquet() {
  const navigate = useNavigate();
  const { mutate: addBouquet } = useAddBouquet();

  // 🟢 جلب الكورسات
  const { data: courses, isLoading: loadingCourses } = useGetAllCourses();

  if (loadingCourses) return <Loading />;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">إضافة باقة</h2>

      <Formik
        initialValues={{
          bouquetName: "",
          courseId: "",
          levelId: "",
          studentsPackageCount: "",
          money: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const form = new FormData();
          form.append("BouquetName", values.bouquetName);
          form.append("CourseId", values.courseId);
          form.append("LevelId", values.levelId);
          form.append("StudentsPackageCount", values.studentsPackageCount);
          form.append("Money", values.money);

          addBouquet(form, {
            onSuccess: (res) => {
              if (res.success) {
                toast.success(res.message || "تمت إضافة الباقة بنجاح ✅");
                resetForm();
                navigate("/dashboard/bouquets");
              } else {
                toast.error(res.message || "فشل في إضافة الباقة ");
              }
              setSubmitting(false);
            },
            onError: () => {
              toast.error("حدث خطأ أثناء الإضافة ");
              setSubmitting(false);
            },
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            {/* اسم الباقة */}
            <div>
              <Field
                type="text"
                name="bouquetName"
                placeholder="اسم الباقة"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="bouquetName"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* اختيار الكورس */}
            <div>
              <Field as="select" name="courseId" className="w-full border p-2 rounded">
                <option value="">اختر الكورس</option>
                {courses?.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="courseId"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* اختيار المستوى حسب الكورس */}
            <div>
              <LevelsSelect />
              <ErrorMessage
                name="levelId"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* عدد الطلاب */}
            <div>
              <Field
                type="number"
                name="studentsPackageCount"
                placeholder="عدد الطلاب"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="studentsPackageCount"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* السعر */}
            <div>
              <Field
                type="number"
                name="money"
                placeholder="السعر"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="money"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* زر الحفظ */}
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "جارٍ الحفظ..." : " حفظ"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
