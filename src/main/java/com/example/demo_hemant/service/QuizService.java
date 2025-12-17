package com.example.demo_hemant.service;

import com.example.demo_hemant.dao.QuestionDao;
import com.example.demo_hemant.model.Question;
import com.example.demo_hemant.dao.QuizDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@Service
public class QuizService {

    @Autowired
    QuizDao quizDao;

    @Autowired
    QuestionDao questionDao;

    public String createQuize(String category, Integer numQ, String title) {
        return "I am here";
        //List<Question> questions = questionDao.findRandomQuestionByCategory(category, numQ);

    }
}
