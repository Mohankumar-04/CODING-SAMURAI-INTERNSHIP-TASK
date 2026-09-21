package com.library.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record BookDTO(
    Long id,

    @NotBlank(message = "ISBN is required")
    String isbn,

    @NotBlank(message = "Title is required")
    String title,

    @NotBlank(message = "Author is required")
    String author,

    String genre,

    @NotNull(message = "Total copies is required")
    @Min(value = 1, message = "Total copies must be at least 1")
    Integer totalCopies,

    Integer availableCopies
) {}