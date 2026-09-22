import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import QuizPlay from './pages/QuizPlay';
import Result from './pages/Result';
import AdminCreateQuiz from './pages/AdminCreateQuiz';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/quiz/:id" element={<QuizPlay />} />
        <Route path="/result" element={<Result />} />
        <Route path="/admin/create-quiz" element={<AdminCreateQuiz />} />
      </Routes>
    </>
  );
}

export default App;