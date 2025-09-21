import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllLevels } from "../../../Hooks/Levels/useQueryLevel";
import { useDeleteLevel } from "../../../Hooks/Levels/useMutationLevel";
import Loading from "../../Loading";


export default function LevelsTable() {
    const navigate = useNavigate();
    const { data, isLoading, isError } = useGetAllLevels();
    const { mutate: deleteLevel } = useDeleteLevel();

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("");

    const levels = data?.data || [];

    const courses = [...new Set(levels.map((l) => l.courseName))];

    const filteredLevels = useMemo(() => {
        return levels.filter((level) => {
            const matchesSearch =
                level.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                level.levelNumber.toString().includes(searchTerm);

            const matchesCourse = selectedCourse
                ? level.courseName === selectedCourse
                : true;

            return matchesSearch && matchesCourse;
        });
    }, [levels, searchTerm, selectedCourse]);

    if (isLoading) return <Loading/>;
    if (isError) return <p className="text-red-500">حدث خطأ</p>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">قائمة المستويات</h2>
                <button
                    onClick={() => navigate("/dashboard/levels/addlevel")}
                    className="bg-primary text-white px-4 py-2 rounded-lg"
                >
                    إضافة مستوى
                </button>
            </div>

            {/* البحث والفلترة */}
            <div className="flex gap-4 mb-4">
                <input
                    type="text"
                    placeholder="ابحث بالاسم أو رقم المستوى..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 rounded w-1/2"
                />
                <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="">كل الكورسات</option>
                    {courses.map((course, index) => (
                        <option key={index} value={course}>
                            {course}
                        </option>
                    ))}
                </select>
            </div>

            {filteredLevels.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-20 w-20 mb-4 text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15zM3 13.5V7.5A4.5 4.5 0 017.5 3h3"
                        />
                    </svg>

                    <p className="text-gray-500 text-center">
                        لا توجد مستويات مطابقة
                    </p>
                </div>


            ) : (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">#</th>
                            <th className="border p-2">رقم المستوى</th>
                            <th className="border p-2">الاسم</th>
                            <th className="border p-2">الكورس</th>
                            <th className="border p-2">الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLevels.map((level, index) => (
                            <tr key={level.id} className="hover:bg-gray-100">
                                <td className="border p-2 text-center">{index + 1}</td>
                                <td className="border p-2 text-center">{level.levelNumber}</td>
                                <td className="border p-2 text-center">{level.name}</td>
                                <td className="border p-2 text-center">{level.courseName}</td>
                                <td className="border p-2 text-center">
                                    <button
                                        onClick={() =>
                                            navigate(`/dashboard/levels/editlevel/${level.id}`)
                                        }
                                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                                    >
                                        تعديل
                                    </button>
                                    <button
                                        onClick={() => deleteLevel(level.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        حذف
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
            }
        </div >
    );
}
