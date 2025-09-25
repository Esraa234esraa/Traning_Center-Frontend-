import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useGetTeacherById } from "../../../Hooks/Teacher/useQueryTeacher";
import { useUpdateTeacher } from "../../../Hooks/Teacher/useMutationTeacher";
import { toast } from "react-toastify";
import Loading from "../../Loading";
import { useGetAllCourses } from "../../../Hooks/Courses/useQueryCourses";

const validationSchema = Yup.object({
  fullName: Yup.string().required("الاسم مطلوب"),
  email: Yup.string()
    .email("البريد الإلكتروني غير صالح")
    .required("البريد الإلكتروني مطلوب"),
  city: Yup.string().required("المدينة مطلوبة"),
  phoneNumber: Yup.string().required("رقم الهاتف مطلوب"),
  courseId: Yup.string().required("اسم الدورة مطلوب"),
});

export default function EditTeacher() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: teacher, isLoading } = useGetTeacherById(id);
  const updateTeacherMutation = useUpdateTeacher();
  const { data: courses } = useGetAllCourses();

  if (isLoading || !teacher) return <Loading />;

  const handleSubmit = (values) => {
    const payload = {
      teacherDto: {
        fullName: values.fullName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        city: values.city,
        courseId: values.courseId,
      },
    };

    updateTeacherMutation.mutate(
      { teacherId: id, data: payload.teacherDto },
      {
        onSuccess: () => {
          toast.success("تم تعديل بيانات المعلم بنجاح");
          navigate("/dashboard/teacher_table");
        },
        onError: (error) => {
          const errorMsg =
            error?.response?.data?.message || "حدث خطأ أثناء التعديل";
          toast.error(errorMsg);
        },
      }
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">تعديل بيانات المعلم</h2>

        <Formik
          initialValues={{
            fullName: teacher?.fullName || "",
            email: teacher?.email || "",
            city: teacher?.city || "",
            phoneNumber: teacher?.phoneNumber || "",
            courseId: teacher?.courseId || "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* الاسم */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium">الاسم الكامل</label>
                <Field
                  name="fullName"
                  placeholder="الاسم بالكامل"
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <ErrorMessage
                  name="fullName"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* البريد */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium">البريد الإلكتروني</label>
                <Field
                  name="email"
                  type="email"
                  placeholder="البريد الإلكتروني"
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* المدينة */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium">المدينة</label>
                <Field
                  name="city"
                  as="select"
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">اختر المدينة</option>
                  {["الرياض", "جدة", "مكة المكرمة"].map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="city"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* الهاتف */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium">رقم الهاتف</label>
                <Field
                  name="phoneNumber"
                  type="tel"
                  placeholder="رقم الهاتف"
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* الدورة */}
              <div className="flex flex-col md:col-span-2">
                <label className="mb-1 font-medium">الدورة</label>
                <Field
                  as="select"
                  name="courseId"
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">اختر الدورة</option>
                  {courses?.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="courseId"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* زر الحفظ */}
              <div className="md:col-span-2 flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting || updateTeacherMutation.isLoading}
                  className="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600 transition disabled:opacity-50"
                >
                  {updateTeacherMutation.isLoading ? "جاري التعديل..." : "تعديل"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
