import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useAddCurrentStudent } from "../../../../Hooks/Students/CurrentStudent/useMutationCurrentStudent";
import { useGetAllWaitingStudents } from "../../../../Hooks/Students/NewStudents/useQueryNewStudent";
// Queries
import { useGetAllCourses } from "../../../../Hooks/Courses/useQueryCourses";
import { useGetAllLevelsOfCourse } from "../../../../Hooks/Levels/useQueryLevel";
import { useGetBouquetsOfLevel } from "../../../../Hooks/Bouquets/useQueryBouquet";
import { useGetAllClassesOfBouquet } from "../../../../Hooks/Classes/useQueryClasses";

export default function ClassAssignmentForm() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentSearch, setStudentSearch] = useState("");
  const [showStudentDropdown, setShowStudentDropdown] = useState(false);

  const addMutation = useAddCurrentStudent();
  const { data: waitingRes } = useGetAllWaitingStudents();
  const waitingStudents = waitingRes || [];

  // Courses
  const { data: coursesRes } = useGetAllCourses();
  const courses = coursesRes || [];

  // Schema
  const validationSchema = Yup.object({
    StudentName: Yup.string().required("الاسم مطلوب"),
    PhoneNumber: Yup.string().required("رقم الهاتف مطلوب"),
    Email: Yup.string().email("البريد الإلكتروني غير صالح").required("البريد الإلكتروني مطلوب"),
    CourseId: Yup.string().required("اختيار الدورة مطلوب"),
    LevelId: Yup.string().required("اختيار المستوى مطلوب"),
    BouquetId: Yup.string().required("اختيار الباقة مطلوب"),
    ClassId: Yup.string().required("اختيار الحصة مطلوب"),
  });

  const handleSelectStudent = (student, setFieldValue) => {
    setSelectedStudent(student);
    setFieldValue("StudentName", student.studentName || "");
    setFieldValue("PhoneNumber", student.phoneNumber || "");
    setFieldValue("City", student.city || "");
    setFieldValue("Gender", student.gender || "");
    setFieldValue("Email", student.email || "");
    setStudentSearch(student.studentName || "");
    setShowStudentDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest("#student-dropdown")) setShowStudentDropdown(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <Formik
      initialValues={{
        StudentName: "",
        PhoneNumber: "",
        Email: "",
        Gender: "",
        City: "",
        CourseId: "",
        LevelId: "",
        BouquetId: "",
        ClassId: "",
        IsPaid: false,
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        const payload = {
          StudentName: values.StudentName,
          PhoneNumber: values.PhoneNumber,
          Email: values.Email,
          Gender: values.Gender,
          City: values.City,
          IsPaid: values.IsPaid,
          ClassId: values.ClassId,
        };

        console.log("Payload going to API:", payload);

        addMutation.mutate(payload, {
          onSuccess: (data) => {
            if (data?.success === false) {
              toast.error(data?.message || "فشلت العملية");
            } else {
              toast.success(data?.message || "تمت الإضافة بنجاح");
            }
          },
          onError: (error) => {
            toast.error(error?.response?.data?.message || "حدث خطأ أثناء الإضافة");
          },
          onSettled: () => setSubmitting(false),
        });
      }}
    >
      {({ isSubmitting, setFieldValue, values }) => {
        // Queries بعد اختيار الفورم
        const { data: levelsRes } = useGetAllLevelsOfCourse(values.CourseId);
        const levels = Array.isArray(levelsRes?.data) ? levelsRes.data : [];

        const { data: bouquetsRes } = useGetBouquetsOfLevel(values.LevelId);
        const bouquets = Array.isArray(bouquetsRes) ? bouquetsRes : [];

        const { data: classesRes } = useGetAllClassesOfBouquet(values.BouquetId);
        const classes = classesRes?.data || [];

        return (
          <Form className="flex flex-col gap-4">
            {/* اختيار الطالب من قائمة الانتظار */}
            <div className="relative">
              <label>اختر طالب من قائمة الانتظار:</label>
              <input
                type="text"
                value={studentSearch}
                onChange={(e) => {
                  setStudentSearch(e.target.value);
                  setShowStudentDropdown(true);
                }}
                placeholder="ابحث باسم الطالب..."
                className="border px-2 py-1 w-full"
              />
              {showStudentDropdown && (
                <ul
                  id="student-dropdown"
                  className="absolute z-10 bg-white border w-full max-h-40 overflow-y-auto"
                >
                  {waitingStudents
                    .filter((s) =>
                      s.studentName?.toLowerCase().includes(studentSearch.toLowerCase())
                    )
                    .map((student) => (
                      <li
                        key={student.id}
                        className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
                        onClick={() => handleSelectStudent(student, setFieldValue)}
                      >
                        {student.studentName} 
                      </li>
                    ))}
                </ul>
              )}
            </div>

            {/* Email */}
            <div>
              <label>البريد الإلكتروني:</label>
              <Field
                type="email"
                name="Email"
                placeholder="example@mail.com"
                className="border px-2 py-1 w-full"
              />
              <ErrorMessage name="Email" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Phone */}
            <div>
              <label>رقم الهاتف:</label>
              <Field
                type="text"
                name="PhoneNumber"
                placeholder="010xxxxxxxx"
                className="border px-2 py-1 w-full"
              />
              <ErrorMessage name="PhoneNumber" component="div" className="text-red-500 text-sm" />
            </div>

            {/* City */}
            <div>
              <label>المدينة:</label>
              <Field
                type="text"
                name="City"
                placeholder="اسم المدينة"
                className="border px-2 py-1 w-full"
              />
              <ErrorMessage name="City" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Gender */}
            <div>
              <label>النوع:</label>
              <Field as="select" name="Gender" className="border px-2 py-1 w-full">
                <option value="">اختر النوع</option>
                <option value="Male">ذكر</option>
                <option value="Female">أنثى</option>
              </Field>
              <ErrorMessage name="Gender" component="div" className="text-red-500 text-sm" />
            </div>

            {/* IsPaid */}
            <div className="flex items-center gap-2">
              <Field type="checkbox" name="IsPaid" />
              <label>تم الدفع</label>
            </div>

            {/* Course */}
            <Field as="select" name="CourseId" className="border p-2 w-full">
              <option value="">اختر الكورس</option>
              {courses?.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Field>
            <ErrorMessage name="CourseId" component="div" className="text-red-500 text-sm" />

            {/* Level */}
            <Field as="select" name="LevelId" className="border p-2 w-full">
              <option value="">اختر المستوى</option>
              {levels.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name}-{l.levelNumber}
                </option>
              ))}
            </Field>
            <ErrorMessage name="LevelId" component="div" className="text-red-500 text-sm" />

            {/* Bouquet */}
            <Field as="select" name="BouquetId" className="border p-2 w-full">
              <option value="">اختر الباقة</option>
              {bouquets.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.bouquetName}
                </option>
              ))}
            </Field>
            <ErrorMessage name="BouquetId" component="div" className="text-red-500 text-sm" />

            {/* Class */}
            <Field as="select" name="ClassId" className="border p-2 w-full">
              <option value="">اختر الحصة</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.classTime}
                </option>
              ))}
            </Field>
            <ErrorMessage name="ClassId" component="div" className="text-red-500 text-sm" />

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-white px-4 py-2 rounded"
            >
              حفظ
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}
