package com.itp.unity.backend.domain;

import javax.persistence.*;

@Entity
@Table(name = "appointment")
public class Appointment {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long aid;	
	
	private long emp_id;
	
	private int year;
	
	private String month;
	
	@Column(name = "no_of_appointments")
	private int no_appoint;

	/**
	 * @return the id
	 */
	public long getId() {
		return aid;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(long aid) {
		this.aid = aid;
	}

	/**
	 * @return the year
	 */
	public int getYear() {
		return year;
	}

	/**
	 * @param year the year to set
	 */
	public void setYear(int year) {
		this.year = year;
	}

	/**
	 * @return the month
	 */
	public String getMonth() {
		return month;
	}

	/**
	 * @param month the month to set
	 */
	public void setMonth(String month) {
		this.month = month;
	}

	/**
	 * @return the no_appoint
	 */
	public int getNo_appoint() {
		return no_appoint;
	}

	/**
	 * @param no_appoint the no_appoint to set
	 */
	public void setNo_appoint(int no_appoint) {
		this.no_appoint = no_appoint;
	}

	/**
	 * @return the aid
	 */
	public long getAid() {
		return aid;
	}

	/**
	 * @param aid the aid to set
	 */
	public void setAid(long aid) {
		this.aid = aid;
	}

	/**
	 * @return the emp_id
	 */
	public long getEmp_id() {
		return emp_id;
	}

	/**
	 * @param emp_id the emp_id to set
	 */
	public void setEmp_id(long emp_id) {
		this.emp_id = emp_id;
	}
	

}
