import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function AddActivity() {
    const navigate = useNavigate();

    const initialValues = {
        name: "",
        description: "",
        image: null,
        date: "", // التاريخ والوقت
    };
    const validationSchema = Yup.object({
        name: Yup.string()
            .required("اسم النشاط مطلوب")
            .min(3, "الاسم يجب ألا يقل عن 3 أحرف")
            .max(100, "الاسم يجب ألا يزيد عن 100 حرف"),

        description: Yup.string()
            .required("الوصف مطلوب")
            .test(
                "max-words",
                "الوصف يجب ألا يزيد عن 100 كلمة",
                (value) => {
                    if (!value) return true;
                    return value.trim().split(/\s+/).length <= 100;
                }
            ),

        date: Yup.string()
            .required("تاريخ النشاط مطلوب")
            .test("is-valid-date", "تاريخ غير صالح", (value) => {
                if (!value) return false;
                const date = new Date(value);
                return !isNaN(date.getTime());
            })
            .test("is-future-date", "لا يمكن اختيار تاريخ قديم", (value) => {
                if (!value) return false;
                const date = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0); // تجاهل الساعة
                return date >= today;
            }),

        image: Yup.mixed()
            .required("الصورة مطلوبة")
            .test("fileType", "الملف يجب أن يكون صورة JPG أو PNG", (value) => {
                return (
                    value &&
                    (value.type === "image/jpeg" || value.type === "image/png")
                );
            }),
    });

    const handleSubmit = (values) => {
        const stored = JSON.parse(localStorage.getItem("activities")) || [];
        const newActivity = {
            id: Date.now(),
            ...values,
            createdAt: new Date().toLocaleString(),
        };
        stored.push(newActivity);
        localStorage.setItem("activities", JSON.stringify(stored));
        navigate("/dashboard/activities");
    };

    return (
        <div className="p-6 mt-6 max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-teal-700">إضافة نشاط جديد</h2>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, values }) => (
                    <Form className="space-y-4">
                        <div>
                            <label className="block mb-2">العنوان</label>
                            <Field
                                type="text"
                                name="name"
                                className="w-full border rounded p-2"
                            />
                            <ErrorMessage
                                name="name"
                                component="p"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>

                        <div>
                            <label className="block mb-2">الوصف</label>
                            <Field
                                as="textarea"
                                name="description"
                                className="w-full border rounded p-2"
                            />
                            <ErrorMessage
                                name="description"
                                component="p"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>

                        {/* حقل التاريخ والوقت */}
                        <div>
                            <label className="block mb-2">تاريخ ووقت النشاط</label>
                            <Field
                                type="date"
                                name="date"
                                className="w-full border rounded p-2"
                            />
                            <ErrorMessage
                                name="date"
                                component="p"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>

                        <div>
                            <label className="block mb-2">رفع صورة</label>
                            <input
                                type="file"
                                accept="image/png, image/jpeg"
                                onChange={(e) => setFieldValue("image", e.target.files[0])}
                            />
                            <ErrorMessage
                                name="image"
                                component="p"
                                className="text-red-500 text-sm mt-1"
                            />

                            {values.image && (
                                <div className="mt-3">
                                    <img
                                        src={URL.createObjectURL(values.image)}
                                        alt="preview"
                                        className="w-40 h-32 object-cover rounded-lg border"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="submit"
                                className="bg-background text-white px-4 py-2 rounded-lg"
                            >
                                إضافة
                            </button>

                            {/* زر إلغاء */}
                            <button
                                type="button"
                                onClick={() => navigate("/dashboard/activities")}
                                className="bg-gray-400 text-white px-4 py-2 rounded-lg"
                            >
                                إلغاء
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
