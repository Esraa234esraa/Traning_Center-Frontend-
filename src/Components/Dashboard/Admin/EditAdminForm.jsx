import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import { useUpdateAdmin } from '../../../Hooks/useMutationAdmins';
import 'react-toastify/dist/ReactToastify.css';

const validationSchema = Yup.object({
  fullName: Yup.string()
    .min(3, 'الاسم يجب أن يحتوي على 3 أحرف على الأقل')
    .required('الاسم مطلوب'),
  email: Yup.string()
    .email('البريد الإلكتروني غير صالح')
    .required('البريد الإلكتروني مطلوب'),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10,15}$/, 'رقم الهاتف غير صالح')
    .required('رقم الهاتف مطلوب'),
});

export default function EditAdminForm({ admin, onClose }) {
    const updateMutation = useUpdateAdmin();
  return (
    <>
      <Formik
        initialValues={{
          fullName: admin.fullName || '',
          email: admin.email || '',
          phoneNumber: admin.phoneNumber || '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          // استدعاء الميوتشن هنا
          updateMutation.mutate({ id: admin.id, data: values }, {
            onSuccess: () => {
              toast.success('تم تحديث بيانات المشرف بنجاح');
              setSubmitting(false);
              onClose();
            },
            onError: () => {
              toast.error('فشل تحديث بيانات المشرف');
              setSubmitting(false);
            }
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form className="p-10 bg-white rounded shadow-md w-full max-w-md  mt-10 mx-auto space-y-4">
            <h2 className="text-lg font-semibold mb-4 text-right">تعديل بيانات المشرف</h2>
            <div>
              <label className="block text-text_color text-right mb-1">الاسم الكامل</label>
              <Field
                name="fullName"
                type="text"
                className="w-full border rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <ErrorMessage
                name="fullName"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div>
              <label className="block text-text_color text-right mb-1">البريد الإلكتروني</label>
              <Field
                name="email"
                type="email"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div>
              <label className="block text-text_color text-right mb-1">رقم الهاتف</label>
              <Field
                name="phoneNumber"
                type="text"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                إلغاء
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-text_color/80 text-white px-4 py-2 rounded hover:bg-text_color"
              >
                حفظ
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <ToastContainer />
    </>
  );
}
