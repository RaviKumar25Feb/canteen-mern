import { api } from "./api";

export const getStudents = () => api.get("/students");

export const createStudent = (data) =>
  api.post("/students/createStudent", data);

export const getStudentById = (id) =>
  api.get(`/students/${id}`);
