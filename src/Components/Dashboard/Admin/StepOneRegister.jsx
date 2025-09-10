import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// الفاليديشن
const validationSchema = Yup.object({
  fullName: Yup.string()
    .min(3, 'الاسم يجب أن يحتوي على 3 أحرف على الأقل')
    .required('الاسم مطلوب'),
  email: Yup.string()
    .email('البريد الإلكتروني غير صالح')
    .required('البريد الإلكتروني مطلوب'),
  phone: Yup.string()
    .matches(/^[0-9]{10,15}$/, 'رقم الهاتف غير صالح')
    .required('رقم الهاتف مطلوب')
});

export default function StepOneRegister({ onNext }) {
  return (
    <div className="flex text-text_color flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 bg-gray-50 ">
      {/* العنوان الرئيسي */}
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-cairo text-text_color text-center mb-6">
        أهلا بك في مركز اللغة المثالية للتدريب
      </h2>

      {/* الفورم */}
      <div className="w-full max-w-sm sm:max-w-md bg-white rounded-lg shadow p-6 sm:p-8">
        <h3 className="text-lg sm:text-xl font-cairo text-center mb-4 text-gray-600">
          إضافة أدمن جديد
        </h3>

        <Formik
          initialValues={{ fullName: '', email: '', phone: '' }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onNext(values);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* الاسم */}
              <div>
                <label className="block mb-2 font-medium text-text_color">
                  الاسم الكامل
                </label>
                <Field
                  name="fullName"
                  className="w-full  border-2 rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none  focus:ring-2 focus:ring-blue-100"
                  placeholder="ادخل اسمك"
                />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="text-red-500 text-xs sm:text-sm mt-1"
                />
              </div>

              {/* البريد */}
              <div>
                <label className="block mb-2 font-medium text-text_color">
                  البريد الإلكتروني
                </label>
                <Field
                  name="email"
                  type="email"
                  className="w-full border rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none  focus:ring-2 focus:ring-blue-100"
                  placeholder="example@email.com"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs sm:text-sm mt-1"
                />
              </div>

              {/* الهاتف */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  رقم الهاتف
                </label>
                <Field
                  name="phone"
                  className="w-full border-2 rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none  focus:ring-2 focus:ring-blue-100"
                  placeholder="05xxxxxxxx"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-xs sm:text-sm mt-1"
                />
              </div>

              {/* الزر */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-background hover:bg-[#0f8a9a] text-white py-2 px-4 w-full rounded-lg text-sm sm:text-base transition duration-200"
              >
                التالي
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
