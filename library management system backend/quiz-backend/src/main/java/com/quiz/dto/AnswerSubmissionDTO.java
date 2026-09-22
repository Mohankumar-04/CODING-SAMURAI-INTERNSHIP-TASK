package com.quiz.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnswerSubmissionDTO {
    private Long questionId;
    private String selectedAnswer; // e.g., "A", "B", "C", or "D"
}