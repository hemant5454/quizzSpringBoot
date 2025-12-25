package com.example.demo_hemant.dao;

import com.example.demo_hemant.model.QuizResult;
import com.example.demo_hemant.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface QuizResultDao extends JpaRepository<QuizResult, Long> {

    @Query("SELECT qr FROM QuizResult qr WHERE qr.quiz.id = :quizId ORDER BY qr.percentage DESC, qr.completedAt ASC")
    List<QuizResult> findLeaderboardByQuizId(Integer quizId);
}
