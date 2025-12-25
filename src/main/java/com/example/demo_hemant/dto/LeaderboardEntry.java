package com.example.demo_hemant.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class LeaderboardEntry {
    private Integer rank;
    private String username;
    private String playerName;
    private Integer score;
    private Integer totalQuestions;
    private Integer percentage;
    private LocalDateTime completedAt;
}
