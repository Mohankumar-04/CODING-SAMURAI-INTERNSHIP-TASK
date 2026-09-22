import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/api';
import { AuthContext } from '../context/AuthContext';

const QuizPlay = () => {
  const { quizId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchQuestions = async () => {
      try {
        const response = await API.get(`/questions/quiz/${quizId}`);
        setQuestions(response.data);
      } catch (err) {
        setError('Failed to load questions for this quiz.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [quizId, user, navigate]);

  const handleSelectOption = (questionId, optionLabel) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionLabel,
    }));
  };

  const handleSubmitQuiz = async () => {
    if (submitting) return;
    setSubmitting(true);

    const answersPayload = questions.map((q) => ({
      questionId: q.id,
      selectedAnswer: selectedAnswers[q.id] || null,
    }));

    const payload = {
      userId: user.id,
      quizId: Number(quizId),
      answers: answersPayload,
    };

    try {
      const response = await API.post('/results/submit', payload);
      navigate(`/result`, { state: { result: response.data } });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit quiz.');
      setSubmitting(false);
    }
  };

  if (loading) return <div style={styles.centerText}>Loading questions...</div>;
  if (error) return <div style={{ ...styles.centerText, color: '#ef4444' }}>{error}</div>;
  if (questions.length === 0) {
    return <div style={styles.centerText}>No questions found for this quiz.</div>;
  }

  const currentQuestion = questions[currentIndex];
  const isAnswered = selectedAnswers[currentQuestion.id] !== undefined;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <span style={styles.progress}>
            Question {currentIndex + 1} of {questions.length}
          </span>
        </div>
        <div style={styles.answeredBadge}>
          Answered: {Object.keys(selectedAnswers).length}/{questions.length}
        </div>
      </header>

      {/* Question Card */}
      <div style={styles.card}>
        <h2 style={styles.questionText}>{currentQuestion.questionText}</h2>

        <div style={styles.optionsList}>
          {currentQuestion.options.map((opt) => {
            const isSelected = selectedAnswers[currentQuestion.id] === opt.optionLabel;
            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(currentQuestion.id, opt.optionLabel)}
                style={{
                  ...styles.optionButton,
                  backgroundColor: isSelected ? '#dbeafe' : '#ffffff',
                  borderColor: isSelected ? '#2563eb' : '#e5e7eb',
                }}
              >
                <span
                  style={{
                    ...styles.labelBadge,
                    backgroundColor: isSelected ? '#2563eb' : '#f3f4f6',
                    color: isSelected ? '#ffffff' : '#374151',
                  }}
                >
                  {opt.optionLabel}
                </span>
                <span style={styles.optionText}>{opt.optionText}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls */}
      <div style={styles.footer}>
        <button
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          style={{
            ...styles.navBtn,
            opacity: currentIndex === 0 ? 0.5 : 1,
            cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          Previous
        </button>

        {currentIndex < questions.length - 1 ? (
          <button
            onClick={() => setCurrentIndex((prev) => prev + 1)}
            style={styles.primaryBtn}
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmitQuiz}
            disabled={submitting}
            style={styles.submitBtn}
          >
            {submitting ? 'Submitting...' : 'Submit Quiz'}
          </button>
        )}
      </div>

      {/* Quick Jump Bar */}
      <div style={styles.jumpContainer}>
        {questions.map((q, idx) => {
          const filled = selectedAnswers[q.id] !== undefined;
          const active = idx === currentIndex;
          return (
            <button
              key={q.id}
              onClick={() => setCurrentIndex(idx)}
              style={{
                ...styles.jumpBtn,
                backgroundColor: active ? '#2563eb' : filled ? '#10b981' : '#e5e7eb',
                color: active || filled ? '#ffffff' : '#374151',
              }}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: '750px', margin: '2rem auto', padding: '0 1rem' },
  centerText: { textAlign: 'center', marginTop: '3rem', fontSize: '1.2rem', color: '#4b5563' },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  progress: { fontSize: '1rem', fontWeight: 'bold', color: '#4b5563' },
  answeredBadge: {
    backgroundColor: '#e5e7eb',
    color: '#374151',
    padding: '0.3rem 0.7rem',
    borderRadius: '12px',
    fontSize: '0.85rem',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '2rem',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb',
  },
  questionText: { fontSize: '1.25rem', color: '#1f2937', marginBottom: '1.5rem', lineHeight: '1.4' },
  optionsList: { display: 'flex', flexDirection: 'column', gap: '0.8rem' },
  optionButton: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.8rem 1rem',
    borderRadius: '8px',
    border: '2px solid #e5e7eb',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.15s ease',
  },
  labelBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    borderRadius: '6px',
    fontWeight: 'bold',
    marginRight: '1rem',
    flexShrink: 0,
  },
  optionText: { fontSize: '1rem', color: '#374151' },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1.5rem',
  },
  navBtn: {
    backgroundColor: '#6b7280',
    color: '#fff',
    border: 'none',
    padding: '0.6rem 1.2rem',
    borderRadius: '6px',
    fontWeight: 'bold',
  },
  primaryBtn: {
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    padding: '0.6rem 1.2rem',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  submitBtn: {
    backgroundColor: '#10b981',
    color: '#fff',
    border: 'none',
    padding: '0.6rem 1.4rem',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  jumpContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.5rem',
    marginTop: '2rem',
    flexWrap: 'wrap',
  },
  jumpBtn: {
    width: '36px',
    height: '36px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '0.9rem',
  },
};

export default QuizPlay;