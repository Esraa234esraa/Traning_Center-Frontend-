import { useQuery } from "@tanstack/react-query";
import { getAllEvaluations } from "../../APIs/Evaluation/EvaluationAPI";


// const fetchEvaluations = async () => {
//   const res = await axios.get(`${API_URL}/GetAllEvaluation`, { withCredentials: true });
// //   return res.data?.filter((e) => e.isVisible !== false) || [];
//   return res.data || [];
// };

export const useGetAllEvaluations = () => {
  return useQuery({
     queryKey: ["evaluations"],
     queryFn: getAllEvaluations,
   });
};
