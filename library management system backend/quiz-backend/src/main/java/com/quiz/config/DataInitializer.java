package com.quiz.config;

import com.quiz.entity.Option;
import com.quiz.entity.Question;
import com.quiz.entity.Quiz;
import com.quiz.repository.OptionRepository;
import com.quiz.repository.QuestionRepository;
import com.quiz.repository.QuizRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;
    private final OptionRepository optionRepository;

    public DataInitializer(QuizRepository quizRepository,
                           QuestionRepository questionRepository,
                           OptionRepository optionRepository) {
        this.quizRepository = quizRepository;
        this.questionRepository = questionRepository;
        this.optionRepository = optionRepository;
    }

    private Option createOption(String label, String text, Question question) {
        Option opt = new Option();
        opt.setOptionLabel(label);
        opt.setOptionText(text);
        opt.setQuestion(question);
        return opt;
    }

    @Override
    public void run(String... args) {
        if (quizRepository.count() > 0) {
            return;
        }

        // 1. Java Quiz
        Quiz javaQuiz = new Quiz();
        javaQuiz.setTitle("Java Fundamentals Quiz");
        javaQuiz.setDescription("Test your core Java programming knowledge.");
        javaQuiz.setCategory("Java");
        javaQuiz.setTimeLimitInMinutes(10);
        Quiz savedJavaQuiz = quizRepository.save(javaQuiz);

        // Java Question 1
        Question q1 = new Question();
        q1.setQuiz(savedJavaQuiz);
        q1.setQuestionText("Which component is responsible for converting bytecode into machine instructions?");
        q1.setCorrectAnswer("B");
        Question savedQ1 = questionRepository.save(q1);

        optionRepository.saveAll(List.of(
                createOption("A", "JDK", savedQ1),
                createOption("B", "JVM", savedQ1),
                createOption("C", "JRE", savedQ1),
                createOption("D", "JIT Compiler only", savedQ1)
        ));

        // Java Question 2
        Question q2 = new Question();
        q2.setQuiz(savedJavaQuiz);
        q2.setQuestionText("What is the default value of a boolean variable in Java?");
        q2.setCorrectAnswer("C");
        Question savedQ2 = questionRepository.save(q2);

        optionRepository.saveAll(List.of(
                createOption("A", "true", savedQ2),
                createOption("B", "null", savedQ2),
                createOption("C", "false", savedQ2),
                createOption("D", "0", savedQ2)
        ));

        // 2. Web Quiz
        Quiz webQuiz = new Quiz();
        webQuiz.setTitle("Web Basics Quiz");
        webQuiz.setDescription("Fundamental questions on HTTP, REST, and web architecture.");
        webQuiz.setCategory("Web Development");
        webQuiz.setTimeLimitInMinutes(5);
        Quiz savedWebQuiz = quizRepository.save(webQuiz);

        // Web Question 1
        Question q3 = new Question();
        q3.setQuiz(savedWebQuiz);
        q3.setQuestionText("Which HTTP status code represents 'Resource Created'?");
        q3.setCorrectAnswer("B");
        Question savedQ3 = questionRepository.save(q3);

        optionRepository.saveAll(List.of(
                createOption("A", "200 OK", savedQ3),
                createOption("B", "201 Created", savedQ3),
                createOption("C", "204 No Content", savedQ3),
                createOption("D", "400 Bad Request", savedQ3)
        ));

        System.out.println(">>> Sample quiz data successfully seeded into MySQL! <<<");
    }
}