package com.example.demo_hemant.service;

import com.example.demo_hemant.dao.QuestionDao;
import com.example.demo_hemant.dao.QuizResultDao;
import com.example.demo_hemant.dto.LeaderboardEntry;
import com.example.demo_hemant.model.*;
import com.example.demo_hemant.dao.QuizDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class QuizService {

    @Autowired
    QuizDao quizDao;

    @Autowired
    QuestionDao questionDao;

    @Autowired
    QuizResultDao quizResultDao;

    public String createQuiz(String category, Integer numQ, String title, String createdBy) {
        List<Question> questions = questionDao.findRandomQuestionByCategory(category, numQ);
        Quiz quiz = new Quiz();
        quiz.setTitle(title);
        quiz.setCategory(category);
        quiz.setCreatedBy(createdBy);
        quiz.setQuestions(questions);
        quizDao.save(quiz);

        return "Success.";


    }

    public List<QuestionWrapper> getquizQuestions(Integer id) {
        Optional<Quiz> quiz = quizDao.findById(id);
        List<Question> questionsFromQuiz = quiz.get().getQuestions();
        List<QuestionWrapper> questionForUsers = new ArrayList<>();

        for (Question q:questionsFromQuiz) {
            QuestionWrapper questionWrapper = new QuestionWrapper(q.getId(), q.getQuestionTitle(), q.getOption1(), q.getOption2(), q.getOption3(), q.getOption4());
            questionForUsers.add(questionWrapper);
        }
        return questionForUsers;

    }

    public Integer getResult(Integer id, List<Response> responses) {
        Integer result = 0;
        Optional<Quiz> quiz = quizDao.findById(id);
        List<Question> questions = quiz.get().getQuestions();
        System.out.println("Questions: " + questions);
        Integer i = 0;
        for (Response r:responses) {
            Integer qId = r.getId();
            String qResponse = r.getResponse();
            String correctResponse = questions.get(i).getCorrectAnswer();
            if(qResponse.equals(correctResponse)) result++;
            i++;
        }
        return result;
    }

    public QuizResult saveQuizResult(Integer quizId, String username, String playerName, Integer score) {
        Optional<Quiz> quizOpt = quizDao.findById(quizId);
        if (quizOpt.isEmpty()) {
            throw new RuntimeException("Quiz not found");
        }

        Quiz quiz = quizOpt.get();
        QuizResult result = new QuizResult();
        result.setQuiz(quiz);
        result.setUsername(username);
        result.setPlayerName(playerName);
        result.setScore(score);
        result.setTotalQuestions(quiz.getQuestions().size());

        return quizResultDao.save(result);
    }

    public List<LeaderboardEntry> getLeaderboard(Integer quizId) {
        List<QuizResult> results = quizResultDao.findLeaderboardByQuizId(quizId);

        return IntStream.range(0, results.size())
                .mapToObj(index -> {
                    QuizResult result = results.get(index);
                    return new LeaderboardEntry(
                            index + 1,
                            result.getUsername(),
                            result.getPlayerName(),
                            result.getScore(),
                            result.getTotalQuestions(),
                            result.getPercentage(),
                            result.getCompletedAt()
                    );
                })
                .collect(Collectors.toList());
    }

    public List<Quiz> getAllQuizzes() {
        return quizDao.findAll();
    }

    public String deleteQuiz(Integer id) {
        try {
            if (!quizDao.existsById(id)) {
                return "Quiz not found";
            }
            quizDao.deleteById(id);
            return "Quiz deleted successfully";
        } catch (Exception e) {
            return "Failed to delete quiz: " + e.getMessage();
        }
    }
}
