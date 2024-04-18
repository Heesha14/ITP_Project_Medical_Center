package com.itp.unity.backend.service;

import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itp.unity.backend.domain.Employee;
import com.itp.unity.backend.domain.Salary;
import com.itp.unity.backend.model.SalaryModel;
import com.itp.unity.backend.repository.EmployeeRepository;
import com.itp.unity.backend.repository.SalaryRepository;


@Service
public class SalaryServiceImpl implements SalaryService {
	
		@Autowired
	    private SalaryRepository salaryRepository;
		
		@Autowired
	    private EmployeeRepository employeeRepository;
		
		@Autowired
		private EmployeeService employeeService;
		
		@Autowired
		private SalaryService salaryService;
		
		private static DecimalFormat df2 = new DecimalFormat("#");
	 
	    public List<SalaryModel> getAllSalarys() {
	        List<Salary> salaryList = new ArrayList<>();
	        List<SalaryModel> salaryModelList = new ArrayList<>();
	        SalaryModel salaryModel;
	        try {
	        	salaryList = salaryRepository.findAll();
	        	for(Salary salary : salaryList) {
	        		salaryModel = new SalaryModel();
	        		salaryModel.setSid(salary.getSid());
	        		salaryModel.setSalary(salary.getSalary());
	        		salaryModel.setMonth(salary.getMonth());
	        		salaryModel.setEmployee_id(Long.toString(salary.getEmployee_id().getId()));
	        		salaryModel.setDatesal(salary.getDatesal());
	        		salaryModel.setWork_days(salary.getWork_days());
	        		salaryModel.setNo_appointments(salary.getNo_appointments());
	        		salaryModel.setYear(salary.getYear());
	        		salaryModel.setSname(salary.getSname());
	        		
	        		salaryModelList.add(salaryModel);
	        	}
	            return salaryModelList;
	        } catch (Exception e) {
	            return null;
	        }
	    }
	    
//	    public List<SalaryModel> getSalaryAllById(Long sid){
//	    	 List<Salary> salaryList = new ArrayList<>();
//		        List<SalaryModel> salaryModelList = new ArrayList<>();
//		        SalaryModel salaryModel;
//		        try {
//		        	Employee emp = employeeService.getEmployeeById((sid));
//		        	Salary salary = salaryService.
//		        	salaryList = salaryRepository.getOne(sid);
//		        	for(Salary salary : salaryList) {
//		        		salaryModel = new SalaryModel();
//		        		salaryModel.setSid(salary.getSid());
//		        		salaryModel.setSalary(salary.getSalary());
//		        		salaryModel.setMonth(salary.getMonth());
//		        		salaryModel.setEmployee_id(Long.toString(salary.getEmployee_id().getId()));
//		        		salaryModel.setDatesal(salary.getDatesal().toString());
//		        		salaryModel.setWork_days(salary.getWork_days());
//		        		salaryModel.setYear(salary.getYear());
//		        		
//		        		salaryModelList.add(salaryModel);
//		        	}
//		            return salaryModelList;
//		        } catch (Exception e) {
//		            return null;
//		        }
//	    	
//	    }
	    
	    public SalaryModel getSalaryById(Long sid) {
	    	SalaryModel salaryModel = new SalaryModel();
	    	salaryModel.setEmployee_id(Long.toString(sid));
	        Salary salary = new Salary();
	        try {
	        	salary = salaryRepository.findById(sid).get();
        		salaryModel.setSid(salary.getSid());
        		salaryModel.setSalary(salary.getSalary());
        		salaryModel.setMonth(salary.getMonth());
        		salaryModel.setEmployee_id(Long.toString(salary.getEmployee_id().getId()));
        		salaryModel.setDatesal(salary.getDatesal());
        		salaryModel.setWork_days(salary.getWork_days());
        		salaryModel.setNo_appointments(salary.getNo_appointments());
        		salaryModel.setYear(salary.getYear());
        		salaryModel.setSname(salary.getSname());
        		
        		return salaryModel;
	            //return salaryModel;
	        } catch (Exception e) {
	            return null;
	        }
	    }
	   
	    
//	    public SalaryModel getSalarysById(Long.Long sid) {
//	    	SalaryModel salary = new SalaryModel();
//	        try {
//	            salary = salaryRepository.findById(sid).get();
//	            return salary;
//	        } catch (Exception e) {
//	            return null;
//	        }
//	    }
	    
//	    public boolean addSalary(Salary salaryModel) {
//	    
//	    Optional <Employee> isPresentIDs = employeeRepository.findById((salaryModel.getEmployee_id().getId()));
//	    if(!isPresentIDs.isPresent()) {
//	    	System.out.println("EmployeeID not match");
//	    	return false;
//	    }
//	    else {
//	    
//
//	    	Salary salary = new Salary();
//	    	salary.setEmployee_id(salaryModel.getEmployee_id());
//	        salary.setYear(salaryModel.getYear());
//	        salary.setMonth(salaryModel.getMonth());
//	        salary.setWork_days(salaryModel.getWork_days());
//	        salary.setSalary(salaryModel.getSalary());
//	        try {
//	            salaryRepository.save(salary);
//	            return true;
//	        } catch (Exception e) {
//	            return false;
//	        }
//	       
//	        }
//	    }
	    
