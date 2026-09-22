package com.quiz.repository;

import com.quiz.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {

    // Filter quizzes by category (e.g., "Java", "Python", "Web")
    List<Quiz> findByCategoryIgnoreCase(String category);
}