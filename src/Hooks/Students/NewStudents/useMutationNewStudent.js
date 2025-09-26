import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addNewStudent,
  updateStudent,
  deleteStudent,
  moveNewStudentToWaitingStudent,
  updateWaitingStudent,
  deleteWaitingStudent,
} from "../../../APIs/Students/NewStudents/newStudentApis";

export const useAddNewStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addNewStudent,
    onSuccess: () => {
      queryClient.invalidateQueries(["allNewStudents"]);
    },
  });
};

export const useUpdateStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateStudent,
    onSuccess: () => {
      queryClient.invalidateQueries(["allNewStudents"]);
      queryClient.invalidateQueries(["allWaitingStudents"]);
    },
  });
};

export const useDeleteStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries(["allNewStudents"]);
      queryClient.invalidateQueries(["allWaitingStudents"]);
    },
  });
};


export const useMoveStudentToWaiting = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: moveNewStudentToWaitingStudent,
    onSuccess: () => {
      queryClient.invalidateQueries(["allNewStudents"]);
      queryClient.invalidateQueries(["allWaitingStudents"]);
    },
  });
};
export const useUpdateWaitingStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateWaitingStudent,
    onSuccess: () => {
      queryClient.invalidateQueries(["allNewStudents"]);
      queryClient.invalidateQueries(["allWaitingStudents"]);
    },
  });
};

export const useDeleteWaitingStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteWaitingStudent,
    onSuccess: () => {
      queryClient.invalidateQueries(["allNewStudents"]);
      queryClient.invalidateQueries(["allWaitingStudents"]);
    },
  });
};