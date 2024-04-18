package com.itp.unity.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.itp.unity.backend.domain.Appointment;

public interface AppoitmentRepository extends JpaRepository<Appointment, Long> {
	
	//public int getAppNo(Long id,int year,String month);
	 List<Appointment> findByYear(int Year);
	    List<Appointment> findByMonth(String Month);
	   // public int findBy
	

}
