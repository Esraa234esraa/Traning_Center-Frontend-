// DeleteReviewModal.jsx
import React from "react";

export default function DeleteReviewModal({ review, onClose, onConfirm }) {
    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black/50"
            onClick={onClose}
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg w-80"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-lg font-bold mb-4">حذف التقييم</h2>
                <p className="mb-4">هل أنت متأكد أنك تريد حذف التقييم الخاص بـ {review.evaluationOwner}؟</p>
                <div className="flex justify-end gap-2">
                    <button
                        className="px-3 py-1 bg-gray-400 text-white rounded"
                        onClick={onClose}
                    >
                        إلغاء
                    </button>
                    <button
                        className="px-3 py-1 bg-red-600 text-white rounded"
                        onClick={onConfirm}
                    >
                        حذف
                    </button>
                </div>
            </div>
        </div>
    );
}
