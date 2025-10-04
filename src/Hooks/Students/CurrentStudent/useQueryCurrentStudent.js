import { useQuery } from "@tanstack/react-query";
import { getAllCurrentStudents,GetCurrentStudentById,GetAllCurrentStudentByClassId } from "../../../APIs/Students/CurrentStudent/CurrentStudentApis";

export const useGetAllCurrentStudents = (searchWord, pageNumber, pageSize,isPaid) => {
  return useQuery({
    queryKey: ["currentStudents", searchWord, pageNumber, pageSize,isPaid],
    queryFn: () => getAllCurrentStudents({ searchWord, pageNumber, pageSize,isPaid }),
    keepPreviousData: true,
  });
};

export const useGetCurrentStudentsById = (StudentId) => {
  return useQuery({
    queryKey: ["currentStudents", StudentId],
    queryFn: () => GetCurrentStudentById(StudentId),
    enabled: !!StudentId,
    select: (res) => res.data,
  });
};
export const useGetAllCurrentStudentByClassId = (ClassId) => {
  return useQuery({
    queryKey: ["currentStudents", ClassId],
    queryFn: () => GetAllCurrentStudentByClassId(ClassId),
    enabled: !!ClassId,
    select: (res) => res.data,
  });
};