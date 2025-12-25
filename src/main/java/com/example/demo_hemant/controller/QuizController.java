package com.example.demo_hemant.controller;

import com.example.demo_hemant.dto.LeaderboardEntry;
import com.example.demo_hemant.model.QuestionWrapper;
import com.example.demo_hemant.model.Quiz;
import com.example.demo_hemant.model.QuizResult;
import com.example.demo_hemant.model.Response;
import com.example.demo_hemant.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


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
    public ResponseEntity<Map<String, Object>> submitQuiz(
            @PathVariable Integer id,
            @RequestBody Map<String, Object> payload) {

        System.out.println("Quiz ID: " + id);

        @SuppressWarnings("unchecked")
        List<Map<String, Object>> responsesRaw = (List<Map<String, Object>>) payload.get("responses");
        String username = (String) payload.get("username");
        String playerName = (String) payload.get("playerName");

        List<Response> responses = responsesRaw.stream()
                .map(r -> {
                    Response response = new Response();
                    response.setId(((Number) r.get("id")).intValue());
                    response.setResponse((String) r.get("response"));
                    return response;
                })
                .toList();

        responses.forEach(System.out::println);

        Integer score = quizService.getResult(id, responses);

        // Save result to leaderboard
        QuizResult result = quizService.saveQuizResult(id, username, playerName, score);

        Map<String, Object> response = new HashMap<>();
        response.put("score", score);
        response.put("resultId", result.getId());
        response.put("percentage", result.getPercentage());

        return ResponseEntity.ok(response);
    }

    @GetMapping("{id}/leaderboard")
    public List<LeaderboardEntry> getLeaderboard(@PathVariable Integer id) {
        return quizService.getLeaderboard(id);
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
