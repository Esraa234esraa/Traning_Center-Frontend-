import { useState } from "react";
import { ShieldCheck, Clock, Calendar, CreditCard, Camera, AlertCircle } from "lucide-react";

export default function Roles() {
  const rules = [
    {
      icon: <Clock className="w-6 h-6 text-secondary" />,
      title: "مدة الحصة وأيام العمل",
      text: "مدة كل حصة تدريبية 50 دقيقة، وتُعقد الحصص من يوم الأحد إلى يوم الخميس."
    },
    {
      icon: <Calendar className="w-6 h-6 text-secondary" />,
      title: "مواعيد الحصص والإلغاء",
      text: "يجب إبلاغ المركز قبل موعد الحصة عند الغياب لسبب مشروع، ولا يمكن تعويض أكثر من يوم واحد فقط."
    },
    {
      icon: <AlertCircle className="w-6 h-6 text-secondary" />,
      title: "التأخير",
      text: "يجب الوصول قبل موعد الحصة بـ 10 دقائق، وفي حال التأخير يُخصم من وقت الحصة."
    },
    {
      icon: <CreditCard className="w-6 h-6 text-secondary" />,
      title: "الرسوم والدفع",
      text: "تُدفع رسوم التسجيل عند الالتحاق وهي غير قابلة للاسترداد، وتُدفع رسوم الحصص الشهرية في بداية كل شهر."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-secondary" />,
      title: "الالتزام بالقوانين",
      text: "يلتزم الطالب بالأنظمة واللوائح المعمول بها في المركز، وعدم ارتكاب أي سلوك غير لائق."
    },
    {
      icon: <Camera className="w-6 h-6 text-secondary" />,
      title: "سياسة التصوير",
      text: "قد يتم تصوير الطالب أثناء التدريب ونشر الصور بعد موافقة ولي الأمر."
    }
  ];

  const [showAll, setShowAll] = useState(false);

  return (
    <section className="bg-gray-50 mt-[6rem] min-h-screen py-16 px-6 md:px-20">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-primary mb-10">
          سياسات وقوانين مركز اللغة المثالية للتدريب
        </h1>
        
        <div className="space-y-8">
          {(showAll ? rules : rules.slice(0, 4)).map((rule, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="bg-secondary/10 p-3 rounded-full">
                {rule.icon}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-primary">{rule.title}</h2>
                <p className="text-gray-700 leading-relaxed">{rule.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* زر قراءة المزيد */}
        {rules.length > 4 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-secondary/80 transition"
            >
              {showAll ? "عرض أقل" : "قراءة المزيد"}
            </button>
          </div>
        )}

        <div className="mt-12 text-center text-sm text-gray-500 border-t pt-6">
          © 2025 مركز اللغة المثالية للتدريب. جميع الحقوق محفوظة.
        </div>
      </div>
    </section>
  );
}
