package com.library.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.library.dto.BorrowRequestDTO;
import com.library.dto.TransactionResponseDTO;
import com.library.entity.Book;
import com.library.entity.BorrowTransaction;
import com.library.entity.Member;
import com.library.entity.MemberStatus;
import com.library.entity.TransactionStatus;
import com.library.exception.ResourceNotFoundException;
import com.library.repository.BookRepository;
import com.library.repository.BorrowTransactionRepository;
import com.library.repository.MemberRepository;

@Service
public class BorrowTransactionService {

    private final BorrowTransactionRepository transactionRepository;
    private final BookRepository bookRepository;
    private final MemberRepository memberRepository;

    private static final BigDecimal DAILY_FINE = BigDecimal.valueOf(2.00);
    private static final int BORROW_DURATION_DAYS = 14;

    public BorrowTransactionService(
            BorrowTransactionRepository transactionRepository,
            BookRepository bookRepository,
            MemberRepository memberRepository) {
        this.transactionRepository = transactionRepository;
        this.bookRepository = bookRepository;
        this.memberRepository = memberRepository;
    }

    public List<TransactionResponseDTO> getAllTransactions() {
        return transactionRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public List<TransactionResponseDTO> getTransactionsByMember(Long memberId) {
        return transactionRepository.findByMemberId(memberId)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    @Transactional
    public TransactionResponseDTO issueBook(BorrowRequestDTO request) {
        Book book = bookRepository.findById(request.bookId())
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with ID: " + request.bookId()));

        Member member = memberRepository.findById(request.memberId())
                .orElseThrow(() -> new ResourceNotFoundException("Member not found with ID: " + request.memberId()));

        if (member.getStatus() != MemberStatus.ACTIVE) {
            throw new IllegalStateException("Member account is not active. Status: " + member.getStatus());
        }

        if (book.getAvailableCopies() <= 0) {
            throw new IllegalStateException("No available copies left for book: " + book.getTitle());
        }

        book.setAvailableCopies(book.getAvailableCopies() - 1);
        bookRepository.save(book);

        BorrowTransaction transaction = new BorrowTransaction();
        transaction.setBook(book);
        transaction.setMember(member);
        transaction.setBorrowDate(LocalDate.now());
        transaction.setDueDate(LocalDate.now().plusDays(BORROW_DURATION_DAYS));
        transaction.setStatus(TransactionStatus.BORROWED);
        transaction.setFineAmount(BigDecimal.ZERO);

        BorrowTransaction saved = transactionRepository.save(transaction);
        return toDTO(saved);
    }

    @Transactional
    public TransactionResponseDTO returnBook(Long transactionId) {
        BorrowTransaction transaction = transactionRepository.findById(transactionId)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found with ID: " + transactionId));

        if (transaction.getStatus() == TransactionStatus.RETURNED) {
            throw new IllegalStateException("Book has already been returned for this transaction.");
        }

        LocalDate returnDate = LocalDate.now();
        transaction.setReturnDate(returnDate);

        if (returnDate.isAfter(transaction.getDueDate())) {
            long overdueDays = ChronoUnit.DAYS.between(transaction.getDueDate(), returnDate);
            transaction.setFineAmount(DAILY_FINE.multiply(BigDecimal.valueOf(overdueDays)));
            transaction.setStatus(TransactionStatus.OVERDUE);
        } else {
            transaction.setFineAmount(BigDecimal.ZERO);
            transaction.setStatus(TransactionStatus.RETURNED);
        }

        Book book = transaction.getBook();
        book.setAvailableCopies(book.getAvailableCopies() + 1);
        bookRepository.save(book);

        BorrowTransaction updated = transactionRepository.save(transaction);
        return toDTO(updated);
    }

    private TransactionResponseDTO toDTO(BorrowTransaction t) {
        return new TransactionResponseDTO(
                t.getId(),
                t.getBook().getId(),
                t.getBook().getTitle(),
                t.getMember().getId(),
                t.getMember().getName(),
                t.getBorrowDate(),
                t.getDueDate(),
                t.getReturnDate(),
                t.getFineAmount(),
                t.getStatus()
        );
    }
}