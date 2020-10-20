package com.itp.unity.backend.domain;

import java.io.Serializable;
import java.sql.Date;
import java.time.LocalDate;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "salary")
public class Salary implements Serializable {
	
	private static final long serialVersionUID = 00000000001;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long sid;
	
	@OneToOne
	@JoinColumn(name = "employee_id" , referencedColumnName = "id")
	@JsonIgnore
	private Employee employee_id;
	
	@NotNull
	@Column(name = "year")
	private int year;
	
	@NotNull
	@Column(name = "month")
	private String month;
	
	@NotNull
	@Column(name = "work_days")
	private int work_days;
	
	@NotNull
	@Column(name = "no_appointmnets")
	private int no_appointments;
	
	@Column(name = "salary")
	private float salary;
	
	@Column(name = "date_of_salary")
	private String datesal;
	
	private String sname;

	/**
	 * @return the sid
	 */
	public long getSid() {
		return sid;
	}

	/**
	 * @param sid the sid to set
	 */
	public void setSid(long sid) {
		this.sid = sid;
	}

	/**
	 * @return the employee_id
	 */
	public Employee getEmployee_id() {
		return employee_id;
	}

	/**
	 * @param employee_id the employee_id to set
	 */
	public void setEmployee_id(Employee employee_id) {
		this.employee_id = employee_id;
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
	 * @return the work_days
	 */
	public int getWork_days() {
		return work_days;
	}

	/**
	 * @param work_days the work_days to set
	 */
	public void setWork_days(int work_days) {
		this.work_days = work_days;
	}

	/**
	 * @return the salary
	 */
	public float getSalary() {
		return salary;
	}

	/**
	 * @param salary the salary to set
	 */
	public void setSalary(float salary) {
		this.salary = salary;
	}

	/**
	 * @return the datesal
	 */
	public String getDatesal() {
		return datesal;
	}

	/**
	 * @param datesal the datesal to set
	 */
	public void setDatesal(String datesal) {
		this.datesal = datesal;
	}
	
	/**
	 * @return the no_appointments
	 */
	public int getNo_appointments() {
		return no_appointments;
	}

	/**
	 * @param no_appointments the no_appointments to set
	 */
	public void setNo_appointments(int no_appointments) {
		this.no_appointments = no_appointments;
	}

	/**
	 * @return the sname
	 */
	public String getSname() {
		return sname;
	}

	/**
	 * @param sname the sname to set
	 */
	public void setSname(String sname) {
		this.sname = sname;
	}
	


}
