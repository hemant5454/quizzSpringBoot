package com.example.demo_hemant;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;
    private String category;

    @Column(name = "difficultylevel")
    private String difficultyLevel;
    private String QuestionTitle;
    private String option1;
    private String option2;
    private String option3;
    private String option4;
    private String correctAnswer;
}
