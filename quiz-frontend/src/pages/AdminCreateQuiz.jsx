import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';

const AdminCreateQuiz = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [quizInfo, setQuizInfo] = useState({
    title: '',
    description: '',
    category: '',
    timeLimitInMinutes: 10,
  });

  const [questions, setQuestions] = useState([
    {
      questionText: '',
      correctAnswer: 'A',
      options: [
        { optionLabel: 'A', optionText: '' },
        { optionLabel: 'B', optionText: '' },
        { optionLabel: 'C', optionText: '' },
        { optionLabel: 'D', optionText: '' },
      ],
    },
  ]);

  const handleQuizChange = (e) => {
    setQuizInfo({ ...quizInfo, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (qIndex, text) => {
    const updated = [...questions];
    updated[qIndex].questionText = text;
    setQuestions(updated);
  };

  const handleCorrectAnswerChange = (qIndex, label) => {
    const updated = [...questions];
    updated[qIndex].correctAnswer = label;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, optIndex, text) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex].optionText = text;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: '',
        correctAnswer: 'A',
        options: [
          { optionLabel: 'A', optionText: '' },
          { optionLabel: 'B', optionText: '' },
          { optionLabel: 'C', optionText: '' },
          { optionLabel: 'D', optionText: '' },
        ],
      },
    ]);
  };

  const removeQuestion = (qIndex) => {
    if (questions.length === 1) return;
    setQuestions(questions.filter((_, idx) => idx !== qIndex));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const payload = {
      ...quizInfo,
      timeLimitInMinutes: Number(quizInfo.timeLimitInMinutes),
      questions,
    };

    try {
      await API.post('/quizzes/full', payload);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create quiz.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>Create New Quiz</h1>
      {error && <div style={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>Quiz Details</h2>
          <div style={styles.formGroup}>
            <label style={styles.label}>Quiz Title</label>
            <input
              type="text"
              name="title"
              required
              value={quizInfo.title}
              onChange={handleQuizChange}
              placeholder="e.g. Python Essentials"
              style={styles.input}
            />
          </div>

          <div style={styles.grid2}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Category</label>
              <input
                type="text"
                name="category"
                required
                value={quizInfo.category}
                onChange={handleQuizChange}
                placeholder="e.g. Python, SQL, DevOps"
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Time Limit (minutes)</label>
              <input
                type="number"
                name="timeLimitInMinutes"
                min="1"
                required
                value={quizInfo.timeLimitInMinutes}
                onChange={handleQuizChange}
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Description</label>
            <textarea
              name="description"
              rows="3"
              value={quizInfo.description}
              onChange={handleQuizChange}
              placeholder="Brief description of the quiz topics..."
              style={styles.textarea}
            />
          </div>
        </div>

        {/* Questions Section */}
        <h2 style={{ ...styles.sectionTitle, marginTop: '2rem' }}>Questions & Options</h2>
        {questions.map((q, qIndex) => (
          <div key={qIndex} style={styles.card}>
            <div style={styles.qHeader}>
              <h3 style={styles.qTitle}>Question {qIndex + 1}</h3>
              {questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeQuestion(qIndex)}
                  style={styles.deleteBtn}
                >
                  Delete Question
                </button>
              )}
            </div>

            <div style={styles.formGroup}>
              <input
                type="text"
                required
                value={q.questionText}
                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                placeholder="Enter question statement..."
                style={styles.input}
              />
            </div>

            <div style={styles.optionsList}>
              {q.options.map((opt, optIndex) => (
                <div key={opt.optionLabel} style={styles.optionRow}>
                  <span style={styles.optLabelBadge}>{opt.optionLabel}</span>
                  <input
                    type="text"
                    required
                    value={opt.optionText}
                    onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
                    placeholder={`Option ${opt.optionLabel} text`}
                    style={styles.input}
                  />
                  <label style={styles.radioLabel}>
                    <input
                      type="radio"
                      name={`correct-${qIndex}`}
                      checked={q.correctAnswer === opt.optionLabel}
                      onChange={() => handleCorrectAnswerChange(qIndex, opt.optionLabel)}
                    />
                    Correct
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div style={styles.actionRow}>
          <button type="button" onClick={addQuestion} style={styles.addBtn}>
            + Add Another Question
          </button>
          <button type="submit" disabled={loading} style={styles.submitBtn}>
            {loading ? 'Publishing Quiz...' : 'Save & Publish Quiz'}
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: { maxWidth: '850px', margin: '2rem auto', padding: '0 1rem' },
  pageTitle: { fontSize: '1.8rem', color: '#111827', marginBottom: '1.5rem' },
  sectionTitle: { fontSize: '1.2rem', color: '#1f2937', marginBottom: '1rem' },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '1.5rem',
    marginBottom: '1.5rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
    border: '1px solid #e5e7eb',
  },
  formGroup: { marginBottom: '1rem' },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
  label: { display: 'block', fontSize: '0.85rem', color: '#4b5563', marginBottom: '0.3rem', fontWeight: '500' },
  input: {
    width: '100%',
    padding: '0.6rem',
    borderRadius: '4px',
    border: '1px solid #d1d5db',
    fontSize: '0.95rem',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '0.6rem',
    borderRadius: '4px',
    border: '1px solid #d1d5db',
    fontSize: '0.95rem',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  },
  qHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' },
  qTitle: { margin: 0, fontSize: '1.1rem', color: '#374151' },
  deleteBtn: { backgroundColor: 'transparent', color: '#ef4444', border: 'none', cursor: 'pointer', fontWeight: 'bold' },
  optionsList: { display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '1rem' },
  optionRow: { display: 'flex', alignItems: 'center', gap: '0.8rem' },
  optLabelBadge: {
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: '4px',
    fontWeight: 'bold',
  },
  radioLabel: { display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', cursor: 'pointer', whiteSpace: 'nowrap' },
  actionRow: { display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', marginBottom: '3rem' },
  addBtn: {
    backgroundColor: '#f3f4f6',
    color: '#1f2937',
    border: '1px solid #d1d5db',
    padding: '0.7rem 1.2rem',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  submitBtn: {
    backgroundColor: '#10b981',
    color: '#fff',
    border: 'none',
    padding: '0.7rem 1.5rem',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  error: {
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
    padding: '0.7rem',
    borderRadius: '6px',
    marginBottom: '1rem',
  },
};

export default AdminCreateQuiz;