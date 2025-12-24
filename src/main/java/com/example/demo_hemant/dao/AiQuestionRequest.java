package com.example.demo_hemant.dto;

import lombok.Data;

@Data
public class AiQuestionRequest {
    private String topic;
    private String category;
    private String difficultyLevel;
    private Integer numberOfQuestions;
}
