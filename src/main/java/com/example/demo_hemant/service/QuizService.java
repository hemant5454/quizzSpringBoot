package com.example.demo_hemant.service;

import com.example.demo_hemant.dao.QuestionDao;
import com.example.demo_hemant.model.Question;
import com.example.demo_hemant.dao.QuizDao;
import com.example.demo_hemant.model.QuestionWrapper;
import com.example.demo_hemant.model.Quiz;
import com.example.demo_hemant.model.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class QuizService {

    @Autowired
    QuizDao quizDao;

    @Autowired
    QuestionDao questionDao;

    public String createQuiz(String category, Integer numQ, String title) {
        List<Question> questions = questionDao.findRandomQuestionByCategory(category, numQ);
        Quiz quiz = new Quiz();
        quiz.setTitle(title);
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
            System.out.println("Responses:" + r);
            Integer qId = r.getId();
            String qResponse = r.getResponse();
            System.out.println("----1-----");
            String correctResponse = questions.get(i).getCorrectAnswer();
            System.out.println("----2-----");
            if(qResponse.equals(correctResponse)) result++;
            System.out.println("Result: " + result);
            i++;
        }
        return result;
    }

    public List<Quiz> getAllQuizzes() {
        return quizDao.findAll();
    }
}
