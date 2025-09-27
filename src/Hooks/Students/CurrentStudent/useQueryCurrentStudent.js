import { useQuery } from "@tanstack/react-query";
import { getAllCurrentStudents } from "../../../APIs/Students/CurrentStudent/CurrentStudentApis";

export const useGetAllCurrentStudents = (searchWord, pageNumber, pageSize) => {
  return useQuery({
    queryKey: ["currentStudents", searchWord, pageNumber, pageSize],
    queryFn: () => getAllCurrentStudents({ searchWord, pageNumber, pageSize }),
    keepPreviousData: true,
  });
};
