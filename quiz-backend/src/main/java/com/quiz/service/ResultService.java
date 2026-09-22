package com.quiz.service;

import com.quiz.dto.AnswerDTO;
import com.quiz.dto.OptionDTO;
import com.quiz.dto.QuestionFeedbackDTO;
import com.quiz.dto.QuizResultResponseDTO;
import com.quiz.dto.QuizSubmitRequestDTO;
import com.quiz.entity.Question;
import com.quiz.entity.Quiz;
import com.quiz.entity.Result;
import com.quiz.entity.User;
import com.quiz.exception.ResourceNotFoundException;
import com.quiz.repository.QuestionRepository;
import com.quiz.repository.QuizRepository;
import com.quiz.repository.ResultRepository;
import com.quiz.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ResultService {

    private final ResultRepository resultRepository;
    private final QuizRepository quizRepository;
    private final UserRepository userRepository;
    private final QuestionRepository questionRepository;

    public ResultService(ResultRepository resultRepository,
                         QuizRepository quizRepository,
                         UserRepository userRepository,
                         QuestionRepository questionRepository) {
        this.resultRepository = resultRepository;
        this.quizRepository = quizRepository;
        this.userRepository = userRepository;
        this.questionRepository = questionRepository;
    }

    @Transactional
    public QuizResultResponseDTO submitQuiz(QuizSubmitRequestDTO request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + request.getUserId()));

        Quiz quiz = quizRepository.findById(request.getQuizId())
                .orElseThrow(() -> new ResourceNotFoundException("Quiz not found with id: " + request.getQuizId()));

        List<Question> questions = questionRepository.findByQuizId(quiz.getId());
        Map<Long, Question> questionMap = questions.stream()
                .collect(Collectors.toMap(Question::getId, q -> q));

        int score = 0;
        List<QuestionFeedbackDTO> feedbackList = new ArrayList<>();

        if (request.getAnswers() != null) {
            for (AnswerDTO answer : request.getAnswers()) {
                Question question = questionMap.get(answer.getQuestionId());
                if (question != null) {
                    boolean isCorrect = question.getCorrectAnswer().trim().equalsIgnoreCase(
                            answer.getSelectedAnswer() != null ? answer.getSelectedAnswer().trim() : ""
                    );

                    if (isCorrect) {
                        score++;
                    }

                    List<OptionDTO> optionDTOs = new ArrayList<>();
                    if (question.getOptions() != null) {
                        optionDTOs = question.getOptions().stream()
                                .map(opt -> new OptionDTO(opt.getOptionLabel(), opt.getOptionText()))
                                .collect(Collectors.toList());
                    }

                    QuestionFeedbackDTO feedback = new QuestionFeedbackDTO();
                    feedback.setQuestionId(question.getId());
                    feedback.setQuestionText(question.getQuestionText());
                    feedback.setSelectedAnswer(answer.getSelectedAnswer());
                    feedback.setCorrectAnswer(question.getCorrectAnswer());
                    feedback.setCorrect(isCorrect);
                    feedback.setOptions(optionDTOs);

                    feedbackList.add(feedback);
                }
            }
        }

        Result result = new Result();
        result.setUser(user);
        result.setQuiz(quiz);
        result.setScore(score);
        result.setTotalQuestions(questions.size());
        result.setAttemptedAt(LocalDateTime.now());

        Result savedResult = resultRepository.save(result);

        double percentage = questions.isEmpty() ? 0.0 :
                Math.round(((double) score / questions.size()) * 100.0 * 10.0) / 10.0;

        QuizResultResponseDTO response = new QuizResultResponseDTO();
        response.setId(savedResult.getId());
        response.setUserId(user.getId());
        response.setQuizId(quiz.getId());
        response.setQuizTitle(quiz.getTitle());
        response.setScore(score);
        response.setTotalQuestions(questions.size());
        response.setPercentage(percentage);
        response.setAttemptedAt(savedResult.getAttemptedAt());
        response.setFeedback(feedbackList);

        return response;
    }
}