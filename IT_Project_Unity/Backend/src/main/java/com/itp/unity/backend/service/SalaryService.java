package com.itp.unity.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.itp.unity.backend.domain.Salary;
import com.itp.unity.backend.model.SalaryModel;

@Service
public interface SalaryService {	

    public List<SalaryModel> getAllSalarys();
    public SalaryModel getSalaryById(Long id);
    public SalaryModel getSalarysById(Long id);
    public boolean addSalary(SalaryModel salaryModel);
    public boolean deleteSalary(Long id);
    //public boolean updateSalary(Long id, Salary salaryModel);
    public boolean updateSalary(Long id, SalaryModel salaryModel);

}
