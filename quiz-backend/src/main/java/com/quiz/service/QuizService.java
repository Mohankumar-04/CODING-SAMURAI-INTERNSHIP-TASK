package com.quiz.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.quiz.dto.CreateQuizRequestDTO;
import com.quiz.dto.QuizResponseDTO;
import com.quiz.entity.Option;
import com.quiz.entity.Question;
import com.quiz.entity.Quiz;
import com.quiz.exception.ResourceNotFoundException;
import com.quiz.repository.OptionRepository;
import com.quiz.repository.QuestionRepository;
import com.quiz.repository.QuizRepository;

@Service
public class QuizService {

    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;
    private final OptionRepository optionRepository;

    public QuizService(QuizRepository quizRepository,
                       QuestionRepository questionRepository,
                       OptionRepository optionRepository) {
        this.quizRepository = quizRepository;
        this.questionRepository = questionRepository;
        this.optionRepository = optionRepository;
    }

    public List<QuizResponseDTO> getAllQuizzes() {
        return quizRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public QuizResponseDTO getQuizById(Long id) {
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz not found with id: " + id));
        return mapToDTO(quiz);
    }

    @Transactional
    public QuizResponseDTO createFullQuiz(CreateQuizRequestDTO request) {
        Quiz quiz = new Quiz();
        quiz.setTitle(request.getTitle());
        quiz.setDescription(request.getDescription());
        quiz.setCategory(request.getCategory());
        quiz.setTimeLimitInMinutes(request.getTimeLimitInMinutes());
        Quiz savedQuiz = quizRepository.save(quiz);

        if (request.getQuestions() != null) {
            for (CreateQuizRequestDTO.CreateQuestionDTO qDto : request.getQuestions()) {
                Question question = new Question();
                question.setQuiz(savedQuiz);
                question.setQuestionText(qDto.getQuestionText());
                question.setCorrectAnswer(qDto.getCorrectAnswer());
                Question savedQuestion = questionRepository.save(question);

                if (qDto.getOptions() != null) {
                    List<Option> options = qDto.getOptions().stream().map(optDto -> {
                        Option opt = new Option();
                        opt.setOptionLabel(optDto.getOptionLabel());
                        opt.setOptionText(optDto.getOptionText());
                        opt.setQuestion(savedQuestion);
                        return opt;
                    }).collect(Collectors.toList());

                    optionRepository.saveAll(options);
                }
            }
        }

        return mapToDTO(savedQuiz);
    }

    private QuizResponseDTO mapToDTO(Quiz quiz) {
        QuizResponseDTO dto = new QuizResponseDTO();
        dto.setId(quiz.getId());
        dto.setTitle(quiz.getTitle());
        dto.setDescription(quiz.getDescription());
        dto.setCategory(quiz.getCategory());
        dto.setTimeLimitInMinutes(quiz.getTimeLimitInMinutes());
        return dto;
    }
}