package com.quiz.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizResultResponseDTO {
    private Long id;
    private Long userId;
    private Long quizId;
    private String quizTitle;
    private Integer score;
    private Integer totalQuestions;
    private Double percentage;
    private LocalDateTime attemptedAt;
    private List<QuestionFeedbackDTO> feedback;
}