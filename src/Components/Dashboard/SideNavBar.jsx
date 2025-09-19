import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import LogoPlaceholder from "../../assets/images/light-logo.png";
import {
  FaHome, FaChalkboardTeacher, FaUsers, FaSignOutAlt, FaCalendarAlt, FaListUl,
  FaUserPlus, FaFileAlt, FaStar, FaUserFriends, FaClock, FaNewspaper, FaRunning, FaChevronDown
} from "react-icons/fa";
import { useAdminLogout } from '../../Hooks/Admin/useMutationAdmins';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // لتحديد أي دروب داون مفتوح
  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const navigate = useNavigate();
  const logoutMutation = useAdminLogout();
  // بعد ما تخزن بيانات المعلم عند تسجيل الدخول
  const teacherId = localStorage.getItem("teacherId");
  const teacherName = localStorage.getItem("teacherName");

  const handleLogout = (e) => {
    e.preventDefault(); // لمنع الانتقال الافتراضي

    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        navigate('/login');
      },
      onError: () => {
        toast.error('فشل تسجيل الخروج، حاول مرة أخرى');
      }
    });
  };

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-l-md transition-colors duration-200
   ${isActive ? "bg-blue_Light/80 text-white" : "hover:bg-white/10 text-white"}`;

  return (
    <>
      {/* زر التوجل */}
      <button
        className="fixed top-4 right-4 z-55 p-2 bg-[#084C51] text-white rounded-md md:hidden"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? "✖" : "☰"}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 bottom-0 w-72 bg-primary h-screen z-50 transform transition-transform duration-300 
  ${isOpen ? "translate-x-0" : "translate-x-full"} 
  md:translate-x-0`}
      >
        {/* زرار الإغلاق جوه السايد بار */}
        <div className="w-full flex justify-end md:hidden">
          <button
            className="p-3 text-white text-2xl"
            onClick={() => setIsOpen(false)}
          >
            ✖
          </button>
        </div>

        <div className="h-full flex flex-col items-center py-6 px-4">
          {/* Logo */}
          <div className="w-full flex flex-col pb-3 items-center border-b-[.5px] justify-center mb-6">
            <img src={LogoPlaceholder} alt="logo" className="w-20 h-auto" />
            <span className="text-white lg:text-lg text-baseMobile font-bold mt-2">
              <p>مركز اللغة المثالية للتدريب</p>
            </span>
          </div>


          {/* Nav Links */}
          <nav className="w-full lg:text-lg text-baseMobile flex-1 overflow-y-auto scrollbar-hide">
            <ul className="flex flex-col gap-3">

              {/* لوحة التحكم */}
              <li>
                <NavLink
                  to="/dashboard/dbhome"
                  className={linkClasses}
                  onClick={() => setIsOpen(false)}
                >
                  <FaHome /> <span className="flex-1 text-right">لوحة التحكم</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/admins_table"
                  className={linkClasses}
                  onClick={() => setIsOpen(false)}
                >
                  <FaChalkboardTeacher />
                  <span className="flex-1 text-right">قائمة المشرفين</span>
                </NavLink>
              </li>

              {/* المعلمين */}
              <li>
                <NavLink
                  to="/dashboard/teacher_table"
                  className={linkClasses}
                  onClick={() => setIsOpen(false)}
                >
                  <FaChalkboardTeacher />
                  <span className="flex-1">المعلمين</span>
                </NavLink>
              </li>

              {/* الحصص اليومية */}
              <li>
                <NavLink
                  to={`/dashboard/dailysession/${teacherId}/${encodeURIComponent(teacherName)}`}
                  className={linkClasses}
                  onClick={() => setIsOpen(false)}
                >
                  <FaClock />
                  <span className="flex-1">الحصص اليومية</span>
                </NavLink>
              </li>


              {/* الطلاب */}
              <li>
                <button
                  onClick={() => toggleDropdown("students")}
                  className="flex items-center gap-3 px-4 py-3 text-white w-full text-right hover:bg-white/10 rounded-l-md"
                >
                  <FaUsers />
                  <span className="flex-1">الطلاب</span>
                  <FaChevronDown
                    className={`transition-transform duration-300 ${openDropdown === "students" ? "rotate-180" : ""}`}
                  />
                </button>
                {openDropdown === "students" && (
                  <ul className="ml-6 mt-1 pr-2 flex flex-col gap-1">
                    <li>
                      <NavLink to="/dashboard/students/new-students" className={linkClasses} onClick={() => setIsOpen(false)}>
                        <FaUserPlus /> الطلاب الجدد
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/students/current-students" className={linkClasses} onClick={() => setIsOpen(false)}>
                        <FaUserFriends /> الطلاب الحاليين
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/students/waiting-students" className={linkClasses} onClick={() => setIsOpen(false)}>
                        <FaListUl /> طلاب قائمة الانتظار
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

              {/* الأنشطة والأخبار */}
              <li>
                <NavLink
                  to="/dashboard/activities"
                  className={linkClasses}
                  onClick={() => setIsOpen(false)}
                >
                  <FaNewspaper /> <span className="flex-1 text-right">الأنشطة والأخبار</span>
                </NavLink>
              </li>

              {/* الدورات التدريبية */}
              <li>
                <NavLink
                  to="/dashboard/courses"
                  className={linkClasses}
                  onClick={() => setIsOpen(false)}
                >
                  <FaRunning /> <span className="flex-1 text-right">الدورات التدريبية</span>
                </NavLink>
              </li>
              {/* التقييمات */}
              <li>
                <NavLink
                  to="/dashboard/reviews"
                  className={linkClasses}
                  onClick={() => setIsOpen(false)}
                >
                  <FaStar /> <span className="flex-1 text-right">التقييمات</span>
                </NavLink>
              </li>

              {/* الامتحان التجريبي */}
              <li>

                <button
                  onClick={() => toggleDropdown("exam")}
                  className="flex items-center gap-3 px-4 py-3 text-white w-full text-right hover:bg-white/10 rounded-l-md"
                >
                  <FaFileAlt />
                  <span className="flex-1">الامتحان التجريبي</span>
                  <FaChevronDown
                    className={`transition-transform duration-300 ${openDropdown === "exam" ? "rotate-180" : ""
                      }`}
                  />
                </button>
                {openDropdown === "exam" && (
                  <ul className="ml-6 mt-1 pr-2 flex flex-col gap-1">
                    <li>
                      <NavLink
                        to="/dashboard/Exam/questions-settings"
                        className={linkClasses}
                        onClick={() => setIsOpen(false)}
                      >
                        إعدادات الأسئلة
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/Exam/result-settings"
                        className={linkClasses}
                        onClick={() => setIsOpen(false)}
                      >
                        إعدادات النتيجة
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>




              <li className="mt-6">
                <NavLink
                  to="/Login"
                  className={linkClasses}
                  onClick={handleLogout}
                >
                  <FaSignOutAlt /> <span className="flex-1 text-right">تسجيل الخروج</span>
                </NavLink>
              </li>

            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
