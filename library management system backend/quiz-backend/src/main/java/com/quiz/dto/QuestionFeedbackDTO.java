package com.quiz.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionFeedbackDTO {
    private Long questionId;
    private String questionText;
    private String selectedAnswer;
    private String correctAnswer;
    private boolean correct;
    private List<OptionDTO> options;
}