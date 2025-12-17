package com.example.demo_hemant.dao;

import com.example.demo_hemant.model.Question;
import com.example.demo_hemant.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizDao extends JpaRepository<Quiz, Integer> {

}
