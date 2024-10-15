import axios from "axios";

export const getAllEmployees = () => {
  return axios.get("http://localhost:3000/employees");
};

export const addEmployee = (employee) => {
  return axios.post("http://localhost:3000/employees", employee);
};

export const updateEmployee = (employee) => {
  return axios.put(`$http://localhost:3000/employees/${employee.id}`, employee);
};

export const deleteEmployee = (employeeId) => {
  return axios.delete(`$"http://localhost:3000/employees/${employeeId}`);
};