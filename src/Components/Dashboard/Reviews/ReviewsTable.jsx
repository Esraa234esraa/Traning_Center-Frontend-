// ReviewsTable.jsx
import React, { useState, useEffect } from "react";
import DeleteReviewModal from "./DeleteReviewModal";
import { useDeleteEvaluation } from "../../../Hooks/Evaluation/useMutationEvaluation";
import { useGetAllEvaluations } from "../../../Hooks/Evaluation/useQueryEvaluation";
import Loading from "../../Loading";
import emptyImg from "../../../assets/images/empty.png"; // حطي صورة مناسبة هنا

export default function ReviewsTable() {
  const { data: allReviews = [], isLoading } = useGetAllEvaluations();
  const deleteMutation = useDeleteEvaluation();

  const [deleteReview, setDeleteReview] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    setReviews(allReviews);
  }, [allReviews]);

  if (isLoading) return <Loading />;

  const handleSearch = (e) => {
    const val = e.target.value.toLowerCase();
    setReviews(
      allReviews.filter((r) =>
        r.evaluationOwner?.toLowerCase().includes(val)
      )
    );
  };

  const handleFilterRating = (e) => {
    const val = e.target.value;

    if (val === "all") {
      setReviews(allReviews);
    } else if (val === "top") {
      const maxRating = Math.max(
        ...allReviews.map((r) => parseInt(r.rating) || 0)
      );
      setReviews(allReviews.filter((r) => parseInt(r.rating) === maxRating));
    } else {
      const num = parseInt(val);
      setReviews(allReviews.filter((r) => parseInt(r.rating) === num));
    }
  };

  const displayedReviews = reviews.length ? reviews : allReviews;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">إدارة التقييمات</h2>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="ابحث بالاسم ..."
          className="border p-2 rounded w-full"
          onChange={handleSearch}
        />
        <select className="border p-2 rounded" onChange={handleFilterRating}>
          <option value="all">كل التقييمات</option>
          <option value="top">الأعلى</option>
          <option value="5">تقييم 5</option>
          <option value="4">تقييم 4</option>
          <option value="3">تقييم 3</option>
          <option value="2">تقييم 2</option>
          <option value="1">تقييم 1</option>
        </select>
      </div>

      {/* لو مفيش تقييمات */}
      {displayedReviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-500">
          {/* أيقونة SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-24 h-24 mb-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 
           5.111a.563.563 0 00.475.345l5.518.402c.497.036.699.663.321.988
           l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385
           a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 
           00-.586 0L6.294 20.5a.562.562 0 01-.84-.61
           l1.285-5.385a.563.563 0 00-.182-.557L2.353 
           10.345c-.378-.325-.176-.952.321-.988l5.518-.402a.563.563 0 
           00.475-.345L11.48 3.5z"
            />
          </svg>

          <p className="text-lg font-medium">لا يوجد تقييمات حتى الآن</p>
        </div>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">الاسم</th>
              <th className="border p-2">الرأي</th>
              <th className="border p-2">التقييم</th>
              <th className="border p-2">الحالة</th>
              <th className="border p-2">التحكم</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <tr key={review.id} className="text-center">
                  <td className="border p-2">{review.evaluationOwner}</td>
                  <td className="border p-2">{review.opnion}</td>
                  <td className="border p-2">{review.rating}</td>
                  <td className="border p-2">ظاهر</td>
                  <td className="border p-2 space-x-2 space-x-reverse">
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded"
                      onClick={() => setDeleteReview(review)}
                    >
                      حذف
                    </button>
                     <button
                      className="px-2 py-1 bg-primary text-white rounded"
                    >
                      إظهار
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-10">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    {/* أيقونة */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-16 h-16 mb-3 text-gray-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12h6m2 0a2 2 0 100-4H7a2 2 0 100 4h10zM7 12v6m10-6v6"
                      />
                    </svg>
                    <p className="text-lg font-semibold">لا يوجد تقييمات مطابقة</p>
                    <p className="text-sm text-gray-400">حاول تغيير الفلترة أو البحث</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>

        </table>
      )}

      {deleteReview && (
        <DeleteReviewModal
          review={deleteReview}
          onClose={() => setDeleteReview(null)}
          onConfirm={() => {
            deleteMutation.mutate(deleteReview.id);
            setDeleteReview(null);
          }}
        />
      )}
    </div>
  );
}
