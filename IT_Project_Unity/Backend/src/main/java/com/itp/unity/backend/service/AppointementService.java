package com.itp.unity.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itp.unity.backend.domain.Appointment;
import com.itp.unity.backend.repository.AppoitmentRepository;
@Service
public class AppointementService {
	
	@Autowired
	private AppoitmentRepository appoitmentRepository;
	
	public Appointment addAppoint(Appointment appointment) {
		try {
			System.out.println("wwwwwwwwww");
			return appoitmentRepository.save(appointment);
		} catch (Exception e) {
			System.out.println("eeeee");
			return null;
		}
	}

	public int getAppNo(Long id,int year, String month) {
		System.out.println("qqqqqqq");
		Appointment appointment = new Appointment();
		System.out.println("yyyyy");
		if (appoitmentRepository.findById(id).get() != null) {
			System.out.println("bbbbbb");
			if(appoitmentRepository.findByYear(year) != null) {
				System.out.println("cccccc");
				if(appoitmentRepository.findByMonth(month) != null) {
					System.out.println("aaaaaaaaaa");
					return appoitmentRepository.findById(id).get().getNo_appoint();
				}
			}
		}
		
		return year;
		
	}
	
}
