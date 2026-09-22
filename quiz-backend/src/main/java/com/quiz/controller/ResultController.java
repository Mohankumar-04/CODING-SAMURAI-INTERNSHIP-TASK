package com.quiz.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quiz.dto.QuizResultResponseDTO;
import com.quiz.dto.QuizSubmitRequestDTO;
import com.quiz.service.ResultService;

@RestController
@RequestMapping("/api/results")
@CrossOrigin(origins = "*")
public class ResultController {

    private final ResultService resultService;

    public ResultController(ResultService resultService) {
        this.resultService = resultService;
    }

    @PostMapping("/submit")
    public ResponseEntity<QuizResultResponseDTO> submitQuiz(@RequestBody QuizSubmitRequestDTO request) {
        QuizResultResponseDTO result = resultService.submitQuiz(request);
        return ResponseEntity.ok(result);
    }
}