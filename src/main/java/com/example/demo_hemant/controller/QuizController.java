package com.example.demo_hemant.controller;

import com.example.demo_hemant.model.QuestionWrapper;
import com.example.demo_hemant.model.Quiz;
import com.example.demo_hemant.model.Response;
import com.example.demo_hemant.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("quiz")
public class QuizController {

    @Autowired
    QuizService quizService;

    @PostMapping("create")
    public String createQuiz(@RequestParam String category, @RequestParam Integer numQ, @RequestParam String title, @RequestParam(required = false) String createdBy) {
        System.out.println("In backend");
        System.out.println("Category = " + category);
        System.out.println("NumQ = " + numQ);
        System.out.println("Title = " + title);
        System.out.println("Created By = " + createdBy);
        return quizService.createQuiz(category, numQ, title, createdBy);
    }
    @PostMapping("get/{id}")
    public List<QuestionWrapper> getQuestions(@PathVariable Integer id) {
        return quizService.getquizQuestions(id);

    }
    @PostMapping("submit/{id}")
    public Integer submitQuiz(@PathVariable Integer id, @RequestBody List<Response> responses) {
        System.out.println("Quiz ID: " + id);
        responses.forEach(System.out::println);
        return quizService.getResult(id, responses);
    }

    @GetMapping("all")
    public List<Quiz> getAllQuizzes() {
        return quizService.getAllQuizzes();
    }

    @DeleteMapping("delete/{id}")
    public String deleteQuiz(@PathVariable Integer id) {
        return quizService.deleteQuiz(id);
    }
}
