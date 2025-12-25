package com.example.demo_hemant.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "quiz_result")
public class QuizResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne
    @JoinColumn(name = "quiz_id", nullable = false)
    private Quiz quiz;

    private String username;
    private String playerName;

    private Integer score;
    private Integer totalQuestions;
    private Integer percentage;

    private LocalDateTime completedAt;


}
