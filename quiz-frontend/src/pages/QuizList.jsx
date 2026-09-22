import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';
import { AuthContext } from '../context/AuthContext';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await API.get('/quizzes');
        setQuizzes(response.data);
      } catch (err) {
        setError('Failed to load quizzes. Ensure the backend server is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const handleStartQuiz = (quizId) => {
    if (!user) {
      navigate('/login');
    } else {
      navigate(`/quiz/${quizId}`);
    }
  };

  if (loading) return <div style={styles.centerText}>Loading quizzes...</div>;
  if (error) return <div style={{ ...styles.centerText, color: '#ef4444' }}>{error}</div>;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Available Quizzes</h1>
        <p style={styles.subtitle}>Select a quiz to test your knowledge</p>
      </header>

      {quizzes.length === 0 ? (
        <p style={styles.centerText}>No quizzes available right now.</p>
      ) : (
        <div style={styles.grid}>
          {quizzes.map((quiz) => (
            <div key={quiz.id} style={styles.card}>
              <span style={styles.categoryBadge}>{quiz.category || 'General'}</span>
              <h2 style={styles.quizTitle}>{quiz.title}</h2>
              <p style={styles.description}>{quiz.description}</p>
              
              <div style={styles.cardFooter}>
                <span style={styles.timerInfo}>
                  ⏱️ {quiz.timeLimitInMinutes ? `${quiz.timeLimitInMinutes} mins` : 'Untimed'}
                </span>
                <button
                  onClick={() => handleStartQuiz(quiz.id)}
                  style={styles.startBtn}
                >
                  Start Quiz
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { maxWidth: '1000px', margin: '2rem auto', padding: '0 1rem' },
  header: { textAlign: 'center', marginBottom: '2.5rem' },
  title: { fontSize: '2rem', color: '#111827', margin: 0 },
  subtitle: { color: '#6b7280', marginTop: '0.5rem' },
  centerText: { textAlign: 'center', marginTop: '3rem', fontSize: '1.2rem', color: '#4b5563' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '1.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    border: '1px solid #e5e7eb',
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#dbeafe',
    color: '#1d4ed8',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    padding: '0.25rem 0.6rem',
    borderRadius: '20px',
    textTransform: 'uppercase',
  },
  quizTitle: { fontSize: '1.3rem', color: '#1f2937', margin: '0.8rem 0 0.5rem 0' },
  description: { color: '#6b7280', fontSize: '0.95rem', lineHeight: '1.4', flexGrow: 1 },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '1.5rem',
    paddingTop: '1rem',
    borderTop: '1px solid #f3f4f6',
  },
  timerInfo: { fontSize: '0.85rem', color: '#4b5563' },
  startBtn: {
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
  },
};

export default QuizList;