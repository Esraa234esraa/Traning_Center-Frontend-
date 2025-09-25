import React from 'react';
import { useAdminLogin } from '../../Hooks/Admin/useMutationAdmins';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import chat from '../../assets/images/chat.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../Context/useAuth';
import jwtDecode from "jwt-decode";


function Login() {
  const loginMutation = useAdminLogin();
  const navigate = useNavigate();
  const { login } = useAuth();

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
        onSuccess: (res) => {
          const token = res.data.token;

          // decode الـ JWT
          const decoded = jwtDecode(token);

          // id موجود في claim اسمه nameidentifier
          const userId = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

          const userData = {
            id: userId,                  // 👈 هنا الـ id
            fullName: res.data.fullName,
            role: res.data.role,
            email: res.data.email,
            token: token,
            expiresAt: res.data.expiresAt,
          };

          login(userData);
          toast.success("تم تسجيل الدخول بنجاح");

          if (userData.role === "Admin") navigate("/dashboard/dbhome", { replace: true });
          else if (userData.role === "User") navigate("/user/home", { replace: true });
        }
        ,
        onError: (error) => {
          const serverMessage = error.response?.data?.message || '';
          if (serverMessage.includes('البريد الإلكتروني')) toast.error('الإيميل غير صحيح، يرجى التحقق');
          else if (serverMessage.includes('كلمة المرور')) toast.error('كلمة المرور غير صحيحة، حاول مرة أخرى');
          else toast.error('حدث خطأ أثناء تسجيل الدخول، الرجاء المحاولة لاحقاً');
        }
      });
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          أهلا بك، سجل الدخول في حسابك
        </h2>

        <div className="flex flex-col items-center gap-2 mb-6">
          <img src={chat} alt="chat icon" className="w-12 h-12 md:w-16 md:h-16" />
          <p className="text-center text-gray-700">
            "سعداء بانضمامك إلينا"
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="البريد الإلكتروني"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-teal-400 ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
            )}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="كلمة المرور"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-teal-400 ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            disabled={loginMutation.isLoading}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg transition duration-200"
          >
            {loginMutation.isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
