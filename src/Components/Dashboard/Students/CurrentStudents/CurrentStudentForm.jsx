import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
    useAddCurrentStudent,
    useUpdateCurrentStudent,
} from "../../../../Hooks/Students/CurrentStudent/useMutationCurrentStudent";
import { useGetAllWaitingStudents } from "../../../../Hooks/Students/NewStudents/useQueryNewStudent";
import { useGetAllClasses } from "../../../../Hooks/Classes/useQueryClasses";

export default function CurrentStudentForm({ initialValues, isEdit, onClose }) {
    const addMutation = useAddCurrentStudent();
    const updateMutation = useUpdateCurrentStudent();

    const { data: waitingRes } = useGetAllWaitingStudents();
    const waitingStudents = waitingRes || [];

    const { data: classesRes } = useGetAllClasses();
    const classes = classesRes?.data || [];
    console.log(classes);

    const [selectedStudent, setSelectedStudent] = useState(null);
    const [studentSearch, setStudentSearch] = useState("");
    const [showStudentDropdown, setShowStudentDropdown] = useState(false);
    const [classSearch, setClassSearch] = useState("");

    const validationSchema = Yup.object({
        StudentName: Yup.string().required("الاسم مطلوب"),
        PhoneNumber: Yup.string().required("رقم الهاتف مطلوب"),
        Email: Yup.string()
            .email("البريد الإلكتروني غير صالح")
            .required("البريد الإلكتروني مطلوب"),
        ClassId: Yup.string().required("اختيار الحصة مطلوب"),
    });

    const handleSelectStudent = (student, setFieldValue) => {
        setSelectedStudent(student);
        setFieldValue("StudentName", student.studentName || "");
        setFieldValue("PhoneNumber", student.phoneNumber || "");
        setFieldValue("City", student.city || "");
        setFieldValue("Gender", student.gender || "");
        setStudentSearch(student.studentName || "");
        setShowStudentDropdown(false);
        setFieldValue("Email", student.email || "");
    };

    const handleSelectClass = (cls, setFieldValue) => {
        if (!cls) return;
        setFieldValue("ClassId", cls.id);
        setFieldValue("bouquetName", cls.bouquetName || "");
        setFieldValue("bouquetNumber", cls.bouquetNumber || 0);
        setFieldValue("courseName", cls.courseName || "");
        setFieldValue("levelNumber", cls.levelNumber || 0);
        setFieldValue("levelName", cls.levelName || "");
        setFieldValue("classTime", cls.classTime || "");
        setFieldValue("currentStudentsCount", cls.currentStudentsCount || 0);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest("#student-dropdown")) setShowStudentDropdown(false);
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const handleSubmit = (values, { setSubmitting }) => {
        if (!values.Email || values.Email.trim() === "") {
            toast.error("البريد الإلكتروني مطلوب!");
            setSubmitting(false);
            return;
        }

        const payload = {
            ...values,
            WaitingStudentId: selectedStudent?.id || null,
        };
        console.log("Payload going to API:", payload);

        if (isEdit) {
            updateMutation.mutate(
                { id: values.id, formData: payload },
                {
                    onSuccess: () => {
                        toast.success("تم التعديل بنجاح");
                        onClose();
                    },
                    onError: () => toast.error("حدث خطأ أثناء التعديل"),
                    onSettled: () => setSubmitting(false),
                }
            );
        } else {
            addMutation.mutate(payload, {
                onSuccess: () => {
                    toast.success("تمت الإضافة بنجاح");
                    onClose();
                },
                onError: () => toast.error("حدث خطأ أثناء الإضافة"),
                onSettled: () => setSubmitting(false),
            });
        }
    };

    return (
        <Formik
            initialValues={{
                StudentName: "",
                PhoneNumber: "",
                Email: "",
                City: "",
                Gender: "",
                ClassId: "",
                bouquetName: "",
                bouquetNumber: 0,
                courseName: "",
                levelName: "",
                levelNumber: 0,
                classTime: "",
                currentStudentsCount: 0,
                IsPaid: false,
                ...initialValues,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, setFieldValue, values }) => {
                const filteredStudents = waitingStudents.filter((student) =>
                    (student.studentName || "")
                        .toLowerCase()
                        .includes((studentSearch || "").toLowerCase())
                );

                const filteredClasses = classes.filter((cls) =>
                    (
                        (cls.bouquetName || "") +
                        " " +
                        (cls.courseName || "") +
                        " " +
                        (cls.levelName || "")
                    )
                        .toLowerCase()
                        .includes(classSearch.toLowerCase())
                );

                return (
                    <Form className="flex flex-col gap-4">
                        {/* Student Dropdown */}
                        <div className="relative" id="student-dropdown">
                            <label>الاسم:</label>
                            <input
                                type="text"
                                className="border px-2 py-1 w-full"
                                value={values.StudentName} // بدل studentSearch
                                onChange={(e) => {
                                    setFieldValue("StudentName", e.target.value); // تحديث الفورم
                                    setStudentSearch(e.target.value); // لا زال للفلترة
                                    setShowStudentDropdown(true);
                                }}
                                placeholder="اكتب الاسم للاختيار من الانتظار"
                            />

                            {showStudentDropdown && filteredStudents.length > 0 && (
                                <ul className="absolute z-10 bg-white border w-full max-h-40 overflow-y-auto">
                                    {filteredStudents.map((student) => (
                                        <li
                                            key={student.id}
                                            className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                                            onClick={() =>
                                                handleSelectStudent(student, setFieldValue)
                                            }
                                        >
                                            {student.studentName || "لا يوجد اسم"}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <ErrorMessage
                                name="StudentName"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label>رقم الهاتف:</label>
                            <Field name="PhoneNumber" className="border px-2 py-1 w-full" />
                            <ErrorMessage
                                name="PhoneNumber"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label>البريد الإلكتروني:</label>
                            <Field
                                name="Email"
                                type="email"
                                className="border px-2 py-1 w-full"
                                placeholder="أدخل البريد الإلكتروني"
                            />
                            <ErrorMessage
                                name="Email"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        </div>

                        {/* City */}
                        <div>
                            <label>المدينة:</label>
                            <Field name="City" className="border px-2 py-1 w-full" />
                        </div>

                        {/* Gender */}
                        <div>
                            <label>النوع:</label>
                            <Field name="Gender" className="border px-2 py-1 w-full" />
                        </div>

                        {/* Class Dropdown */}
                        <div className="relative">
                            <label>الحصة:</label>
                            <input
                                type="text"
                                className="border px-2 py-1 w-full"
                                value={classSearch}
                                onChange={(e) => setClassSearch(e.target.value)}
                                placeholder="ابحث عن الحصة"
                            />
                            <select
                                name="ClassId"
                                value={values.ClassId}
                                onChange={(e) => {
                                    const cls = classes.find((c) => c.id === e.target.value);
                                    handleSelectClass(cls, setFieldValue);
                                }}
                                className="border px-2 py-1 w-full mt-1"
                            >
                                <option value="">اختر الحصة</option>
                                {filteredClasses.map((cls) => (
                                    <option key={cls.id} value={cls.id}>
                                        {cls.bouquetName} | {cls.courseName} | {cls.levelName} | الوقت:{" "}
                                        {cls.classTime} | الطلاب الحاليين: {cls.currentStudentsCount}
                                    </option>
                                ))}
                            </select>

                            <ErrorMessage
                                name="ClassId"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        </div>

                        {/* IsPaid */}
                        <div className="flex items-center gap-2">
                            <Field type="checkbox" name="IsPaid" />
                            <label>تم الدفع</label>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-primary text-white px-4 py-2 rounded"
                        >
                            {isEdit ? "تعديل" : "إضافة"}
                        </button>
                    </Form>
                );
            }}
        </Formik>
    );
}
