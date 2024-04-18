package com.itp.unity.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.itp.unity.backend.domain.Salary;

public interface SalaryRepository extends JpaRepository<Salary, Long>{



}
