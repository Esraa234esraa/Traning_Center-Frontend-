import { useQuery } from "@tanstack/react-query";
import { getAllCurrentStudents } from "./../../../APIs/Students/CurrentStudent/CurrentStudentApis";

export const useGetAllCurrentStudents = () => {
  return useQuery({
    queryKey: ["currentStudents"],
    queryFn: getAllCurrentStudents,
  });
};
