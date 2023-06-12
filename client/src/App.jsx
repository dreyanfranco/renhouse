import './App.css'
import { Routes, Route } from "react-router-dom";
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';
import RegisterPage from './pages/RegisterPage';
import Profile from './pages/Profile';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path='/account/:subpage?' element={<Profile />} />
        <Route path='/account/:subpage/:action' element={<Profile />} />
      </Route>
    </Routes>

  )
}

export default App
