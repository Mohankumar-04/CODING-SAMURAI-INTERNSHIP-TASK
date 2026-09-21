package com.library.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.library.dto.BorrowRequestDTO;
import com.library.dto.TransactionResponseDTO;
import com.library.service.BorrowTransactionService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:5173")
public class BorrowTransactionController {

    private final BorrowTransactionService transactionService;

    public BorrowTransactionController(BorrowTransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping
    public ResponseEntity<List<TransactionResponseDTO>> getAllTransactions() {
        return ResponseEntity.ok(transactionService.getAllTransactions());
    }

    @GetMapping("/member/{memberId}")
    public ResponseEntity<List<TransactionResponseDTO>> getTransactionsByMember(@PathVariable Long memberId) {
        return ResponseEntity.ok(transactionService.getTransactionsByMember(memberId));
    }

    @PostMapping("/borrow")
    public ResponseEntity<TransactionResponseDTO> issueBook(@Valid @RequestBody BorrowRequestDTO request) {
        return new ResponseEntity<>(transactionService.issueBook(request), HttpStatus.CREATED);
    }

    @PutMapping("/return/{transactionId}")
    public ResponseEntity<TransactionResponseDTO> returnBook(@PathVariable Long transactionId) {
        return ResponseEntity.ok(transactionService.returnBook(transactionId));
    }
}