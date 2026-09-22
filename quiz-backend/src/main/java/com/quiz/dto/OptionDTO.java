package com.quiz.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OptionDTO {
    private Long id;
    private String optionLabel;
    private String optionText;

    // Optional 2-argument constructor if other places call it without ID
    public OptionDTO(String optionLabel, String optionText) {
        this.optionLabel = optionLabel;
        this.optionText = optionText;
    }
}