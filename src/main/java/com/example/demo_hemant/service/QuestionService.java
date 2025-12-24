package com.example.demo_hemant.service;
import com.example.demo_hemant.model.Question;
import com.example.demo_hemant.dao.QuestionDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService {
    @Autowired
    QuestionDao questionDao;


    public List<Question> getAllQuestions() {
        return questionDao.findAll();
    }

    public List<Question> getQuestionByCategory(String category) {
        return questionDao.findByCategory(category);
    }

    public String addQuestion(Question question) {
        questionDao.save(question);
        return "Success.";
    }

    public String addQuestionsList(List<Question> question) {
        for (Question q:question) {
            questionDao.save(q);
        }
        return "Success.";
    }
}
