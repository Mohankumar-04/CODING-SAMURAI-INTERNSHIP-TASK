package com.library.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.library.entity.BorrowTransaction;
import com.library.entity.TransactionStatus;

public interface BorrowTransactionRepository extends JpaRepository<BorrowTransaction, Long> {
    List<BorrowTransaction> findByMemberId(Long memberId);
    List<BorrowTransaction> findByStatus(TransactionStatus status);
}