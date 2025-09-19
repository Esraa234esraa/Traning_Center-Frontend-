import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useChangePassword } from "../../../Hooks/Admin/useMutationAdmins";

export default function ChangeAdminPassword() {
  const { id } = useParams();
  const navigate = useNavigate();
  const changePasswordMutation = useChangePassword();

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("كلمة المرور الحالية مطلوبة"),
    newPassword: Yup.string()
      .required("كلمة المرور الجديدة مطلوبة")
      .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "كلمة المرور غير متطابقة")
      .required("تأكيد كلمة المرور مطلوب"),
  });

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">تغيير كلمة المرور</h2>
      <Formik
        initialValues={{
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          changePasswordMutation.mutate(
            { id, data: { currentPassword: values.currentPassword, newPassword: values.newPassword } },
            {
              onSuccess: () => {
                toast.success("تم تغيير كلمة المرور بنجاح");
                navigate(`/admins/edit/${id}`);
              },
              onError: (error) => {
                toast.error(error?.response?.data?.message || "حدث خطأ أثناء تغيير كلمة المرور");
              },
            }
          );
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label>كلمة المرور الحالية</label>
              <Field name="currentPassword" type="password" className="border p-2 w-full rounded" />
              <ErrorMessage name="currentPassword" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label>كلمة المرور الجديدة</label>
              <Field name="newPassword" type="password" className="border p-2 w-full rounded" />
              <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label>تأكيد كلمة المرور</label>
              <Field name="confirmPassword" type="password" className="border p-2 w-full rounded" />
              <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
            </div>

            <button
              type="submit"
              disabled={changePasswordMutation.isLoading || isSubmitting}
              className="bg-green-500 text-white py-2 px-4 rounded w-full"
            >
              {changePasswordMutation.isLoading ? "جاري التغيير..." : "تغيير كلمة المرور"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
