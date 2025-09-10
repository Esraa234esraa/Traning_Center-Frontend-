import React from 'react';
import { NavLink } from 'react-router-dom';

function Footer() {
  // scroll to top
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer id="contact" className="bg-primary text-white py-12 px-6 md:px-20 font-cairo relative">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">

        {/* تواصل معنا */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-secondary">نحن هنا لمساعدتك</h3>

          <p className="mb-2">تواصل معنا</p>

          {/* رقم الهاتف مع أيقونة اتصال */}
          <p className="mb-2 flex items-center gap-2">
            <i className="fas fa-phone text-secondary"></i>
            <a href="tel:+966536071891" className="hover:text-secondary transition-all">
              +966 53 607 1891
            </a>
          </p>

          {/* الإيميل */}
          <p className="mb-2">
            <i className="fas fa-envelope text-secondary"></i>

            <a
              href="mailto:almthalytallght@gmail.com"
              className="hover:text-secondary transition-all"
            >
              almthalytallght@gmail.com
            </a>
          </p>

          {/* أيقونات التواصل */}
          <div className="flex gap-4 mt-4 text-xl">
            <a
              href="https://wa.me/966536071891"
              target="_blank"
              className="hover:text-secondary transition-all"
            >
              <i className="fab fa-whatsapp"></i>
            </a>
            <a
              href="https://www.instagram.com/arabic_languag4"
              target="_blank"
              className="hover:text-secondary transition-all"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.tiktok.com/@arabic_languag6"
              target="_blank"
              className="hover:text-secondary transition-all"
            >
              <i className="fab fa-tiktok"></i>
            </a>
          </div>
        </div>

        {/* المركز */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-secondary">المركز</h3>
          <p className="mb-2 leading-relaxed">
            يعتمد المركز على منهجيات تعليمية متطورة تضمن للطلاب تحقيق تقدم مستمر في مهارات اللغة والتواصل.
          </p>
          <p className="italic mt-2">“نُعلّم… لنصنع الفارق.”</p>
        </div>

        {/* روابط */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-secondary">روابط مهمة</h3>
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/#about"
                className="hover:text-secondary transition-all"
              >
                من نحن
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/#courses"
                className="hover:text-secondary transition-all"
              >
                الدورات التدريبية
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/#activities"
                className="hover:text-secondary transition-all"
              >
                نشاطات المركز
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/roles"
                className="hover:text-secondary transition-all"
              >
                سياسات وقوانين المركز              </NavLink>
            </li>
          </ul>
        </div>

        {/* العنوان */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-secondary">العنوان</h3>
          <p className="mb-2">المملكة العربية السعودية</p>
          <p className="mb-2">الأحساء - العمران</p>
          <p className="mb-2">مركز اللغة المثالية للتدريب</p>
        </div>
      </div>

      {/* زر الرجوع لأعلى */}
      <button
        onClick={scrollToTop}
        className="absolute left-6 bottom-6 bg-secondary text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-yellow-600 transition-all"
        title="الرجوع لأعلى"
      >
        <i className="fas fa-arrow-up"></i>
      </button>

      {/* حقوق النشر */}
      <div className="mt-10 border-t border-white/20 pt-4 text-center text-xs text-gray-300">
        © 2025 مركز اللغة المثالية للتدريب. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}

export default Footer;
