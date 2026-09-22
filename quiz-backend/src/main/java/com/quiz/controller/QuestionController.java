package com.quiz.controller;

import com.quiz.dto.QuestionResponseDTO;
import com.quiz.entity.Option;
import com.quiz.entity.Question;
import com.quiz.service.QuestionService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = "*")
public class QuestionController {

    private final QuestionService questionService;

    @Autowired
    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping("/quiz/{quizId}")
    public ResponseEntity<List<QuestionResponseDTO>> getQuestionsByQuizId(@PathVariable Long quizId) {
        List<QuestionResponseDTO> questions = questionService.getQuestionsByQuizId(quizId);
        return ResponseEntity.ok(questions);
    }

    @PostMapping("/quiz/{quizId}")
    public ResponseEntity<Question> addQuestionToQuiz(
            @PathVariable Long quizId,
            @RequestBody QuestionCreateRequest request) {
        
        Question question = new Question();
        question.setQuestionText(request.getQuestionText());
        question.setCorrectAnswer(request.getCorrectAnswer());

        Question saved = questionService.addQuestionToQuiz(quizId, question, request.getOptions());
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class QuestionCreateRequest {
        private String questionText;
        private String correctAnswer;
        private List<Option> options;
    }
}