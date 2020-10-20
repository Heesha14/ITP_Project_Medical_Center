import axios, {AxiosInstance as http} from 'axios';

const EMPLOYEE_API_BASE_URL = 'http://localhost:8080/api/medical/employees'
const EMPLOYEE_API_BASE_URL1 = 'http://localhost:8080/api/medical/employees/salary'
const EMPLOYEE_API_BASE_URL2 = 'http://localhost:8080/api/medical/employees/name'
const EMPLOYEE_API_BASE_URL3 = 'http://localhost:8080/api/medical/employees/docname'
const EMPLOYEE_API_BASE_URL4 = 'http://localhost:8080/api/medical/employees/appointfee'
const EMPLOYEE_API_BASE_URL5 = 'http://localhost:8080/api/medical/employees/job'

class EmployeeService{

    getEmployees(){
        return axios.get(EMPLOYEE_API_BASE_URL);
    }

    createEmployee(employee){
        return axios.post(EMPLOYEE_API_BASE_URL,employee);
    }

    getEmployeeById(employeeId){
        return axios.get(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }

    getEmployeeByName(employeeId){
        return axios.get(EMPLOYEE_API_BASE_URL2 + '/' + employeeId)
    }

    getEmployeeDocNameById(employeeId){
        return axios.get(EMPLOYEE_API_BASE_URL3 + '/' + employeeId)
    }
    findByDesignation(){
        return axios.get(EMPLOYEE_API_BASE_URL4)
    }

    getEmployeeBySalary(employeeId){
        return axios.get(EMPLOYEE_API_BASE_URL1 + '/' + employeeId)
    }
    getEmployeeAppointFeeById(employeeId){
        return axios.get(EMPLOYEE_API_BASE_URL4 + '/' + employeeId)
    }
    updateEmployee(employee,employeeId){
        return axios.put(EMPLOYEE_API_BASE_URL + '/' + employeeId,employee);
    }

    deleteEmployee(employeeId){
        return axios.delete(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }

}

export default new EmployeeService()