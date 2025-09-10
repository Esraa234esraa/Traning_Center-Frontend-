import React, { useEffect , useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    id: 1,
    audio: '/audio/q1.mp3',
    options: ['أ', 'ب', 'ت', 'ث'],
    correct: 'ت',
  },
  {
    id: 2,
    audio: '/audio/q2.mp3',
    options: ['ث', 'ت', 'ب', 'أ'],
    correct: 'ب',
  },
];

const Exam = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const handleAnswer = (choice) => {
    const updated = [...answers];
    updated[current] = choice;
    setAnswers(updated);
  };

  const handleSubmit = () => {
    localStorage.setItem('answers', JSON.stringify(answers));
    navigate('/result');
  };
  useEffect(() => {
    const section = document.getElementById("exam-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <section id="exam-section" className="py-[4.5rem] mt-[3rem] px-4 md:px-20 font-cairo min-h-[80vh] bg-blue-50">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-6 text-center">
        <h2 className="text-2xl font-bold mb-6 text-text_color">اختبار تجريبي</h2>
        <p className="mb-4 text-gray-700">انقر لسماع السؤال ثم اختر الاجابة الصحيحة</p>

        <p className="mb-2 text-sm text-gray-500">
          السؤال {current + 1} من {questions.length}
        </p>

        <audio controls className="mx-auto mb-4">
          <source src={questions[current].audio} type="audio/mpeg" />
          المتصفح لا يدعم الصوت
        </audio>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {questions[current].options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(opt)}
              className={`border rounded-lg py-2 transition font-bold ${
                answers[current] === opt
                  ? 'bg-background text-white'
                  : 'bg-white hover:bg-blue-100'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        <div className="flex justify-between">
          <button
            disabled={current === 0}
            onClick={() => setCurrent((prev) => prev - 1)}
            className="text-sm px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            السابق
          </button>
          {current === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="text-sm px-6 py-2 rounded bg-green-600 hover:bg-green-700 text-white"
            >
              إرسال الامتحان
            </button>
          ) : (
            <button
              onClick={() => setCurrent((prev) => prev + 1)}
              className="text-sm px-4 py-2 rounded bg-background hover:bg-blue-700 text-white"
            >
              التالي
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Exam;
