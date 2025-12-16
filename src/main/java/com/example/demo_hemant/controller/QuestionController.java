package com.example.demo_hemant.controller;

import com.example.demo_hemant.Question;
import com.example.demo_hemant.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("question")
public class QuestionController {

    @Autowired
    QuestionService questionService;

    @GetMapping("allQuestion")
    public List<Question> getAllQuestion() {

        return questionService.getAllQuestions();
    }
    @GetMapping("category/{category}")
    public List<Question> getQuestionsByCategory(@PathVariable String category) {

        return questionService.getQuestionByCategory(category);
    }
}


