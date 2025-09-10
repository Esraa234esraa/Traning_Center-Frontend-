import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";

export default function EditActivity() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activity, setActivity] = useState(null);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("activities")) || [];
        const found = stored.find((a) => a.id === Number(id));
        if (found) setActivity(found);
    }, [id]);

    const validationSchema = Yup.object({
        name: Yup.string()
            .required("العنوان مطلوب")
            .min(3, "العنوان يجب ألا يقل عن 3 أحرف")
            .max(100, "العنوان يجب ألا يزيد عن 100 حرف"),

        description: Yup.string()
            .required("الوصف مطلوب")
            .test("max-words", "الوصف يجب ألا يزيد عن 100 كلمة", (value) => {
                if (!value) return true;
                return value.trim().split(/\s+/).length <= 100;
            }),

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
        image: Yup.mixed().nullable(),
    });

    const handleSubmit = (values) => {
        const stored = JSON.parse(localStorage.getItem("activities")) || [];
        const updated = stored.map((a) =>
            a.id === Number(id) ? { ...a, ...values } : a
        );
        localStorage.setItem("activities", JSON.stringify(updated));
        navigate("/dashboard/activities");
    };

    if (!activity) return <p className="text-center py-20">النشاط غير موجود</p>;

    return (
        <div className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-teal-700">تعديل النشاط</h2>

            <Formik
                initialValues={{
                    name: activity.name,
                    description: activity.description,
                    date: activity.date || "",
                    image: activity.image,
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({ setFieldValue, values }) => (
                    <Form className="space-y-4">
                        {/* العنوان */}
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

                        {/* الوصف */}
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

                        {/* التاريخ */}
                        <div>
                            <label className="block mb-2">تاريخ النشاط</label>
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

                        {/* الصورة */}
                        <div>
                            <label className="block mb-2">رفع صورة جديدة (اختياري)</label>
                            <input
                                type="file"
                                accept="image/png, image/jpeg"
                                onChange={(e) => setFieldValue("image", e.target.files[0])}
                            />

                            {values.image && (
                                <div className="mt-3">
                                    <img
                                        src={
                                            typeof values.image === "string"
                                                ? values.image
                                                : URL.createObjectURL(values.image)
                                        }
                                        alt="preview"
                                        className="w-40 h-32 object-cover rounded-lg border"
                                    />
                                </div>
                            )}
                        </div>

                        {/* الأزرار */}
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                className="bg-teal-600 text-white px-4 py-2 rounded-lg"
                            >
                                حفظ التعديلات
                            </button>
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
