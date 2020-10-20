import axios, {AxiosInstance as http} from 'axios';

const EMPLOYEE_API_BASE_URL = 'http://localhost:8080/api/medical/employees/salary'
const EMPLOYEE_API_BASE_URL1 = 'http://localhost:8080/api/medical/employees/salary/getsalary'

class SalaryService{

    getAllSalary(){
        return axios.get(EMPLOYEE_API_BASE_URL);
    }

    createSalary(salary){
        return axios.post(EMPLOYEE_API_BASE_URL,salary);
    }

    getSalaryById(salaryId){
        return axios.get(EMPLOYEE_API_BASE_URL1 + '/' + salaryId);
    }
    deleteSalary(salaryId){
        return axios.delete(EMPLOYEE_API_BASE_URL + '/' + salaryId);
    }
    updateSalary(salary,salaryId){
        return axios.put(EMPLOYEE_API_BASE_URL + '/' + salaryId,salary);
    }

}

export default new SalaryService()