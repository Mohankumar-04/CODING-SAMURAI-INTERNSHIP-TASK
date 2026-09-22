import { useLocation, Link, useNavigate } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  if (!result) {
    return (
      <div style={styles.centerText}>
        <p>No result data available.</p>
        <button onClick={() => navigate('/')} style={styles.actionBtn}>
          Go to Quizzes
        </button>
      </div>
    );
  }

  const isPassed = result.percentage >= 50;
  const feedback = result.feedback || [];

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={{ ...styles.badge, backgroundColor: isPassed ? '#dcfce7' : '#fee2e2' }}>
          <span style={{ color: isPassed ? '#16a34a' : '#dc2626', fontWeight: 'bold' }}>
            {isPassed ? 'Passed' : 'Needs Practice'}
          </span>
        </div>

        <h1 style={styles.title}>{result.quizTitle}</h1>
        <p style={styles.subtitle}>Quiz Completion Summary</p>

        <div style={styles.scoreBox}>
          <div style={styles.scoreNumber}>
            {result.score} / {result.totalQuestions}
          </div>
          <div style={styles.percentageText}>{result.percentage}% Score</div>
        </div>

        <div style={styles.buttonGroup}>
          <button onClick={() => navigate(`/quiz/${result.quizId}`)} style={styles.retryBtn}>
            Retake Quiz
          </button>
          <Link to="/" style={styles.homeBtn}>
            Browse More Quizzes
          </Link>
        </div>
      </div>

      {/* Answer Breakdown Section */}
      {feedback.length > 0 && (
        <div style={styles.reviewSection}>
          <h2 style={styles.reviewHeading}>Question & Answer Breakdown</h2>
          
          {feedback.map((item, idx) => (
            <div
              key={item.questionId || idx}
              style={{
                ...styles.questionCard,
                borderLeft: `5px solid ${item.correct ? '#10b981' : '#ef4444'}`,
              }}
            >
              <div style={styles.questionHeader}>
                <span style={styles.questionIndex}>Question {idx + 1}</span>
                <span
                  style={{
                    ...styles.statusTag,
                    backgroundColor: item.correct ? '#d1fae5' : '#fee2e2',
                    color: item.correct ? '#065f46' : '#991b1b',
                  }}
                >
                  {item.correct ? '✓ Correct' : '✗ Incorrect / Missed'}
                </span>
              </div>

              <p style={styles.qText}>{item.questionText}</p>

              {/* Options List */}
              <div style={styles.optionsGrid}>
                {item.options?.map((opt) => {
                  const isCorrectAnswer = opt.optionLabel === item.correctAnswer;
                  const isUserSelection = opt.optionLabel === item.selectedAnswer;

                  let optBg = '#f9fafb';
                  let optBorder = '#e5e7eb';
                  let textColor = '#374151';

                  if (isCorrectAnswer) {
                    optBg = '#ecfdf5';
                    optBorder = '#10b981';
                    textColor = '#065f46';
                  } else if (isUserSelection && !item.correct) {
                    optBg = '#fef2f2';
                    optBorder = '#ef4444';
                    textColor = '#991b1b';
                  }

                  return (
                    <div
                      key={opt.optionLabel}
                      style={{
                        ...styles.optionItem,
                        backgroundColor: optBg,
                        borderColor: optBorder,
                        color: textColor,
                      }}
                    >
                      <strong style={{ marginRight: '8px' }}>{opt.optionLabel}.</strong>
                      <span>{opt.optionText}</span>
                      {isCorrectAnswer && <span style={styles.correctIndicator}> (Correct Answer)</span>}
                      {isUserSelection && !isCorrectAnswer && (
                        <span style={styles.wrongIndicator}> (Your Choice)</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '850px',
    margin: '2rem auto',
    padding: '0 1rem',
  },
  centerText: { textAlign: 'center', marginTop: '4rem', fontSize: '1.2rem' },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '2rem',
    textAlign: 'center',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb',
    marginBottom: '2.5rem',
  },
  badge: {
    display: 'inline-block',
    padding: '0.4rem 1rem',
    borderRadius: '20px',
    fontSize: '0.9rem',
    marginBottom: '1rem',
  },
  title: { fontSize: '1.8rem', color: '#111827', margin: '0 0 0.4rem 0' },
  subtitle: { color: '#6b7280', fontSize: '1rem', marginBottom: '1.5rem' },
  scoreBox: {
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    padding: '1.2rem',
    marginBottom: '1.5rem',
    border: '1px dashed #d1d5db',
  },
  scoreNumber: { fontSize: '2.2rem', fontWeight: 'bold', color: '#1f2937' },
  percentageText: { fontSize: '1.1rem', color: '#4b5563', marginTop: '0.3rem' },
  buttonGroup: { display: 'flex', gap: '1rem', justifyContent: 'center' },
  retryBtn: {
    backgroundColor: '#6b7280',
    color: '#fff',
    border: 'none',
    padding: '0.6rem 1.2rem',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  homeBtn: {
    backgroundColor: '#2563eb',
    color: '#fff',
    padding: '0.6rem 1.2rem',
    borderRadius: '6px',
    fontWeight: '600',
    textDecoration: 'none',
  },
  actionBtn: {
    marginTop: '1rem',
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    padding: '0.6rem 1.2rem',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  reviewSection: { marginTop: '2rem' },
  reviewHeading: { fontSize: '1.4rem', color: '#111827', marginBottom: '1.2rem' },
  questionCard: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '1.2rem',
    marginBottom: '1.2rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    border: '1px solid #e5e7eb',
  },
  questionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.6rem',
  },
  questionIndex: { fontWeight: 'bold', color: '#4b5563', fontSize: '0.9rem' },
  statusTag: { padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' },
  qText: { fontSize: '1.05rem', fontWeight: '500', color: '#1f2937', marginBottom: '1rem' },
  optionsGrid: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  optionItem: {
    padding: '0.6rem 0.9rem',
    borderRadius: '6px',
    border: '1px solid',
    fontSize: '0.95rem',
  },
  correctIndicator: { fontWeight: 'bold', marginLeft: '6px', fontSize: '0.85rem' },
  wrongIndicator: { fontWeight: 'bold', marginLeft: '6px', fontSize: '0.85rem' },
};

export default Result;