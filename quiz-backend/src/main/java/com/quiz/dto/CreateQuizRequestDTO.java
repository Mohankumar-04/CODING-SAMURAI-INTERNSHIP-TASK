package com.quiz.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateQuizRequestDTO {
    private String title;
    private String description;
    private String category;
    private Integer timeLimitInMinutes;
    private List<CreateQuestionDTO> questions;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateQuestionDTO {
        private String questionText;
        private String correctAnswer; // "A", "B", "C", or "D"
        private List<OptionDTO> options;
    }
}