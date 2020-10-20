package com.itp.unity.backend.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.itp.unity.backend.domain.Employee;
import com.itp.unity.backend.domain.Salary;
import com.itp.unity.backend.model.ResponseModel;
import com.itp.unity.backend.model.SalaryModel;
import com.itp.unity.backend.service.SalaryService;

import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/medical/")
public class SalaryController {

	    @Autowired
	    private SalaryService salaryService;

	    @GetMapping("/employees/salary")
	    public @ResponseBody ResponseEntity<List<SalaryModel>> getAllSalary() {
	        try {
	            return new ResponseEntity<>(salaryService.getAllSalarys(), HttpStatus.OK);

	        } catch (Exception e) {
	            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }

	    @PostMapping("/employees/salary")
	    public @ResponseBody ResponseEntity<?> createSalary(@Valid @RequestBody SalaryModel salaryModel) {
	        try {
	            if (salaryModel != null) {
	                if (salaryService.addSalary(salaryModel)) {
	                    return new ResponseEntity<Object>(new ResponseModel(200, "Record Successfully Saved", salaryModel),HttpStatus.OK);
	                } else {
	                return new ResponseEntity<Object>(new ResponseModel(502, "Record not Saved", null), HttpStatus.BAD_GATEWAY);
	            }
	            } else{
	                    return new ResponseEntity<Object>(new ResponseModel(417, "Salary Cannot be empty", null), HttpStatus.EXPECTATION_FAILED);
	            }
	        } catch (Exception e) {
	            return new ResponseEntity<Object>(new ResponseModel(422, "Error occurred when adding salary", null),HttpStatus.UNPROCESSABLE_ENTITY);
	        }

	    }
	    
	    @GetMapping("/employees/salary/getsalary/{id}")
	    public @ResponseBody ResponseEntity<?> getSalaryById(@PathVariable Long id) {

	        try {
	            if (salaryService.getSalaryById(id) != null) {
	                return new ResponseEntity<>(salaryService.getSalaryById(id), HttpStatus.OK);
	            } else {
	                return new ResponseEntity<>("Salary with id " +id + " doesn't exist", HttpStatus.BAD_REQUEST);
	            }

	        } catch (Exception e) {
	            return new ResponseEntity<>("Error in finding Salary with id "+id, HttpStatus.INTERNAL_SERVER_ERROR);
	        }

	    }
	    
//	    @GetMapping("/employees/salary/getallsalary/{id}")
//	    public @ResponseBody ResponseEntity<?> getAllSalaryById(@PathVariable Long id) {
//
//	        try {
//	            if (salaryService.getSalaryAllById(id) != null) {
//	                return new ResponseEntity<>(salaryService.getSalaryAllById(id), HttpStatus.OK);
//	            } else {
//	                return new ResponseEntity<>("Salary with id " +id + " doesn't exist", HttpStatus.BAD_REQUEST);
//	            }
//
//	        } catch (Exception e) {
//	            return new ResponseEntity<>("Error in finding Salary with id "+id, HttpStatus.INTERNAL_SERVER_ERROR);
//	        }
//
//	    }
//	    
	    @DeleteMapping("/employees/salary/{id}")
	    public @ResponseBody ResponseEntity<String> deleteSalary(@PathVariable Long id) {
	        try {
	            if (salaryService.deleteSalary(id)) {
	                return new ResponseEntity<String>("Salary with id "+id+" successfully deleted", HttpStatus.OK);
	            } else {
	                return new ResponseEntity<String>("Salary with id " +id+ " doesnt'exist", HttpStatus.UNPROCESSABLE_ENTITY);
	            }
	        } catch (Exception e) {
	            return new ResponseEntity<String>("Error occured when deleting Salary with id "+id, HttpStatus.EXPECTATION_FAILED);
	        }
	    }
	
	    
//	    @PutMapping("/employees/salary/{id}")
//	    public @ResponseBody ResponseEntity<?> updateSalary(@PathVariable Long id,
//	                                                                 @RequestBody Salary salaryModel) {
//	        try {
//	            if (salaryModel != null) {
//	                if (salaryService.updateSalary(id,salaryModel)) {
//	                    return new ResponseEntity<Object>(new ResponseModel(200, "Record Successfully Updated", salaryModel),HttpStatus.OK);
//	                } else {
//	                    return new ResponseEntity<Object>(new ResponseModel(400, "salaryModel not updated", null), HttpStatus.BAD_REQUEST);
//	                }
//	            } else{
//	                return new ResponseEntity<Object>(new ResponseModel(400, "salaryModel Cannot be empty", null), HttpStatus.BAD_REQUEST);
//	            }
//	        } catch (Exception e) {
//	            return new ResponseEntity<Object>(new ResponseModel(422, "Error occurred when updating salaryModel", null),HttpStatus.UNPROCESSABLE_ENTITY);
//	        }
//
//	    }
	    
	    @PutMapping("/employees/salary/{id}")
	    public @ResponseBody ResponseEntity<?> updateSalary(@PathVariable Long id,
	                                                                 @RequestBody SalaryModel salaryModel) {
	        try {
	            if (salaryModel != null) {
	                if (salaryService.updateSalary(id,salaryModel)) {
	                    return new ResponseEntity<Object>(new ResponseModel(200, "Record Successfully Updated", salaryModel),HttpStatus.OK);
	                } else {
	                    return new ResponseEntity<Object>(new ResponseModel(400, "salaryModel not updated", null), HttpStatus.BAD_REQUEST);
	                }
	            } else{
	                return new ResponseEntity<Object>(new ResponseModel(400, "salaryModel Cannot be empty", null), HttpStatus.BAD_REQUEST);
	            }
	        } catch (Exception e) {
	            return new ResponseEntity<Object>(new ResponseModel(422, "Error occurred when updating salaryModel", null),HttpStatus.UNPROCESSABLE_ENTITY);
	        }

	    }
	
}
