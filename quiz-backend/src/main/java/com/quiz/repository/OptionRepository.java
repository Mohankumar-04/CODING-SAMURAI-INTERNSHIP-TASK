package com.quiz.repository;

import com.quiz.entity.Option;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OptionRepository extends JpaRepository<Option, Long> {

    // Fetch all options for a specific question
    List<Option> findByQuestionId(Long questionId);
}