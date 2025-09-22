// src/Hooks/Packedges/useQueryBouquet.js
import { useQuery } from "@tanstack/react-query";
import { getAllBouquets, getBouquetById, getBouquetsOfLevel } from "../../APIs/Bouquets/BouquetsApi";

// ✅ كل الباقات
export const useGetAllBouquets = () => {
  return useQuery({
    queryKey: ["bouquets"],
    queryFn: getAllBouquets,
    select: (res) => res.data, // نرجع الداتا فقط
  });
};

// ✅ باقة واحدة
export const useGetBouquetById = (id) => {
  return useQuery({
    queryKey: ["bouquet", id],
    queryFn: () => getBouquetById(id),
    enabled: !!id, // يشتغل بس لما يبقى فيه id
    select: (res) => res.data,
  });
};

// ✅ كل باقات مستوى معين
export const useGetBouquetsOfLevel = (levelId) => {
  return useQuery({
    queryKey: ["bouquets", levelId],
    queryFn: () => getBouquetsOfLevel(levelId),
    enabled: !!levelId,
    select: (res) => res.data,
  });
};

