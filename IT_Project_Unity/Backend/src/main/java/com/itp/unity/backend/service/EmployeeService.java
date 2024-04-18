package com.itp.unity.backend.service;

import com.itp.unity.backend.domain.Employee;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface EmployeeService {

    public List<Employee> getAllEmployees();
    public List<Employee> getAllEmployeesDoctor();
    public Employee getEmployeeById(Long id);
    public int getEmployeeSalaryById(Long id);
    public int getEmployeeAppointmentById(Long id);
    public String getEmployeeDesinationById(Long id);
    public String  getEmployeeDocNameById(Long id);
    public String getEmployeeNameById(Long id);
    public boolean addEmployee(Employee employeeModel);
    public boolean deleteEmployee(Long id);
    public boolean updateEmployee(Long id, Employee employeeModel);
    public List<Employee> findByFirstnameContaining(String firstname);
    public List<Employee> findByDesignation(String designation);

    }
