package com.example.demo_hemant.service;
import com.example.demo_hemant.dto.CategoryStats;
import com.example.demo_hemant.model.Question;
import com.example.demo_hemant.dao.QuestionDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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

    public List<CategoryStats> getCategoriesWithStats() {
        List<String> categories = questionDao.findDistinctCategories();
        return categories.stream()
                .map(category -> {
                    long count = questionDao.findByCategory(category).size();
                    return new CategoryStats(category, count);
                })
                .sorted((a, b) -> Long.compare(b.getQuestionCount(), a.getQuestionCount()))
                .collect(Collectors.toList());
    }
}
