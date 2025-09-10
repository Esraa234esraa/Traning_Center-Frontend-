import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import resultImg from '../assets/images/ResultImg.png'; // تأكدي من المسار الصحيح

const questions = [
  { correct: 'ت' },
  { correct: 'ب' },
  // كملي باقي الأسئلة
];

const Result = () => {
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const savedAnswers = JSON.parse(localStorage.getItem('answers')) || [];
    const result = savedAnswers.reduce((acc, ans, i) => {
      if (ans === questions[i]?.correct) acc++;
      return acc;
    }, 0);
    setScore(result);
  }, []);

  return (
    <section className="py-20 px-6 md:px-20 font-cairo bg-blue-50 min-h-[80vh] flex items-center justify-center">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-md p-6 md:p-10 flex flex-col md:flex-row items-center gap-8">
        {/* الصورة */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img src={resultImg} alt="نتيجة الاختبار" className="max-w-[250px] w-full" />
        </div>

        {/* النص والنتيجة */}
        <div className="w-full md:w-1/2 text-center md:text-right">
          <h2 className="text-2xl md:text-3xl font-bold text-text_color mb-4">النتيجة</h2>
          <p className="text-lg md:text-xl text-gray-800 font-semibold mb-6">
            نتيجتك: {score} من {questions.length}
          </p>
<p className="text-lg md:text-xl text-gray-800 font-semibold mb-6">
  المستوي المتوقع : المستوي الاول
</p>
          <div className="flex justify-center md:justify-start gap-4 flex-wrap">
            <button
              onClick={() => navigate('/')}
              className="bg-secondary hover:bg-yellow-600 text-white font-bold px-6 py-2 rounded-full shadow-md transition-all"
            >
              الرجوع للرئيسية
            </button>

            <button
              onClick={() => navigate('/exam')}
              className="bg-background hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-full shadow-md transition-all"
            >
              إعادة الاختبار
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Result;
