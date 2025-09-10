import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/ligth-logo.png';
import { NavLink, Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();
  const [hasShadow, setHasShadow] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { label: 'الصفحة الرئيسية', href: 'home' },
    { label: 'من نحن', href: 'about' },
    { label: 'الدورات التدريبية', href: 'courses' },
    { label: 'نشاطات المركز', href: 'activities' },
    { label: 'امتحان تجريبي', href: 'examintro' },
    { label: 'تواصل معنا', href: 'contact' },
  ];

  // Function to scroll to section in the middle of screen
const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (section) {
    const rect = section.getBoundingClientRect();

    // لو العنصر ظاهر بالكامل في الشاشة، ما تعملش scroll
    const isFullyVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
    if (isFullyVisible) return;

    const sectionTop = rect.top + window.pageYOffset;

    // لو في الصفحة الرئيسية، ما تعملش offset وتخلي العنصر يبدأ من فوق
    const offset = location.pathname === '/' ? 0 : window.innerHeight / 2 - section.offsetHeight / 2;

    window.scrollTo({
      top: sectionTop - offset,
      behavior: 'smooth',
    });
  }
};


  // Handle link click
  const handleLinkClick = (id) => {
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
      setTimeout(() => scrollToSection(id), 100);
    } else {
      scrollToSection(id);
    }
    setIsOpen(false);
  };

  // When page loads with a hash (#about), scroll to it
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => scrollToSection(id), 100);
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setHasShadow(window.scrollY > 16);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const navbarClasses = `fixed top-0 left-0 w-full bg-white px-4 py-1 z-50 transition-shadow duration-300 ${hasShadow ? 'shadow-md' : ''
    }`;

  return (
    <nav className={navbarClasses} ref={menuRef}>
      <div className="flex items-center justify-between">
        {/* Desktop Links */}
        <ul className="hidden md:flex items-center mr-8 md:gap-6 lg:gap-9 text-[10px] md:text-[12px] lg:text-[1rem] 2xl:text-[1.2rem] font-semibold text-text_color">
          {links.map((link) => (
            <li key={link.label}>
              <button
                onClick={() => handleLinkClick(link.href)}
                className="hover:text-background transition-all"
              >
                {link.label}
              </button>
            </li>
          ))}
          <li key={'قوانين وسياسيات المركز'}>
            <NavLink
              to="/roles"
              className="hover:text-background transition-all"
            >
              سياسات وقوانين المركز
            </NavLink>
          </li>
        </ul>

        {/* Toggle Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Logo */}
        <div>
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="لوجو المركز"
              className="w-[60px] h-[60px] ml-0 md:ml-8"
            />
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="absolute w-1/3 flex items-center justify-center right-4 top-[100%] md:hidden bg-white shadow-md rounded-md p-4 flex-col gap-6 text-sm font-semibold text_color">
          {links.map((link) => (
            <li key={link.label} className="text-text_color hover:text-background transition-all">
              <button
                onClick={() => handleLinkClick(link.href)}
                className="hover:text-background transition-all"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
