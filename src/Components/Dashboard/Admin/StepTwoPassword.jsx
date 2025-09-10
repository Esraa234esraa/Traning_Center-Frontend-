import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminRegister } from '../../../Hooks/useMutationAdmins';

// الفاليديشن
const validationSchema = Yup.object({
    password: Yup.string()
        .required('كلمة المرور مطلوبة')
        .min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل')
        .matches(/^[A-Z]/, 'يجب أن تبدأ بحرف كابتل')
        .matches(/[0-9]/, 'يجب أن تحتوي على رقم واحد على الأقل')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'يجب أن تحتوي على رمز خاص واحد على الأقل'),
    confirmPassword: Yup.string()
        .required('تأكيد كلمة المرور مطلوب')
        .oneOf([Yup.ref('password'), null], 'كلمة المرور غير متطابقة')
});

export default function StepTwoPassword({ adminData }) {
    const mutation = useAdminRegister();
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white text-text_color rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-center mb-4">إعداد كلمة المرور</h2>

                <Formik
                    initialValues={{ password: '', confirmPassword: '' }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        const finalData = {
                            fullName: adminData.fullName,
                            email: adminData.email,
                            phoneNumber: adminData.phone, // تأكدي الاسم زي ما الـ API عايز
                            password: values.password,
                            confirmPassword: values.confirmPassword,
                            role: "Admin"
                        };

                        mutation.mutate(finalData, {
                            onSuccess: () => {
                                console.log('نجح التسجيل');
                                toast.success('تم إضافة الادمن  بنجاح');
                                navigate('/dashboard/admins_table', { replace: true });
                            },

                            onError: (error) => {
                                const errorMsg = error?.response?.data?.message || 'حدث خطأ أثناء التسجيل';
                                toast.error(errorMsg, {
                                    toastId: `${errorMsg}-${Date.now()}` // ID مختلف كل مرة
                                });
                            }


                        });
                    }}

                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-4">
                            {/* كلمة المرور */}
                            <div>
                                <label className="block mb-2 font-medium text-text_color">كلمة المرور</label>
                                <Field
                                    name="password"
                                    type="password"
                                    className="w-full border rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-100"
                                    placeholder="••••••••"
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            {/* تأكيد كلمة المرور */}
                            <div>
                                <label className="block mb-2 font-medium text-text_color">تأكيد كلمة المرور</label>
                                <Field
                                    name="confirmPassword"
                                    type="password"
                                    className="w-full border rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-100"
                                    placeholder="••••••••"
                                />
                                <ErrorMessage
                                    name="confirmPassword"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            {/* زر الإرسال */}
                            <button
                                type="submit"
                                disabled={mutation.isLoading || isSubmitting}
                                className="bg-background hover:bg-[#0f8a9a] text-white py-2 px-4 w-full rounded-lg text-sm sm:text-base transition duration-200"
                            >
                                {mutation.isLoading ? 'جاري التسجيل...' : 'تسجيل'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
