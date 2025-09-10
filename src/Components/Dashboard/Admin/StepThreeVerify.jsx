// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { useAdminRegister } from '../../../Hooks/useMutationAdmins';

// // الفاليديشن
// const validationSchema = Yup.object({
//   code: Yup.string()
//     .required('رمز التحقق مطلوب')
//     .matches(/^[0-9]{4,6}$/, 'رمز التحقق يجب أن يكون من 4 إلى 6 أرقام')
// });

// export default function StepThreeVerify({ adminData, onFinish }) {
//   const mutation = useAdminRegister();

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 md:mr-64">
//       <div className="w-full max-w-md bg-white text-text_color rounded-lg shadow-md p-6">
//         <h2 className="text-xl font-bold text-center mb-4">تأكيد رمز التحقق</h2>

//         <Formik
//           initialValues={{ code: '' }}
//           validationSchema={validationSchema}
//           onSubmit={(values) => {
//             const finalData = { ...adminData, code: values.code };
//             mutation.mutate(finalData, {
//               onSuccess: () => {
//                 onFinish();
//               },
//               onError: (error) => {
//                 console.error('فشل التسجيل', error);
//               }
//             });
//           }}
//         >
//           {({ isSubmitting }) => (
//             <Form className="space-y-4">
//               {/* إدخال رمز التحقق */}
//               <div>
//                 <label className="block mb-2 font-medium text-text_color">رمز التحقق</label>
//                 <Field
//                   name="code"
//                   type="text"
//                   className="w-full border rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-100"
//                   placeholder="أدخل رمز التحقق"
//                 />
//                 <ErrorMessage
//                   name="code"
//                   component="div"
//                   className="text-red-500 text-sm mt-1"
//                 />
//               </div>

//               {/* زر التأكيد */}
//               <button
//                 type="submit"
//                 disabled={mutation.isLoading || isSubmitting}
//                 className="bg-background hover:bg-[#0f8a9a] text-white py-2 px-4 w-full rounded-lg text-sm sm:text-base transition duration-200"
//               >
//                 {mutation.isLoading ? 'جاري التسجيل...' : 'تأكيد'}
//               </button>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// }
