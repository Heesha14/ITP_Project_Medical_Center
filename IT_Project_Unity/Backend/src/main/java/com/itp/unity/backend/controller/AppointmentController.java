package com.itp.unity.backend.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.itp.unity.backend.domain.Appointment;
import com.itp.unity.backend.domain.Employee;
import com.itp.unity.backend.model.ResponseModel;
import com.itp.unity.backend.repository.AppoitmentRepository;
import com.itp.unity.backend.service.AppointementService;

@CrossOrigin
@RestController
@RequestMapping("/api/medical/")
public class AppointmentController {
	
	 @Autowired
	    private AppointementService appointementService;
	 
	 @Autowired
		private AppoitmentRepository appoitmentRepository;
	
//	@PostMapping("/appointment")
//	public @ResponseBody Appointment createAppointment(@RequestBody Appointment appointment) {
//		return appoitmentRepository.save(appointment);
//		
//
//	}
	
    @PostMapping("/appointment")
    public @ResponseBody ResponseEntity<?> createEmployee(@RequestBody Appointment appointment) {
        try {
        	System.out.println("bbbbbbb");
        	appointementService.addAppoint(appointment);
                    return new ResponseEntity<Object>(new ResponseModel(200, "Record Successfully Saved", appointment),HttpStatus.OK);
               
        } catch (Exception e) {
        	System.out.println("aaaaaaa");
            return new ResponseEntity<Object>(new ResponseModel(422, "Error occurred when adding employee", null),HttpStatus.UNPROCESSABLE_ENTITY);
        }

    }
    
    @GetMapping("/getappointment/{id}/{year}/{month}")
    public @ResponseBody ResponseEntity<?> getAppointment(@PathVariable Long id,@PathVariable int year,@PathVariable String month){
    	System.out.println("ewft4tw445");
    	try {
    		System.out.println("tgetvg");
    	return new ResponseEntity<>(appointementService.getAppNo(id, year, month), HttpStatus.OK);
    	 } catch (Exception e) {
    		 System.out.println("cferg");
    		 return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
    		 }
    }
    

}
