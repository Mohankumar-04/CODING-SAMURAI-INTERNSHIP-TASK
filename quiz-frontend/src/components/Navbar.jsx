import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem('quiz_user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleLogout = () => {
    localStorage.removeItem('quiz_user');
    navigate('/login');
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.navContainer}>
        <Link to="/" style={styles.logo}>
          ⚡ QuizApp
        </Link>

        <div style={styles.navLinks}>
          <Link to="/" style={styles.link}>
            Quizzes
          </Link>

          {/* Add Create Quiz link here */}
          <Link to="/admin/create-quiz" style={styles.createBtn}>
            + Create Quiz
          </Link>

          {user ? (
            <div style={styles.userSection}>
              <span style={styles.welcomeText}>Hello, {user.username}</span>
              <button onClick={handleLogout} style={styles.logoutBtn}>
                Logout
              </button>
            </div>
          ) : (
            <div style={styles.authLinks}>
              <Link to="/login" style={styles.link}>
                Login
              </Link>
              <Link to="/register" style={styles.registerBtn}>
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#1f2937',
    padding: '0.8rem 1.5rem',
    color: '#ffffff',
  },
  navContainer: {
    maxWidth: '1100px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    color: '#38bdf8',
    textDecoration: 'none',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.2rem',
  },
  link: {
    color: '#e5e7eb',
    textDecoration: 'none',
    fontSize: '0.95rem',
  },
  createBtn: {
    backgroundColor: '#10b981',
    color: '#ffffff',
    padding: '0.45rem 0.9rem',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '0.9rem',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  welcomeText: {
    color: '#d1d5db',
    fontSize: '0.95rem',
  },
  logoutBtn: {
    backgroundColor: '#ef4444',
    color: '#fff',
    border: 'none',
    padding: '0.4rem 0.8rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: 'bold',
  },
  authLinks: {
    display: 'flex',
    gap: '0.8rem',
    alignItems: 'center',
  },
  registerBtn: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    padding: '0.4rem 0.8rem',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '0.9rem',
  },
};

export default Navbar;