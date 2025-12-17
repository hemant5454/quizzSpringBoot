package com.example.demo_hemant.controller;

import com.example.demo_hemant.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("quiz")
public class QuizController {

    @Autowired
    QuizService quizService;

    @PostMapping("create/")
    public String createQuiz(@RequestParam String category, @RequestParam Integer numQ, @RequestParam String title) {
        return quizService.createQuize(category, numQ, title);
    }
    @GetMapping("print/")
    public String printName() {
        return "Hi, How are you!!";
    }
}
