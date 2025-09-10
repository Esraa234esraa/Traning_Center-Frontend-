import React, { useState } from "react";
import DeleteReviewModal from "./DeleteReviewModal";

export default function ReviewsTable() {
  const initialReviews = [
    {
      id: 1,
      date: "20-7-2025",
      review: "شرح مبسط وطرق تعليم ممتعة خلت طفلي يحب اللغة العربية أكثر",
      rating: "5/5",
      name: "علي",
      visible: true,
    },
    {
      id: 2,
      date: "20-7-2025",
      review: "--",
      rating: "2/5",
      name: "ولي امر",
      visible: true,
    },
    {
      id: 3,
      date: "20-7-2025",
      review: "--",
      rating: "--",
      name: "محمد",
      visible: true,
    },
  ];

  const [allReviews, setAllReviews] = useState(initialReviews);
  const [reviews, setReviews] = useState(initialReviews);
  const [deleteReview, setDeleteReview] = useState(null);

  // 🔍 فلترة البحث بالاسم
  const handleSearch = (e) => {
    const val = e.target.value.toLowerCase();
    setReviews(
      allReviews.filter((r) => r.name.toLowerCase().includes(val))
    );
  };

  // ⭐ فلترة التقييم
  const handleFilterRating = (e) => {
    const val = e.target.value;

    if (val === "all") {
      setReviews(allReviews);
    } else if (val === "top") {
      // نجيب أعلى قيمة تقييم موجودة
      const maxRating = Math.max(
        ...allReviews.map((r) => parseInt(r.rating) || 0)
      );
      setReviews(
        allReviews.filter((r) => parseInt(r.rating) === maxRating)
      );
    } else {
      const num = parseInt(val);
      setReviews(
        allReviews.filter(
          (r) => parseInt(r.rating) === num
        )
      );
    }
  };

  // 👁️ تبديل حالة الإظهار/الإخفاء
  const toggleVisibility = (id) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, visible: !r.visible } : r
      )
    );
    setAllReviews((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, visible: !r.visible } : r
      )
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">إدارة التقييمات</h2>

      <div className="flex gap-4 mb-4">
        {/* البحث */}
        <input
          type="text"
          placeholder="ابحث بالاسم ..."
          className="border p-2 rounded w-full"
          onChange={handleSearch}
        />

        {/* فلترة التقييم */}
        <select
          className="border p-2 rounded"
          onChange={handleFilterRating}
        >
          <option value="all">كل التقييمات</option>
          <option value="top">الأعلى </option>
          <option value="5">تقييم 5</option>
          <option value="4">تقييم 4</option>
          <option value="3">تقييم 3</option>
          <option value="2">تقييم 2</option>
          <option value="1">تقييم 1</option>
        </select>
      </div>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">الاسم</th>
            <th className="border p-2">الرأي</th>
            <th className="border p-2">التقييم</th>
            <th className="border p-2">التاريخ</th>
            <th className="border p-2">التحكم</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.id} className="text-center">
              <td className="border p-2">{review.name}</td>
              <td className="border p-2">{review.review}</td>
              <td className="border p-2">{review.rating}</td>
              <td className="border p-2">{review.date}</td>
              <td className="border p-2 space-x-2 space-x-reverse">
                <button
                  className={`px-2 py-1 rounded text-white ${review.visible ? "bg-green-500" : "bg-gray-400"
                    }`}
                  onClick={() => toggleVisibility(review.id)}
                >
                  {review.visible ? "إخفاء" : "إظهار"}
                </button>

                <button
                  className="px-2 py-1 bg-red-500 text-white rounded"
                  onClick={() => setDeleteReview(review)}
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* مودال الحذف */}
      {deleteReview && (
        <DeleteReviewModal
          review={deleteReview}
          onClose={() => setDeleteReview(null)}
          onConfirm={() => {
            setReviews((prev) =>
              prev.filter((r) => r.id !== deleteReview.id)
            );
            setAllReviews((prev) =>
              prev.filter((r) => r.id !== deleteReview.id)
            );
            setDeleteReview(null);
          }}
        />
      )}
    </div>
  );
}
