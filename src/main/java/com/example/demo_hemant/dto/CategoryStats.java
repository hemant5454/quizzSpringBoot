package com.example.demo_hemant.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CategoryStats {
    private String category;
    private Long questionCount;
}