		public boolean addSalary(SalaryModel salaryModel) {
			long millis=System.currentTimeMillis();  
			java.sql.Date date=new java.sql.Date(millis); 
			

//			Optional<Employee> isPresentIDs = employeeRepository.findById(Long.parseLong((salaryModel.getEmployee_id())));
			
			Employee emp = employeeService.getEmployeeById(Long.parseLong((salaryModel.getEmployee_id())));
			if (emp == null) {
				System.out.println("EmployeeID not match");
				return false;
			} else {
				
				df2.setRoundingMode(RoundingMode.HALF_EVEN);
				Salary salary = new Salary();
				salary.setEmployee_id(emp);
				salary.setYear(salaryModel.getYear());
				salary.setMonth(salaryModel.getMonth());
				salary.setWork_days(salaryModel.getWork_days());
				salary.setSalary(Float.parseFloat(df2.format(salaryModel.getSalary())));
				salary.setDatesal(salaryModel.getDatesal());
				salary.setNo_appointments(salaryModel.getNo_appointments());
				salary.setSname(salaryModel.getSname());
				try {
					salaryRepository.save(salary);
					return true;
				} catch (Exception e) {
					return false;
				}

			}
		}
	    
	    public boolean deleteSalary(Long id) {
	        Salary salary = new Salary();
	        try {
	        	salary = salaryRepository.findById(id).get();
	        	salaryRepository.delete(salary);
	            return true;
	        }catch(Exception e) {
	            return false;
	        }
	    }

//	    public boolean updateSalary(Long id, Salary salaryModel) {
//	        Optional<Salary> sal = salaryRepository.findById(id);
//	        if (sal.isPresent()) {
//	            Salary salary = sal.get();
//	            
//	            try {
//	            	salary.setEmployee_id(salaryModel.getEmployee_id());
//	    	        salary.setYear(salaryModel.getYear());
//	    	        salary.setMonth(salaryModel.getMonth());
//	    	        salary.setWork_days(salaryModel.getWork_days());
//	    	        salary.setSalary(salaryModel.getSalary());
//	    	        salary.setNo_appointments(salaryModel.getNo_appointments());
//	    	        salary.setSname(salaryModel.getSname());
//	                Salary updateSalary = salaryRepository.save(salary);
//	                return true;
//
//	            } catch (Exception e) {
//	                return false;
//	            }
//	        } else {
//	            return false;
//	        }
//	    }
	    
	    
	    
	    public boolean updateSalary(Long id, SalaryModel salaryModel) {
	        Optional<Salary> sal = salaryRepository.findById(id);
	   
	        if (sal.isPresent()) {
	        	Employee emp = employeeService.getEmployeeById(Long.parseLong((salaryModel.getEmployee_id())));
	            
	            try {
	            	df2.setRoundingMode(RoundingMode.HALF_EVEN);
	            	Salary salary = sal.get();
					salary.setEmployee_id(emp);
					salary.setYear(salaryModel.getYear());
					salary.setMonth(salaryModel.getMonth());
					salary.setWork_days(salaryModel.getWork_days());
					salary.setSalary(Long.parseLong(df2.format(salaryModel.getSalary())));
					salary.setDatesal(salaryModel.getDatesal());
					if(employeeService.getEmployeeDesinationById(Long.parseLong((salaryModel.getEmployee_id()))).equalsIgnoreCase("Doctor")){
						salary.setNo_appointments(salaryModel.getNo_appointments());
						System.out.println(salaryModel.getNo_appointments());
					}
					else if(employeeService.getEmployeeDesinationById(Long.parseLong((salaryModel.getEmployee_id()))) != "Doctor"){
						salary.setNo_appointments(0);
					}
					salary.setSname(salaryModel.getSname());
					System.out.println(salary);
	        		salaryRepository.save(salary);
	                return true;

	            } catch (Exception e) {
	                return false;
	            }
	        } else {
	            return false;
	        }
	    }

	    

		@Override
		public SalaryModel getSalarysById(Long id) {
			// TODO Auto-generated method stub
			return null;
		}

	    
}
