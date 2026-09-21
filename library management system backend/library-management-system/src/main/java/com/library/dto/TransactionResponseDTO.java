package com.library.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.library.entity.TransactionStatus;

public record TransactionResponseDTO(
    Long id,
    Long bookId,
    String bookTitle,
    Long memberId,
    String memberName,
    LocalDate borrowDate,
    LocalDate dueDate,
    LocalDate returnDate,
    BigDecimal fineAmount,
    TransactionStatus status
) {}