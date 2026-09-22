package com.quiz.repository;

import com.quiz.entity.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResultRepository extends JpaRepository<Result, Long> {

    // Fetch quiz history for a specific user, sorted from newest to oldest
    List<Result> findByUserIdOrderByAttemptedAtDesc(Long userId);
}