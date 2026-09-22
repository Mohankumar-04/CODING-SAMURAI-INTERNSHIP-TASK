package com.quiz.service;

import com.quiz.dto.OptionDTO;
import com.quiz.dto.QuestionResponseDTO;
import com.quiz.entity.Option;
import com.quiz.entity.Question;
import com.quiz.entity.Quiz;
import com.quiz.exception.ResourceNotFoundException;
import com.quiz.repository.OptionRepository;
import com.quiz.repository.QuestionRepository;
import com.quiz.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final OptionRepository optionRepository;
    private final QuizRepository quizRepository;

    @Autowired
    public QuestionService(QuestionRepository questionRepository,
                           OptionRepository optionRepository,
                           QuizRepository quizRepository) {
        this.questionRepository = questionRepository;
        this.optionRepository = optionRepository;
        this.quizRepository = quizRepository;
    }

    public List<QuestionResponseDTO> getQuestionsByQuizId(Long quizId) {
        if (!quizRepository.existsById(quizId)) {
            throw new ResourceNotFoundException("Quiz not found with id: " + quizId);
        }

        List<Question> questions = questionRepository.findByQuizId(quizId);
        List<QuestionResponseDTO> responseList = new ArrayList<>();

        for (Question q : questions) {
            List<Option> options = optionRepository.findByQuestionId(q.getId());
            List<OptionDTO> optionDTOs = new ArrayList<>();

            for (Option opt : options) {
                optionDTOs.add(new OptionDTO(opt.getId(), opt.getOptionLabel(), opt.getOptionText()));
            }

            responseList.add(new QuestionResponseDTO(q.getId(), q.getQuestionText(), optionDTOs));
        }

        return responseList;
    }

    public Question addQuestionToQuiz(Long quizId, Question question, List<Option> options) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz not found with id: " + quizId));

        question.setQuiz(quiz);
        Question savedQuestion = questionRepository.save(question);

        for (Option opt : options) {
            opt.setQuestion(savedQuestion);
            optionRepository.save(opt);
        }

        return savedQuestion;
    }
}