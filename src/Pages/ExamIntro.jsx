// src/Pages/ExamIntro.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ExamIntro = () => {
  const navigate = useNavigate();

  return (
    <section id="examintro" className=" scroll-mt-20 scroll-smooth py-10  px-6 md:px-20 font-cairo text-center bg-blue-50 min-h-[70vh] flex flex-col justify-center items-center">
            <h2 className="lg:text-3xl text-headingMobile font-bold text-text_color text-center mb-[4rem]">ابدأ اختبار القراءة التجريبي</h2>
      <p className="text-gray-600 max-w-xl lg:text-sm text-baseMobile  md:text-base leading-loose mb-8">
        اختبار تفاعلي يساعدك في تقييم قدرة طفلك على التعرّف على الحروف العربية من خلال أسئلة صوتية واختيارات بسيطة.
        في النهاية، تحصل على نتيجة توضّح مستواه الحالي في القراءة.
      </p>
      <button
        onClick={() => navigate('/exam')}
                    className="bg-secondary hover:bg-yellow-600 text-white font-bold px-6 py-2 rounded-full shadow-md transition-all"
      >
        ابدأ الاختبار التجريبي
      </button>
    </section>
  );
};

export default ExamIntro;
