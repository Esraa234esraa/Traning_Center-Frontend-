import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdminLogout } from '../../Hooks/useMutationAdmins';

import { FaUserShield, FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import { toast } from 'react-toastify';

export default function AdminDashboardHome() {
  const COLORS = {
    accent: '#127878',
    announceBg: '#EAF8F7',
    button: '#0DA3A4',
  };

  const navigate = useNavigate();
  const logoutMutation = useAdminLogout();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        navigate('/login');  // أو أي صفحة تسجيل دخول عندك
      },
      onError: () => {
        toast.error('فشل تسجيل الخروج، حاول مرة أخرى');
      }
    });
  };

  return (
    <div className="flex min-h-screen bg-white" dir="rtl">

      {/* المحتوى */}
      <main className="flex-1">
        {/* شريط الإعلان + تسجيل الخروج */}
        <div className="flex lg:flex-row items-center justify-between px-4 lg:px-6 py-3 border-b border-gray-200 gap-3">

          <div
            className="px-6 py-2 rounded-md lg:text-lg font-cairo  text-text_color text-baseMobile text-center"
          >
            تعلم كيف تبدأ رحلتك التعليمية بسرعة! شاهد ندوتنا المجانية للحصول على نصائح من خبرائنا.
          </div>
          <button
            onClick={handleLogout}
            className="px-buttonMobileX py-buttonMobileY rounded-md text-white text-buttonMobile font-medium shadow"
            style={{ backgroundColor: COLORS.button }}
            disabled={logoutMutation.isLoading}
          >
            {logoutMutation.isLoading ? 'جارٍ تسجيل الخروج...' : 'تسجيل الخروج'}
          </button>
        </div>


        {/* العنوان */}
        <div className="px-4 lg:px-12 py-8 text-center">
          <h2
            className=" text-xlmd:text-2xl  lg:text-4xl font-bold mb-4"
            style={{ color: COLORS.accent }}
          >
            مرحبا بك في لوحة تحكم مركز اللغة المثالية للتدريب
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed max-w-3xl mx-auto">
            يمكنك هنا إدارة كل ما يخص المركز: إضافة مشرفين، إضافة معلمين، وإدارة تفاصيل الحصص والدورات بسهولة.
          </p>
        </div>

        {/* البطاقات */}
        <div className="px-4 lg:px-12 grid gap-6 ">
          {[
            {
              title: "إضافة مشرف",
              desc: "بصفتك مشرفًا، يمكنك إدارة الحصص، إضافة الطلاب، وإنشاء الدورات التدريبية.",
              link: "/dashboard/add-admin",
              icon: <FaUserShield size={28} className="text-[#127878]" />,
            },
            {
              title: "إضافة معلمين",
              desc: "يمكن للمعلم متابعة الحصص والطلاب ومعرفة مواعيد الدروس بسهولة.",
              link: "/dashboard/add-teacher",
              icon: <FaChalkboardTeacher size={28} className="text-[#127878]" />,
            },
            {
              title: "إضافة طلاب",
              desc: "يمكنك متابعة جميع الطلاب المسجلين ومعرفة تفاصيلهم.",
              link: "/dashboard/students/current-students",
              icon: <FaUserGraduate size={28} className="text-[#127878]" />,
            },
          ].map((item, idx) => (
            <Link
              key={idx}
              to={item.link}
              className="flex flex-col justify-between p-4 rounded-lg bg-white shadow-sm border hover:shadow-md transition"
            >
              <div className="flex items-center gap-3 mb-2">
                {item.icon}
                <h3
                  className="font-semibold text-lg"
                  style={{ color: COLORS.accent }}
                >
                  {item.title}
                </h3>
              </div>
              <p className="text-sm text-gray-500">{item.desc}</p>

              <span className="mt-4 text-sm font-medium text-[#127878] hover:underline">
                ابدأ الآن →
              </span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
