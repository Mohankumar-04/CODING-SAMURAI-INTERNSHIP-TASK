import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';

const Home = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/quizzes')
      .then((res) => {
        setQuizzes(res.data);
      })
      .catch((err) => {
        console.error('Error fetching quizzes:', err);
        setError('Failed to load quizzes. Please ensure the backend is running.');
      })
      .finally(() => setLoading(false));
  }, []);

  const handleStart = (quizId) => {
    const user = localStorage.getItem('quiz_user');
    if (!user) {
      navigate('/login');
    } else {
      navigate(`/quiz/${quizId}`);
    }
  };

  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '3rem', color: '#6b7280' }}>Loading available quizzes...</p>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <div>
          <h1 style={styles.title}>Available Quizzes</h1>
          <p style={styles.subtitle}>Choose a category and test your knowledge</p>
        </div>
      </div>

      {error && <p style={styles.errorText}>{error}</p>}

      {quizzes.length === 0 && !error ? (
        <div style={styles.emptyState}>
          <p>No quizzes found.</p>
          <button onClick={() => navigate('/admin/create-quiz')} style={styles.createBtn}>
            + Create the First Quiz
          </button>
        </div>
      ) : (
        <div style={styles.grid}>
          {quizzes.map((quiz) => (
            <div key={quiz.id} style={styles.card}>
              <span style={styles.badge}>{quiz.category || 'General'}</span>
              <h2 style={styles.cardTitle}>{quiz.title}</h2>
              <p style={styles.cardDesc}>{quiz.description || 'No description provided.'}</p>
              
              <div style={styles.metaRow}>
                <span style={styles.timeLimit}>⏱ {quiz.timeLimitInMinutes || 10} mins</span>
              </div>

              <button onClick={() => handleStart(quiz.id)} style={styles.startBtn}>
                Start Quiz
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '2rem auto',
    padding: '0 1rem',
  },
  headerRow: {
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2rem',
    color: '#111827',
    margin: '0 0 0.4rem 0',
  },
  subtitle: {
    color: '#6b7280',
    margin: 0,
    fontSize: '1rem',
  },
  errorText: {
    color: '#dc2626',
    backgroundColor: '#fee2e2',
    padding: '0.8rem',
    borderRadius: '6px',
    marginBottom: '1rem',
  },
  emptyState: {
    textAlign: 'center',
    padding: '3rem',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    border: '1px dashed #d1d5db',
    color: '#4b5563',
  },
  createBtn: {
    marginTop: '1rem',
    backgroundColor: '#10b981',
    color: '#fff',
    border: 'none',
    padding: '0.6rem 1.2rem',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '1.5rem',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.08)',
    border: '1px solid #e5e7eb',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#e0f2fe',
    color: '#0284c7',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    padding: '0.2rem 0.6rem',
    borderRadius: '4px',
    marginBottom: '0.8rem',
  },
  cardTitle: {
    fontSize: '1.25rem',
    color: '#1f2937',
    margin: '0 0 0.5rem 0',
  },
  cardDesc: {
    color: '#4b5563',
    fontSize: '0.92rem',
    lineHeight: '1.4',
    marginBottom: '1.2rem',
  },
  metaRow: {
    marginBottom: '1rem',
  },
  timeLimit: {
    fontSize: '0.85rem',
    color: '#6b7280',
    fontWeight: '500',
  },
  startBtn: {
    width: '100%',
    padding: '0.7rem',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '0.95rem',
  },
};

export default Home;