// src/Hooks/Packedges/useMutationBouquet.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBouquet, updateBouquet, deleteBouquet } from "../../APIs/Bouquets/BouquetsApi";

// ✅ إضافة باقة
export const useAddBouquet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addBouquet,
    onSuccess: () => {
      queryClient.invalidateQueries(["bouquets"]); // تحديث الكاش
    },
  });
};

// ✅ تعديل باقة
export const useUpdateBouquet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBouquet,
    onSuccess: () => {
      queryClient.invalidateQueries(["bouquets"]);
    },
  });
};

// ✅ حذف باقة
export const useDeleteBouquet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBouquet,
    onSuccess: () => {
      queryClient.invalidateQueries(["bouquets"]);
    },
  });
};
