import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import LogoPlaceholder from "../../assets/images/light-logo.png";
import {
  FaHome, FaChalkboardTeacher, FaUsers, FaSignOutAlt, FaCalendarAlt, FaListUl,
  FaUserPlus, FaFileAlt, FaStar, FaUserFriends, FaClock, FaNewspaper,
  FaRunning, FaChevronDown, FaLayerGroup, FaBookOpen, FaBoxOpen
} from "react-icons/fa";
import { useAdminLogout } from "../../Hooks/Admin/useMutationAdmins";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const logoutMutation = useAdminLogout();

  // استدعاء بيانات المستخدم من localStorage
  const userData = JSON.parse(localStorage.getItem("user"));
  const teacherId = userData?.id;
  const teacherName = userData?.fullName;

  const handleLogout = (e) => {
    e.preventDefault();
    logoutMutation.mutate();
    setIsOpen(false);
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

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <aside
        className={`fixed top-0 right-0 bottom-0 w-72 bg-primary h-screen z-50 transform transition-transform duration-300 
  ${isOpen ? "translate-x-0" : "translate-x-full"} 
  md:translate-x-0`}
      >
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
              {teacherId && (
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
              )}

              {/* باقي القوائم ... */}

              {/* تسجيل الخروج */}
              <li className="md:backdrop:mt-2">
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
