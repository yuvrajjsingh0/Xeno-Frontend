import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import './App.css'
import { Audience } from './pages/Audience';
import Campaigns from './pages/Campaigns';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Campaign } from './pages/Campaign';
import { Login } from './pages/Login';

function App() {

  const token = localStorage.getItem("token");

  return (
    <Router>
      <div className="App">
      <ToastContainer />
        <Routes>
          {token && <Route path="/campaigns" element={<Campaigns />} />}
          {token && <Route path="/campaigns/:id" element={<Campaign />} />}
          {token && <Route path="/audience" element={<Audience />} />}
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
