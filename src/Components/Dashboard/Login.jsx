
import React from 'react';
import { useAdminLogin } from '../../Hooks/Admin/useMutationAdmins';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import chat from '../../assets/images/chat.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../Context/useAuth'; // استدعاء الـ context

function Login() {
  const loginMutation = useAdminLogin();
  const navigate = useNavigate();
  const { login } = useAuth(); // هنا نجيب الـ login اللي بيحدث الـ state

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('يرجى إدخال بريد إلكتروني صالح')
      .required('البريد الإلكتروني مطلوب'),
    password: Yup.string()
      .min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل')
      .required('كلمة المرور مطلوبة'),
  });

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit: (values) => {
      loginMutation.mutate(values, {
        // بعد ما الـ API يرجع التوكن وبيانات المستخدم
        onSuccess: (res) => {
          login(res.data.data); // تحديث الـ context مباشرة
          toast.success('تم تسجيل الدخول بنجاح');
          navigate('/dashboard/dbhome', { replace: true });
        }

        ,

        onError: (error) => {
          const serverMessage = error.response?.data?.message || '';

          if (serverMessage.includes('البريد الإلكتروني')) {
            toast.error('الإيميل غير صحيح، يرجى التحقق');
          } else if (serverMessage.includes('كلمة المرور')) {
            toast.error('كلمة المرور غير صحيحة، حاول مرة أخرى');
          } else {
            toast.error('حدث خطأ أثناء تسجيل الدخول، الرجاء المحاولة لاحقاً');
          }
        }

      });
    },
  });

  return (
    <div className="login-container w-[80%] m-auto p-6 flex flex-col items-center py-[4rem] gap-2 my-[5rem]">
      <h2 className="lg:text-3xl text-headingMobile font-bold font-cairo text-text_color my-4 pb-4">
        أهلا بك ,سجل الدخول في حسابك
      </h2>

      <form
        className="bg-slate-50 p-[4rem] rounded-lg shadow"
        onSubmit={formik.handleSubmit}
        noValidate
      >
        <div className="flex justify-center gap-2 items-center mb-8">
          <span className="w-[1.5rem] h-[1.5rem] flex justify-center items-center">
            <img src={chat} alt="chat icon" />
          </span>
          <p className="text-text_color font-cairo">
            <span className="lg:text-2xl text-xl font-bold text-text_color">
              "سعداء بأنضمامك الينا "
            </span>
          </p>
        </div>

        <div className="px-8 w-[20rem] flex flex-col justify-center items-center gap-3 mb-6">
          <input
            type="email"
            name="email"
            placeholder="البريد الإلكتروني"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`border rounded p-2 w-full ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm self-start mt-1">{formik.errors.email}</div>
          )}

          <input
            type="password"
            name="password"
            placeholder="كلمة المرور"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`border rounded p-2 w-full ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'}`}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm self-start mt-1">{formik.errors.password}</div>
          )}

          <button
            className="bg-background text-white mt-4 p-3 w-full rounded"
            type="submit"
            disabled={loginMutation.isLoading}
          >
            {loginMutation.isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
